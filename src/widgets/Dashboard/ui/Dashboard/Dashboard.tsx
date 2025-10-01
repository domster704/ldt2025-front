import React, {FC} from "react";

import * as style from './Dashboard.module.css';
import SessionChart from "@widgets/session-chart";
import {StreamPoint} from "@entities/session-stream";

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  fhrData: StreamPoint[];
  ucData: StreamPoint[];
  slideWindowTime?: number;
  maxPoints?: number;
}

const Dashboard: FC<DashboardProps> = ({
                                         fhrData,
                                         ucData,
                                         slideWindowTime,
                                         maxPoints,
                                         ...props
                                       }) => {
  return (
    <div {...props} className={[
      style.dashboard__graphs,
      props.className || ''
    ].join(' ')}>
      <SessionChart color={"#c59e00"}
                    slideWindowTime={slideWindowTime}
                    maxPoints={maxPoints}
                    dataSource={fhrData}
                    highlightBands={[{
                      from: 110,
                      to: 150,
                      fill: "#ccedd1"
                    }]}/>
      <SessionChart color={"#003459"}
                    slideWindowTime={slideWindowTime}
                    maxPoints={maxPoints}
                    dataSource={ucData}/>
    </div>
  );
};

export default Dashboard;
