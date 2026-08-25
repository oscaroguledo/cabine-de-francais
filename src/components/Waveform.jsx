import { useEffect, useRef } from "react";

export default function Waveform({ active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      let level = 0.15;
      if (analyserRef.current) {
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        level = Math.min(1, sum / data.length / 90);
      }

      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      for (let ring = 0; ring < 3; ring++) {
        const r = 58 + ring * 10 + level * 22;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = accent || "#b5651d";
        ctx.globalAlpha = Math.max(0, 0.32 - ring * 0.1 - (reduceMotion ? 0.15 : 0));
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion) rafRef.current = requestAnimationFrame(draw);
    }

    async function start() {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 64;
        const src = audioCtxRef.current.createMediaStreamSource(streamRef.current);
        src.connect(analyserRef.current);
      } catch (e) {
        /* mic access denied — draw an idle ring instead */
      }
      draw();
    }

    function stop() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
        analyserRef.current = null;
      }
    }

    if (active) start();
    else stop();

    return stop;
  }, [active]);

  return <canvas className="wave" ref={canvasRef} width={140} height={140} />;
}
