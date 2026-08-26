// Runs entirely in a Web Worker so a ~150MB model download and per-utterance
// inference never block the UI thread. Model weights are cached by the
// browser (via the Cache API, handled internally by transformers.js) after
// the first load — every session after that starts instantly, offline.
import { pipeline } from "@huggingface/transformers";

// "base" multilingual (~145MB) — chosen over "small" (~488MB) for a much
// smaller one-time download and faster per-utterance inference, which
// matters more here than raw accuracy: this app matches short, known
// phrases with fuzzy scoring already built in, not open-ended transcription.
// Swap to "Xenova/whisper-small" if accuracy on longer sentences needs it.
const MODEL_ID = "Xenova/whisper-base";

let transcriberPromise = null;

function getTranscriber() {
  if (!transcriberPromise) {
    transcriberPromise = pipeline("automatic-speech-recognition", MODEL_ID, {
      // The default (q4) export crashes onnxruntime-web's MatMulNBits
      // fusion pass on the tied embed_tokens weight ("Missing required
      // scale"), and fp16 hits a *different* graph-optimizer bug
      // (SimplifiedLayerNormFusion can't resolve an inserted cast node).
      // Both are bugs in the bundled ORT version's graph-optimization
      // passes, not in a specific weight format — so disable graph
      // optimization entirely instead of chasing dtypes. q8 (the
      // library's normal default) is fine once those fusions don't run.
      dtype: "q8",
      session_options: { graphOptimizationLevel: "disabled" },
      progress_callback: (progress) => {
        self.postMessage({ type: "progress", progress });
      },
    });
  }
  return transcriberPromise;
}

self.onmessage = async (event) => {
  const { type, audio } = event.data;

  if (type === "load") {
    try {
      await getTranscriber();
      self.postMessage({ type: "ready" });
    } catch (e) {
      self.postMessage({ type: "error", error: String(e?.message || e) });
    }
    return;
  }

  if (type === "transcribe") {
    try {
      const asr = await getTranscriber();
      const result = await asr(audio, { language: "french", task: "transcribe" });
      self.postMessage({ type: "result", text: (result?.text || "").trim() });
    } catch (e) {
      self.postMessage({ type: "error", error: String(e?.message || e) });
    }
  }
};
