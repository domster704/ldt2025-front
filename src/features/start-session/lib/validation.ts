/**
 * Проверяет корректность загруженного файла для эмуляции.
 *
 * Файл считается допустимым, если его имя оканчивается на `.zip`.
 * Это связано с тем, что сервер принимает только архивы
 * с данными КТГ для обработки.
 *
 * @param file объект файла, выбранного пользователем через `<input type="file">`.
 * @returns `true`, если файл имеет расширение `.zip`, иначе `false`.
 *
 * @example
 * ```ts
 * const file = new File(["data"], "signals.zip");
 * console.log(validateFile(file)); // true
 *
 * const badFile = new File(["data"], "notes.txt");
 * console.log(validateFile(badFile)); // false
 * ```
 */
export function validateFile(file: File): boolean {
  return file.name.endsWith(".zip");
}
