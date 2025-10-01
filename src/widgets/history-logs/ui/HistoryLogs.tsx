import React, {FC, memo} from 'react';
import * as style from './HistoryLogs.module.css'
import {useAppSelector} from "@app/store/store";
import {selectAllNotifications} from "@entities/session-stream";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {NotificationEntry, ProcessNotification} from "@entities/session-stream/model/types";
import {colorToCTGStatus, ctgColors, NotificationColor} from "@shared/const/ctgColors";

interface HistoryLogItemProps {
  time: number;
  notification: ProcessNotification;
}

const HistoryLogItem: FC<HistoryLogItemProps> = memo(({time, notification}) => {
  const date = new Date(time);

  const status = colorToCTGStatus[notification.color as NotificationColor];
  const bgColor = ctgColors[status];

  return (
    <div className={style.logItem} style={{
      backgroundColor: bgColor
    }}>
      <p className={style.logTime}>{date.toLocaleTimeString()}</p>
      <p className={style.logMessage}>
        {notification.message}
      </p>
    </div>
  );
});

const HistoryLogs: FC = ({}) => {
  const allNotifications = useAppSelector(selectAllNotifications);

  return (
    <ContainerWithLabel className={style.logsList}
                        label={"История"}>
      <div className={style.logsListWrapper}>
        {
          allNotifications ?
            allNotifications.map((notification: NotificationEntry, idx) =>
              <HistoryLogItem
                key={`${notification.time}-${idx}`}
                time={notification.time}
                notification={notification}
              />
            ) :
            <></>
        }
      </div>
    </ContainerWithLabel>
  );
};

export default HistoryLogs;
