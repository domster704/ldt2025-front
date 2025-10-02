/**
 * Конвертирует HEX-цвет в строку с RGB-компонентами.
 *
 * ---
 * ### Поддержка:
 * - Короткий HEX-формат (`#abc` → `170, 187, 204`).
 * - Полный HEX-формат (`#aabbcc` → `170, 187, 204`).
 *
 * ---
 * ### Логика:
 * 1. Убирает символ `#` в начале строки.
 * 2. Если передан короткий HEX (3 символа) → расширяет его до 6 символов.
 * 3. Проверяет, что после преобразований длина строки = 6.
 * 4. Парсит строку в число и извлекает компоненты R, G, B побитовыми сдвигами.
 * 5. Возвращает строку формата `"r, g, b"`.
 *
 * ---
 * @param hex Цвет в HEX-формате (например, `#ff0000` или `#f00`).
 * @returns Строка `"r, g, b"`, где r/g/b — целые числа от 0 до 255.
 *
 * ---
 * @example
 * ```ts
 * hexToRgb("#ff0000"); // "255, 0, 0"
 * hexToRgb("#0f0");    // "0, 255, 0"
 * hexToRgb("0000ff");  // "0, 0, 255"
 *
 * // Ошибка:
 * hexToRgb("#xyz");    // Error: Invalid HEX color: xyz
 * ```
 */
export function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(ch => ch + ch).join('');
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color: " + hex);
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
}
