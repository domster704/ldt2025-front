import React, {FC} from "react";
import * as style from "./DashboardInContainer.module.css";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {LabelPosition} from "@shared/ui/container-with-label/ui/ContainerWithLabel";
import {Dashboard} from "@widgets/dashboard";
import {StreamPoint} from "@entities/session-stream";

interface DashboardInContainerProps {
  label: string;
  fhrData: StreamPoint[];
  ucData: StreamPoint[];
}

const DashboardInContainer: FC<DashboardInContainerProps> = ({
                                                               label,
                                                               fhrData,
                                                               ucData,
                                                             }) => {
  return (
    <ContainerWithLabel className={style.params__chartsContainer}
                        labelPosition={LabelPosition.RIGHT}
                        label={label}>
      <Dashboard className={style.params__dashboard}
                 fhrData={fhrData}
                 ucData={ucData}
                 slideWindowTime={10 * 60 * 3600}
                 maxPoints={4000}/>
    </ContainerWithLabel>
  );
};

export default DashboardInContainer;
