import React, {FC} from "react";
import * as style from "./ClassificationEstimation.module.css";
import {useAppSelector} from "@app/store/store";
import {
  selectLastFIGOSituation,
  selectLastFischerSituation,
  selectLastSavelyevaSituation
} from "@entities/session-stream";
import {FIGO_CONFIG, FISCHER_AND_SAVELYEVA_CONFIG} from "@widgets/classification-estimation/model/config";
import StatusTable from "@shared/ui/status-table";

const ClassificationEstimation: FC = () => {
  const figo = useAppSelector(selectLastFIGOSituation);
  const savelyeva = useAppSelector(selectLastSavelyevaSituation);
  const fischer = useAppSelector(selectLastFischerSituation);

  const rows = [
    {label: "FIGO", score: figo.score, situation: figo.situation, config: FIGO_CONFIG},
    {label: "Fischer", score: fischer.score, situation: fischer.situation, config: FISCHER_AND_SAVELYEVA_CONFIG},
    {label: "Савельева", score: savelyeva.score, situation: savelyeva.situation, config: FISCHER_AND_SAVELYEVA_CONFIG},
  ];

  return (
    <StatusTable title="Оценка состояния"
                 rows={rows}
                 className={style.classificationEstimationContainer}
    />
  );
};

export default ClassificationEstimation;
