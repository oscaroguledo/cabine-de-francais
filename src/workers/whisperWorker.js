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
