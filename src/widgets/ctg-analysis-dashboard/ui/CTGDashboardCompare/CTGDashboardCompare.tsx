import React, {useMemo, useState} from "react";
import * as style from "./CTGDashboardCompare.module.css";
import {useAppSelector} from "@app/store/store";
import {selectAllCTGHistory} from "@entities/ctg-history/model/selectors";
import CTGHistoryParamsTable from "@entities/ctg-history/ui/CTGHistoryParamsTable";
import {DashboardInContainer} from "@widgets/dashboard";
import {StreamPoint} from "@entities/session-stream";

import loupeIcon from "@shared/assets/img/loupe.svg";
import Modal from "@shared/ui/modal";

interface CTGDashboardCompareProps {
  /** Идентификаторы двух исследований КТГ, которые необходимо сравнить */
  ids: number[];
}

/**
 * **CTGDashboardCompare** — компонент для сравнения двух исследований КТГ.
 *
 * ---
 * ### Основные задачи:
 * - Отображает таблицу параметров для двух исследований бок о бок.
 * - Показывает два дашборда (FHR и UC графики) для наглядного сравнения.
 * - Даёт возможность открыть оба графика в модальном окне (полноэкранный просмотр).
 *
 * ---
 * ### Логика работы:
 * 1. По `ids` извлекаются из Redux Store два объекта истории КТГ.
 * 2. Данные графиков (`bpm` и `uc`) трансформируются в массивы точек (`StreamPoint[]`).
 * 3. Рендерятся:
 *    - Таблица параметров (`CTGHistoryParamsTable` в режиме `compare`).
 *    - Два дашборда (`DashboardInContainer`) с кратким просмотром.
 *    - Кнопка-оверлей (лупа) для открытия модалки.
 *    - Модальное окно с увеличенными графиками.
 *
 * ---
 * ### Визуальная структура:
 * ```tsx
 * <div className="compare">
 *   <CTGHistoryParamsTable mode="compare" data={[ctg1, ctg2]} />
 *   <div className="compare__dashboards">
 *     <OverlayButton />     // кнопка с иконкой "лупа"
 *     <DashboardInContainer /> // график 1
 *     <DashboardInContainer /> // график 2
 *   </div>
 *   <Modal> ... два графика крупно ... </Modal>
 * </div>
 * ```
 *
 * ---
 * ### Использование:
 * @example
 * ```tsx
 * import CTGDashboardCompare from "@widgets/ctg-analysis-dashboard/ui/CTGDashboardCompare";
 *
 * const Example = () => (
 *   <CTGDashboardCompare ids={[1, 2]} />
 * );
 * ```
 */
const CTGDashboardCompare: React.FC<CTGDashboardCompareProps> = ({ids}) => {
  const history = useAppSelector(selectAllCTGHistory);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Находим исследования по ID
  const ctg1 = history.find((h) => h.id === ids[0]);
  const ctg2 = history.find((h) => h.id === ids[1]);

  if (!ctg1 || !ctg2) {
    return <div className={style.compare}>Не удалось загрузить данные для сравнения</div>;
  }

  // Преобразуем данные для первого исследования
  const {fhrData1, ucData1} = useMemo(() => {
    return {
      fhrData1: ctg1.graph.bpm.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
      ucData1: ctg1.graph.uc.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
    };
  }, [ctg1]);

  // Преобразуем данные для второго исследования
  const {fhrData2, ucData2} = useMemo(() => {
    return {
      fhrData2: ctg2.graph.bpm.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
      ucData2: ctg2.graph.uc.map(p => ({x: p.time_sec, y: p.value})) as StreamPoint[],
    };
  }, [ctg2]);

  // Открыть модалку
  const handleOpenDashboards = () => {
    setIsModalOpen(true);
  }

  return (
    <div className={style.compare}>
      <CTGHistoryParamsTable className={style.compare__paramsTable}
                             mode={"compare"}
                             data={[
                               ctg1,
                               ctg2,
                             ]}/>
      <div className={style.compare__dashboards}>
        <div className={style.dashboards__overlay}>
          <div className={style.dashboards__overlayContent} onClick={() => handleOpenDashboards()}>
            <img src={loupeIcon} alt={""}/>
            <p>Открыть</p>
          </div>
        </div>

        <DashboardInContainer label={ctg1.date.toLocaleDateString()}
                              fhrData={fhrData1}
                              ucData={ucData1}/>
        <DashboardInContainer label={ctg2.date.toLocaleDateString()}
                              fhrData={fhrData2}
                              ucData={ucData2}/>
      </div>

      {/* Модальное окно для увеличенного сравнения */}
      <Modal className={style.modalDashboards}
             isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={[
          style.modalDashboards__content,
        ].join(' ')}>
          <DashboardInContainer className={style.modal__dashboardItem}
                                label={ctg1.date.toLocaleDateString()}
                                fhrData={fhrData1}
                                ucData={ucData1}
                                isUseClipPath={false}/>
          <DashboardInContainer className={style.modal__dashboardItem}
                                label={ctg2.date.toLocaleDateString()}
                                fhrData={fhrData2}
                                ucData={ucData2}
                                isUseClipPath={false}/>
        </div>
      </Modal>
    </div>
  );
};

export default CTGDashboardCompare;
