import {get, set} from "idb-keyval";

export async function cacheSound(id: string, file: File) {
  const buffer = await file.arrayBuffer();
  await set(`sound-${id}`, buffer);
}

export async function getSoundUrl(id: string, defaultPath: string): Promise<string> {
  const buffer = await get(`sound-${id}`);
  if (!buffer) {
    return defaultPath;
  }
  const blob = new Blob([buffer], {type: "audio/mp3"});
  return URL.createObjectURL(blob);
}

let currentAudio: HTMLAudioElement | null = null;

export async function playSound(url: string, loop = true) {
  stopSound();
  currentAudio = new Audio(url);
  currentAudio.loop = loop;
  await currentAudio.play();
}

export function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}
