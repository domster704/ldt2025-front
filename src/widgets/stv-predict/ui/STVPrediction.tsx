import React, {FC} from "react";
import * as style from "./STVPrediction.module.css";
import {useAppSelector} from "@app/store/store";
import {selectLastSTVForecast} from "@entities/session-stream";
import {STV_CONFIG} from "@shared/lib/configs/range-configs";
import StatusTable from "@shared/ui/status-table";

const STVPrediction: FC = () => {
  const stv = useAppSelector(selectLastSTVForecast);

  const rows = [
    {
      label: "STV 3 минуты",
      score: stv?.stv_3m.value ?? null,
      situation: stv?.stv_3m.status ?? null,
      config: STV_CONFIG,
    },
    {
      label: "STV 5 минут",
      score: stv?.stv_5m.value ?? null,
      situation: stv?.stv_5m.status ?? null,
      config: STV_CONFIG,
    },
    {
      label: "STV 10 минут",
      score: stv?.stv_10m.value ?? null,
      situation: stv?.stv_10m.status ?? null,
      config: STV_CONFIG,
    },
  ];

  return (
    <StatusTable title="Прогноз STV"
                 rows={rows}
                 className={style.stvPredictionContainer}
    />
  );
};

export default STVPrediction;
