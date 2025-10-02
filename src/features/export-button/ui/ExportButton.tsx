import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream";
import {DashboardInContainer} from "@widgets/dashboard";
import ActionButton from "@shared/ui/action-button";
import exportImg from "@shared/assets/img/export.svg";
import html2canvas from "html2canvas";

/**
 * Кнопка для экспорта графика КТГ (FHR/UC) в изображение.
 *
 * ---
 * ### Основная логика:
 * - При нажатии на кнопку рендерит скрытый блок с {@link DashboardInContainer},
 *   который содержит графики ЧСС плода (FHR) и маточной активности (UC).
 * - Использует библиотеку **html2canvas**, чтобы превратить этот блок в canvas.
 * - Преобразует canvas в `dataURL` и автоматически скачивает файл как `ctg-export.jpg`.
 *
 * ---
 * ### Состояния:
 * - `renderDashboard: boolean` — отвечает за то, рендерится ли временный контейнер с графиком для экспорта.
 *
 * ---
 * ### Технические детали:
 * - `setTimeout(100ms)` используется, чтобы гарантировать отрисовку DOM перед захватом.
 * - Используется `useCORS: true` для поддержки загрузки ресурсов (например, шрифтов, иконок).
 * - После экспорта временный контейнер удаляется (чтобы не мешал UI).
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import ExportButton from "@features/export-button";
 *
 * const Toolbar = () => (
 *   <div>
 *     <ExportButton />
 *   </div>
 * );
 * ```
 */
const ExportButton: React.FC = () => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);

  const ref = useRef<HTMLDivElement>(null);
  const [renderDashboard, setRenderDashboard] = useState(false);

  useEffect(() => {
    const doExport = async () => {
      if (!renderDashboard) return;

      try {
        const element = ref.current;
        if (!element) return;

        await new Promise(res => setTimeout(res, 100));

        const canvas = await html2canvas(element, {
          useCORS: true,
          backgroundColor: "#fff"
        });

        // Превращаем canvas в изображение
        const data = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = data;
        link.download = "ctg-export.jpg";

        // Автоскачивание
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error("Ошибка при выгрузке графика:", err);
      } finally {
        setRenderDashboard(false);
      }
    };

    doExport().then();
  }, [renderDashboard]);

  const handleExport = () => {
    setRenderDashboard(true);
  };

  return (
    <div>
      <ActionButton onClick={handleExport}
                    icon={exportImg}
                    text="Выгрузка"/>

      {renderDashboard && (
        <div ref={ref} style={{
          position: "fixed",
          inset: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#fff"
        }}>
          <DashboardInContainer
            label="График FHR/UC"
            fhrData={fhrData}
            ucData={ucData}
          />
        </div>
      )}
    </div>
  );
};

export default ExportButton;
