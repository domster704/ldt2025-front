import React, {FC} from 'react';
import * as style from './CTGContextPage.module.css'
import {useAppSelector} from "@app/store/store";
import ColorProvider from "@app/providers/color-provider";
import ColorSignalWrapper from "@widgets/color-signal-wrapper";
import {HeaderGraph} from "@widgets/header";
import {WebsocketProvider} from "@app/providers/websocket-provider/ui/WebsocketProvider";
import {$wsApiUrl} from "@shared/const/constants";
import {DashboardStream} from "@widgets/dashboard";
import PreloaderContainer from "@widgets/preloader-container";
import IndicatorsPanel from "@widgets/indicators-panel";
import {IndicatorsPanelPlacement} from "@widgets/indicators-panel/ui/IndicatorsPanel";
import HistoryLogs from "@widgets/history-logs";
import Anamnesis from "@widgets/anamnesis";
import STVPrediction from "@widgets/stv-predict";

interface CTGContextPageProps {
}

/**
 * Страница "Контекст КТГ".
 *
 * ---
 * ### Основные элементы:
 * - {@link ColorProvider} — предоставляет контекст с цветовой схемой (норма/предупреждение).
 * - {@link ColorSignalWrapper} — обёртка для визуальной подсветки состояния.
 * - {@link HeaderGraph} — верхняя панель с информацией о пациенте и текущем статусе.
 * - {@link WebsocketProvider} — подключение к WebSocket API для получения потоковых данных.
 *   - URL берётся из {@link $wsApiUrl}.
 *   - Автоматически включается/выключается по флагу `streaming`.
 * - {@link DashboardStream} — потоковый график ЧСС плода и маточной активности.
 * - {@link HistoryLogs} — список уведомлений (история событий).
 * - {@link Anamnesis} — панель с анамнезом пациентки.
 * - {@link STVPrediction} — панель прогноза STV.
 * - {@link IndicatorsPanel} — панель текущих показателей (ЧСС, STV, UC и др.).
 * - {@link PreloaderContainer} — отображается при загрузке сессии.
 *
 * ---
 * ### Логика:
 * - Проверяет `streaming` в Redux:
 *   - Если поток включён → активируется {@link WebsocketProvider}, и данные начинают приходить в {@link DashboardStream}.
 *   - Если поток выключен → соединение не создаётся.
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import CTGContextPage from "@pages/ctg-context-page";
 *
 * const AppRoutes = () => (
 *   <Routes>
 *     <Route path="/context" element={<CTGContextPage />} />
 *   </Routes>
 * );
 * ```
 */
const CTGContextPage: FC<CTGContextPageProps> = ({}) => {
  const streaming = useAppSelector((state) => state.sessionStream.streaming);

  return (
    <>
      <ColorProvider>
        <ColorSignalWrapper>
          <HeaderGraph/>

          <main className={style.contextContainer}>
            <div className={style.context}>
              <div className={style.dashboardWithLogs}>
                <HistoryLogs/>
                <WebsocketProvider wsUrl={$wsApiUrl} enabled={streaming}>
                  <DashboardStream/>
                </WebsocketProvider>
              </div>
              <div className={style.context__analytics}>
                <Anamnesis/>
                <STVPrediction/>
              </div>
            </div>
            <IndicatorsPanel placement={IndicatorsPanelPlacement.Grid}/>
          </main>
        </ColorSignalWrapper>
      </ColorProvider>
      <PreloaderContainer/>
    </>
  );
};

export default CTGContextPage;
