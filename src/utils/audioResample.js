const WHISPER_SAMPLE_RATE = 16000;

/** Linear-interpolation resample — good enough for speech, no library needed. */
export function resampleTo16kMono(float32Audio, originalSampleRate) {
  if (originalSampleRate === WHISPER_SAMPLE_RATE) return float32Audio;
  const ratio = originalSampleRate / WHISPER_SAMPLE_RATE;
  const newLength = Math.round(float32Audio.length / ratio);
  const result = new Float32Array(newLength);
  for (let i = 0; i < newLength; i++) {
    const srcPos = i * ratio;
    const srcIndex = Math.floor(srcPos);
    const frac = srcPos - srcIndex;
    const a = float32Audio[srcIndex] || 0;
    const b = float32Audio[srcIndex + 1] || a;
    result[i] = a + (b - a) * frac;
  }
  return result;
}

export function concatFloat32(chunks) {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Float32Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}
