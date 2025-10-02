import React, {FC, memo} from 'react';
import * as style from './HistoryLogs.module.css'
import {useAppSelector} from "@app/store/store";
import {selectAllNotifications} from "@entities/session-stream";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {NotificationEntry, ProcessNotification} from "@entities/session-stream/model/types";
import {colorToCTGStatus, ctgColors, NotificationColor} from "@shared/const/ctgColors";

interface HistoryLogItemProps {
  /** Время события (в миллисекундах) */
  time: number;
  /** Объект уведомления (сообщение + цвет) */
  notification: ProcessNotification;
}

/**
 * **HistoryLogItem** — элемент истории уведомлений.
 *
 * ---
 * ### Основные задачи:
 * - Отображает сообщение и время события.
 * - Подсвечивает фон в зависимости от типа уведомления:
 *   - цвет определяется через {@link NotificationColor} → {@link CTGStatus} → {@link ctgColors}.
 *
 * ---
 * ### Пример:
 * ```
 * [12:30:25] Высокая вероятность гипоксии
 * (фон: красный)
 * ```
 */
const HistoryLogItem: FC<HistoryLogItemProps> = memo(({time, notification}) => {
  const date = new Date(time);

  const status = colorToCTGStatus[notification.color as NotificationColor];
  const bgColor = ctgColors[status];

  return (
    <div className={style.logItem} style={{backgroundColor: bgColor}}>
      <p className={style.logTime}>{date.toLocaleTimeString()}</p>
      <p className={style.logMessage}>{notification.message}</p>
    </div>
  );
});

/**
 * **HistoryLogs** — компонент для отображения истории событий (уведомлений) во время КТГ-сессии.
 *
 * ---
 * ### Основные задачи:
 * - Получает список уведомлений из Redux Store через {@link selectAllNotifications}.
 * - Отображает список событий с временем и сообщением.
 * - Каждое событие подсвечивается цветом, соответствующим его типу (Normal, Pathological и т.д.).
 * - Оборачивается в {@link ContainerWithLabel} с заголовком "История".
 *
 * ---
 * ### Визуальная структура:
 * ```
 * ┌───────────── История ───────────────────┐
 * | [12:30:25] Высокая вероятность гипоксии |
 * | [12:31:10] Снижение вариабельности      |
 * └─────────────────────────────────────────┘
 * ```
 *
 * ---
 * ### Пример использования:
 * ```tsx
 * import HistoryLogs from "@widgets/history-logs";
 *
 * const StatusPage = () => (
 *   <div>
 *     <HistoryLogs />
 *   </div>
 * );
 * ```
 */
const HistoryLogs: FC = ({}) => {
  const allNotifications = useAppSelector(selectAllNotifications);

  return (
    <ContainerWithLabel className={style.logsList} label={"История"}>
      <div className={style.logsListWrapper}>
        {allNotifications
          ? allNotifications.map((notification: NotificationEntry, idx) => (
            <HistoryLogItem
              key={`${notification.time}-${idx}`}
              time={notification.time}
              notification={notification}
            />
          ))
          : <></>}
      </div>
    </ContainerWithLabel>
  );
};

export default HistoryLogs;
