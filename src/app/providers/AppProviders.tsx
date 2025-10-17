import React, {FC} from "react";
import {useBootstrap} from "@app/hooks";

/**
 * Компонент-обёртка для инициализации приложения.
 *
 * ### Основные задачи:
 * - Вызывает хук {@link useBootstrap}, который отвечает за начальную инициализацию приложения
 *   (например, загрузку конфигурации, установку локальных данных, запуск подписок и т.п.).
 * - Оборачивает дочерние элементы и возвращает их без изменений.
 */
const AppProviders: FC<{ children: React.ReactNode }> = ({children}) => {
  // Выполняем начальную инициализацию приложения
  useBootstrap();

  return (
    <>
      {children}
    </>
  );
};

export default AppProviders;
