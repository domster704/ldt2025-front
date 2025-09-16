import React, {FC, useEffect, useState} from 'react';
import blankImg from "@shared/assets/img/blankImg.svg";

/**
 * Функциональный компонент для отложенной загрузки изображения
 * @param img - ссылка на изображение в формате URL
 * @param callback - функция обратного вызова
 * @param className - CSS класс
 * @param dependency - зависимости для useEffect
 */
const AsyncImage: FC<{
  img: string,
  callback?: () => void,
  className?: string,
  dependency?: any[],
}> = React.memo(({img, callback, className, dependency}) => {
  const [_img, set_img] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Имитация отложенной загрузки картинки
   */
  useEffect(() => {
    async function loadImg() {
      set_img(img);
      setIsLoading(false);
    }

    loadImg().then()
  }, dependency || [])

  if (isLoading) {
    return <img src={blankImg} alt=""/>
  }

  return (
    <img className={className}
         loading="lazy"
         onClick={callback}
         src={_img}
         alt=""/>
  )
});
export default AsyncImage;