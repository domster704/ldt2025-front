import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "@app/store/store";
import {selectHeartRates, selectUterineContractions} from "@entities/session-stream";
import {DashboardInContainer} from "@widgets/dashboard";
import ActionButton from "@shared/ui/action-button";
import exportImg from "@shared/assets/img/export.svg";
import html2canvas from "html2canvas";

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

        const data = canvas.toDataURL("image/jpg");
        const link = document.createElement("a");
        link.href = data;
        link.download = "ctg-export.jpg";
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
