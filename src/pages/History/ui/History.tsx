import React, {FC} from 'react';
import * as style from './History.module.css'
import PageWrapper from "@shared/ui/page-wrapper";
import HistoryTable from "@widgets/history-table";
import CTGHistorySelectionProvider from "@features/ctg-history-selection-provider";
import CTGAnalysisDashboard from "@widgets/ctg-analysis-dashboard";
import {SimpleHeader} from "@widgets/header";

interface HistoryProps {
}

/**
 * Страница "История КТГ".
 *
 * ---
 * ### Основные элементы:
 * - {@link PageWrapper} — общий контейнер для страницы (задаёт отступы и оформление).
 * - {@link SimpleHeader} — заголовок страницы с текстом "История КТГ".
 * - {@link CTGHistorySelectionProvider} — провайдер контекста выбора записей КТГ.
 *   - Позволяет пользователю выбрать 0, 1 или 2 записи для анализа или сравнения.
 * - {@link HistoryTable} — таблица с перечнем всех записей КТГ:
 *   - показывает дату, срок беременности, ЧСС, UC, статус FIGO и прогноз.
 *   - позволяет выбирать записи для анализа.
 * - {@link CTGAnalysisDashboard} — панель анализа:
 *   - если записи не выбраны → графики динамики (FIGO, STV и др.).
 *   - если выбрана одна запись → детализированные параметры.
 *   - если выбраны две записи → сравнение в виде таблицы и графиков.
 *
 * ---
 * ### Логика работы:
 * - Пользователь выбирает записи в {@link HistoryTable}.
 * - Провайдер {@link CTGHistorySelectionProvider} сохраняет выбранные ID.
 * - {@link CTGAnalysisDashboard} автоматически переключается в нужный режим (графики / параметры / сравнение).
 *
 * ---
 * @component
 * @example
 * ```tsx
 * import History from "@pages/history";
 *
 * const AppRoutes = () => (
 *   <Routes>
 *     <Route path="/history" element={<History />} />
 *   </Routes>
 * );
 * ```
 */
const History: FC<HistoryProps> = ({}) => {
  return (
    <PageWrapper>
      <SimpleHeader headerText={"История КТГ"}/>
      <CTGHistorySelectionProvider>
        <section className={style.content}>
          <HistoryTable/>
          <CTGAnalysisDashboard/>
        </section>
      </CTGHistorySelectionProvider>
    </PageWrapper>
  );
};

export default History;
