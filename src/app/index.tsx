import React from "react";
import "./styles/index.css";
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import store from "@app/store/store";
import App from "@app/App";

/**
 * Точка входа фронтенд-приложения.
 *
 * ### Основные задачи:
 * - Подключает глобальные стили из `index.css`.
 * - Создаёт корневой React-узел с помощью `ReactDOM.createRoot`.
 * - Оборачивает приложение в:
 *   - {@link React.StrictMode} — помогает отлавливать потенциальные ошибки и предупреждения.
 *   - {@link Provider} из `react-redux` — предоставляет доступ к Redux store для всех компонентов.
 * - Рендерит главный компонент {@link App}.
 *
 * ### Важные детали:
 * - `store` импортируется из `@app/store/store` и содержит всю конфигурацию Redux (редьюсеры, middleware, типизацию).
 * - Корневой DOM-элемент (`#root`) ищется в `public/index.html`.
 * - Включение `StrictMode` не влияет на продакшен, но даёт больше полезных предупреждений в dev-среде.
 */
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
