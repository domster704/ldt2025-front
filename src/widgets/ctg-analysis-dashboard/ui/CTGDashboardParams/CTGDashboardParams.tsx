import React from "react";
import * as style from "./CTGDashboardParams.module.css";

const CTGDashboardParams = () => {
  return (
    <div className={style.params}>
      <table>
        <thead>
        <tr>
          <th>Параметр</th>
          <th>Значение</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Базальная ЧСС</td>
          <td>130</td>
        </tr>
        <tr>
          <td>Акцелерации</td>
          <td>2</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CTGDashboardParams;
