import React, {FC} from 'react';
import * as style from './Anamnesis.module.css'
import {useAppDispatch, useAppSelector} from "@app/store/store";
import ContainerWithLabel from "@shared/ui/container-with-label";

interface AnamnesisProps {

}

const Anamnesis: FC<AnamnesisProps> = ({}) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  return (
    <ContainerWithLabel label={"Анамнез"}
                        className={style.anamnesis}>
      <div className={style.anamnesis__scrollWrapper}>
        <p><b>Срок беременности:</b> 38+2 нед</p>
        <p><b>Предыдущие роды: повторнородящая, кол-во родов:</b> 1, исход: без патологий</p>
        <p><b>Количество плодов:</b> одноплодная беременность</p>
        <p><b>Течение настоящей беременности</b></p>
        <ul>
          <li>
            ОСНОВНЫЕ ОСЛОЖНЕНИЯ:
            <ul>
              <li>Гестационный диабет (диетотерапия)</li>
              <li>Нефропатия I-II ст. (АД 130-140/85-90)</li>
              <li>Анемия легкой ст. (Hb 108 г/л)</li>
              <li>Компенсированный гипотиреоз</li>
            </ul>
          </li>
        </ul>

        <p><b>Ультразвуковые скрининги</b></p>
        <ul>
          <li>В течение беременности: По протоколу, маркеры хромосомной патологии не выявлены.</li>
          <li>Группа крови, резус-фактор: Мать - O(I) Rh+, Отец - A(II) Rh+.</li>
          <li>Риск резус-конфликта: Отсутствует.</li>
        </ul>
      </div>
    </ContainerWithLabel>
  );
}

export default Anamnesis;
