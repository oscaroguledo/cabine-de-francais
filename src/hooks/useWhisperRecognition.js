import { useCallback, useEffect, useRef, useState } from "react";
import { concatFloat32, resampleTo16kMono } from "../utils/audioResample";

/**
 * A fully local, in-browser speech-to-text engine (Whisper, via a Web
 * Worker) — built as a drop-in alternative to useSpeechRecognition's
 * interface, for browsers/environments where the Web Speech API's
 * cloud-dependent implementation (Chrome→Google's servers) isn't reachable.
 * Runs entirely on-device after the model's first download; no network
 * dependency for transcription itself once loaded.
 */
export function useWhisperRecognition({ onFinalResult, onNoResult, onError }) {
  const supported =
    typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && !!window.Worker;

  const workerRef = useRef(null);
  const [modelState, setModelState] = useState("idle"); // idle | loading | ready | error
  const [modelProgress, setModelProgress] = useState(0);
  const [listening, setListening] = useState(false);

  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const processorRef = useRef(null);
  const chunksRef = useRef([]);
  const gotAudioRef = useRef(false);
  const [processing, setProcessing] = useState(false);

  // The worker is created once and lives for the component's whole
  // lifetime, but onFinalResult/onNoResult/onError are new inline
  // functions on every parent render (they close over that render's
  // `current` word). Reading them through a ref that's updated every
  // render — instead of closing over the props directly in the one-time
  // effect below — means a transcription result is always judged against
  // whatever word is on screen *now*, not whichever word happened to be
  // current the one time the worker was constructed.
  const callbacksRef = useRef({ onFinalResult, onNoResult, onError });
  useEffect(() => {
    callbacksRef.current = { onFinalResult, onNoResult, onError };
  });

  useEffect(() => {
    if (!supported) return;
    const worker = new Worker(new URL("../workers/whisperWorker.js", import.meta.url), { type: "module" });
    worker.onmessage = (event) => {
      const { type } = event.data;
      if (type === "progress") {
        const p = event.data.progress;
        if (p && typeof p.loaded === "number" && typeof p.total === "number" && p.total > 0) {
          setModelProgress(Math.round((p.loaded / p.total) * 100));
        }
      } else if (type === "ready") {
        setModelState("ready");
      } else if (type === "result") {
        setProcessing(false);
        const text = event.data.text;
        if (text) {
          callbacksRef.current.onFinalResult?.(text);
        } else {
          callbacksRef.current.onNoResult?.();
        }
      } else if (type === "error") {
        setProcessing(false);
        setModelState((s) => (s === "loading" ? "error" : s));
        callbacksRef.current.onError?.(event.data.error);
      }
    };
    workerRef.current = worker;
    return () => worker.terminate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported]);

  const ensureModelLoaded = useCallback(() => {
    if (!workerRef.current) return;
    if (modelState === "idle") {
      setModelState("loading");
      workerRef.current.postMessage({ type: "load" });
    }
  }, [modelState]);

  const start = useCallback(async () => {
    if (!supported || listening) return;
    ensureModelLoaded();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;
      chunksRef.current = [];
      gotAudioRef.current = false;

      processor.onaudioprocess = (e) => {
        const data = e.inputBuffer.getChannelData(0);
        // ignore near-silence so a captured-but-empty session is
        // distinguishable from one that actually has speech in it
        let hasSignal = false;
        for (let i = 0; i < data.length; i += 50) {
          if (Math.abs(data[i]) > 0.01) {
            hasSignal = true;
            break;
          }
        }
        if (hasSignal) gotAudioRef.current = true;
        chunksRef.current.push(new Float32Array(data));
      };

      source.connect(processor);
      processor.connect(audioCtx.destination);
      setListening(true);
    } catch (e) {
      if (onError) onError(e.name === "NotAllowedError" ? "not-allowed" : String(e.message || e));
    }
  }, [supported, listening, ensureModelLoaded, onError]);

  const stop = useCallback(() => {
    if (!listening) return;
    setListening(false);

    processorRef.current?.disconnect();
    audioCtxRef.current?.close().catch(() => {});
    streamRef.current?.getTracks().forEach((t) => t.stop());

    if (!gotAudioRef.current || chunksRef.current.length === 0) {
      if (onNoResult) onNoResult();
      return;
    }

    const raw = concatFloat32(chunksRef.current);
    const resampled = resampleTo16kMono(raw, audioCtxRef.current?.sampleRate || 44100);
    chunksRef.current = [];

    if (modelState !== "ready") {
      // model still downloading — the recording is captured, but there's
      // nothing to transcribe it with yet
      if (onError) onError("model-loading");
      return;
    }
    setProcessing(true);
    workerRef.current?.postMessage({ type: "transcribe", audio: resampled });
  }, [listening, modelState, onError, onNoResult]);

  return { supported, listening, processing, start, stop, modelState, modelProgress, preload: ensureModelLoaded };
}
