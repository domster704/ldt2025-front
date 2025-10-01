import React, {FC} from 'react';
import * as style from './STVPrediction.module.css'
import {useAppSelector} from "@app/store/store";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {selectLastSTVForecast} from "@entities/session-stream";

interface STVPredictionProps {

}

const STVPrediction: FC<STVPredictionProps> = ({}) => {
  const stvForecast = useAppSelector(selectLastSTVForecast);

  return (
    <ContainerWithLabel label={"Прогноз STV"}
                        className={style.stbPredictionContainer}>
      <table>
        <tbody>
        <tr>
          <td>STV 3 минуты</td>
          <td>{stvForecast?.stv_3m || 'Нет данных'}</td>
        </tr>
        <tr>
          <td>STV 5 минут</td>
          <td>{stvForecast?.stv_5m || 'Нет данных'}</td>
        </tr>
        <tr>
          <td>STV 10 минут</td>
          <td>{stvForecast?.stv_10m || 'Нет данных'}</td>
        </tr>
        </tbody>
      </table>
    </ContainerWithLabel>
  );
}

export default STVPrediction;
