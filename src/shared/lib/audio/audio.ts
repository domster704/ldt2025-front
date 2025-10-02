import {get, set} from "idb-keyval";

/**
 * Кэширует пользовательский аудиофайл в IndexedDB.
 *
 * Файл сохраняется в бинарном формате (`ArrayBuffer`), чтобы потом можно было его восстановить.
 *
 * @param id Уникальный идентификатор звука (обычно совпадает с типом звука из enum `SoundType`).
 * @param file Загруженный пользователем аудиофайл.
 *
 * @example
 * ```ts
 * const file = new File(["..."], "custom-sound.mp3", { type: "audio/mp3" });
 * await cacheSound("warning", file);
 * ```
 */
export async function cacheSound(id: string, file: File) {
  const buffer = await file.arrayBuffer();
  await set(`sound-${id}`, buffer);
}

/**
 * Возвращает URL для воспроизведения сохранённого звука.
 *
 * Если звук с данным `id` есть в IndexedDB — создаёт Blob и возвращает `object URL`.
 * Если звука нет — возвращает путь к стандартному (дефолтному) файлу.
 *
 * @param id Уникальный идентификатор звука.
 * @param defaultPath Путь к стандартному аудиофайлу (например, встроенный `import ...mp3`).
 * @returns Строка-URL для использования в `<audio>` или `new Audio(url)`.
 *
 * @example
 * ```ts
 * const url = await getSoundUrl("warning", "/sounds/default-warning.mp3");
 * const audio = new Audio(url);
 * audio.play();
 * ```
 */
export async function getSoundUrl(id: string, defaultPath: string): Promise<string> {
  const buffer = await get(`sound-${id}`);
  if (!buffer) {
    return defaultPath;
  }
  const blob = new Blob([buffer], {type: "audio/mp3"});
  return URL.createObjectURL(blob);
}

/** Текущий проигрываемый `<audio>`, чтобы можно было останавливать один звук перед воспроизведением другого */
let currentAudio: HTMLAudioElement | null = null;

/**
 * Воспроизводит звук по указанному URL.
 *
 * - Если уже играет другой звук — он останавливается.
 * - По умолчанию включается зацикливание (`loop = true`).
 *
 * @param url URL к аудиофайлу (строка).
 * @param loop Воспроизводить ли звук циклически (по умолчанию `true`).
 *
 * @example
 * ```ts
 * const url = await getSoundUrl("warning", "/sounds/warning.mp3");
 * await playSound(url, false); // один раз
 * ```
 */
export async function playSound(url: string, loop = true) {
  stopSound();
  currentAudio = new Audio(url);
  currentAudio.loop = loop;
  await currentAudio.play();
}

/**
 * Останавливает текущее воспроизведение звука.
 *
 * Если звук играл — он будет остановлен и очищен из памяти.
 *
 * @example
 * ```ts
 * stopSound(); // мгновенно остановит любой звук
 * ```
 */
export function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}
