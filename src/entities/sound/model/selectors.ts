import {RootState} from "@app/store/store";

/**
 * Селектор для получения списка **всех доступных звуков** из Redux-хранилища.
 *
 * 🔹 Логика:
 * - Берёт значение `items` из среза `sound`.
 * - Возвращает массив объектов {@link Sound}, каждый из которых содержит:
 *   - `id: SoundType` — уникальный тип звука;
 *   - `name: string` — название звука;
 *   - `fileName: string` — путь или имя файла;
 *   - `enabled: boolean` — включён ли звук;
 *   - `custom?: boolean` — пользовательский ли звук.
 *
 * ### Когда использовать:
 * Этот селектор применяется, когда нужно:
 * - отобразить список всех звуков в UI (например, в настройках);
 * - пройтись по массиву и построить элементы управления (переключатели, кнопки замены файла и т.п.).
 *
 * @param state глобальное состояние Redux
 * @returns массив звуков {@link Sound[]}
 *
 * @example
 * ```tsx
 * import {useAppSelector} from "@app/store/store";
 * import {selectAllSounds} from "@entities/sound/model/selectors";
 *
 * const SoundList = () => {
 *   const sounds = useAppSelector(selectAllSounds);
 *   return (
 *     <ul>
 *       {sounds.map(s => (
 *         <li key={s.id}>
 *           {s.name} {s.enabled ? "(вкл)" : "(выкл)"}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * };
 * ```
 */
export const selectAllSounds = (state: RootState) => state.sound.items;
