import React, {FC} from 'react';
import * as style from './Anamnesis.module.css'
import {useAppSelector} from "@app/store/store";
import ContainerWithLabel from "@shared/ui/container-with-label";
import {selectChosenPatient} from "@entities/patient/model/selectors";

interface AnamnesisProps {
}

/**
 * Компонент **Anamnesis** — блок отображения анамнеза пациента.
 *
 * ---
 * ### Основные задачи:
 * - Показывает информацию о течении беременности и предыдущих родах.
 * - Содержит перечень основных осложнений (диабет, нефропатия, анемия и др.).
 * - Выводит результаты ультразвуковых скринингов и анализов.
 * - Представлен в виде прокручиваемого блока внутри {@link ContainerWithLabel}.
 *
 * ---
 * ### Особенности:
 * - Данные пока статические (захардкоженные), но могут быть заменены на динамические
 *   из Redux или API.
 * - Имеет собственную CSS-обёртку для вертикальной прокрутки (`anamnesis__scrollWrapper`).
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import Anamnesis from "@widgets/anamnesis";
 *
 * const Page = () => (
 *   <section>
 *     <Anamnesis />
 *   </section>
 * );
 * ```
 */
const Anamnesis: FC<AnamnesisProps> = ({}) => {
  const patient = useAppSelector(selectChosenPatient);

  return (
    <ContainerWithLabel label={"Анамнез"}
                        className={style.anamnesis}>
      <div className={style.anamnesis__scrollWrapper}>
        {
          patient &&
          <p>{patient?.additional_info?.anamnesis}</p>
        }
      </div>
    </ContainerWithLabel>
  );
}

export default Anamnesis;
