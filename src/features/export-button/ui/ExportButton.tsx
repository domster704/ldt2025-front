import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "@app/store/store";
import {
  selectHeartRates,
  selectLastFIGO,
  selectLastHypoxiaProbability, selectLastSTV,
  selectUterineContractions
} from "@entities/session-stream";
import {DashboardInContainer} from "@widgets/dashboard";
import ActionButton from "@shared/ui/action-button";
import exportImg from "@shared/assets/img/export.svg";
import html2canvas from "html2canvas";

const ExportButton: React.FC = () => {
  const fhrData = useAppSelector(selectHeartRates);
  const ucData = useAppSelector(selectUterineContractions);
  const hypoxiaProbability = useAppSelector(selectLastHypoxiaProbability);
  const figo = useAppSelector(selectLastFIGO);
  const stv = useAppSelector(selectLastSTV);

  const ref = useRef<HTMLDivElement>(null);
  const [renderDashboard, setRenderDashboard] = useState(false);

  const sessionMinutes = React.useMemo(() => {
    if (fhrData.length < 2) return 0;
    const start = fhrData[0].x;
    const end = fhrData[fhrData.length - 1].x;
    return Math.round((end - start) / 1000 / 60);
  }, [fhrData]);

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
          backgroundColor: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          transform: "translateY(-400vw)",
        }}>
          <div style={{textAlign: "center"}}>
            <h3>Кардиотокография плода (КТГ)</h3>
            <p>
              Дата: {new Date().toLocaleDateString("ru-RU")} | Сеанс: {sessionMinutes} мин
            </p>
          </div>

          <DashboardInContainer
            label="График FHR/UC"
            fhrData={fhrData}
            ucData={ucData}
            style={{flex: 1}}
          />

          <div style={{
            marginTop: "20px",
            borderTop: "1px solid #ccc",
            paddingTop: "15px"
          }}>
            <h4 style={{marginBottom: "10px"}}>Показатели</h4>
            <table style={{width: "100%", borderCollapse: "collapse", marginBottom: "15px"}}>
              <tbody>
              <tr>
                <td style={{padding: "4px 8px", fontWeight: 500}}>Базальная ЧСС</td>
                <td style={{padding: "4px 8px"}}>{fhrData.at(-1)?.y + " уд/мин" || "Нет данных"}</td>
              </tr>
              <tr style={{backgroundColor: "#f9f9f9"}}>
                <td style={{padding: "4px 8px", fontWeight: 500}}>Маточные сокращения</td>
                <td style={{padding: "4px 8px"}}>{ucData.at(-1)?.y || "Нет данных"}</td>
              </tr>
              <tr>
                <td style={{padding: "4px 8px", fontWeight: 500}}>Частота осцилляций</td>
                <td style={{padding: "4px 8px"}}>11 осц/мин</td>
              </tr>
              <tr style={{backgroundColor: "#f9f9f9"}}>
                <td style={{padding: "4px 8px", fontWeight: 500}}>STV</td>
                <td style={{padding: "4px 8px"}}>{stv + " мс" || "Нет данных"}</td>
              </tr>
              <tr>
                <td style={{padding: "4px 8px", fontWeight: 500}}>Потеря сигнала</td>
                <td style={{padding: "4px 8px"}}>5%</td>
              </tr>
              <tr style={{backgroundColor: "#f9f9f9"}}>
                <td style={{padding: "4px 8px", fontWeight: 500}}>FIGO</td>
                <td style={{padding: "4px 8px"}}>{figo || "Нет данных"}</td>
              </tr>
              </tbody>
            </table>

            <h4 style={{marginBottom: "5px"}}>Заключение</h4>
            <p style={{
              background: "#f5f5f5",
              padding: "10px 12px",
              borderRadius: "6px"
            }}>
              Вероятность гипоксии: {hypoxiaProbability != null ? (hypoxiaProbability * 100).toFixed(1) + "%" : "нет данных"}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExportButton;
