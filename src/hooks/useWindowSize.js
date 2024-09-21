import { useState, useEffect, useMemo } from "react";

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Функция для обновления ширины экрана
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Добавляем слушатель события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.debug(windowWidth);
  }, [windowWidth]);

  return useMemo(() => {
    return { windowWidth, isMobile: windowWidth < 767 };
  }, [windowWidth]);
};
