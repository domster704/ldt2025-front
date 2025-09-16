import React, {FC, useEffect, useState} from 'react';
import blankImg from "@shared/assets/img/blankImg.svg";

/**
 * Функциональный компонент для отложенной загрузки видео
 * @param img - ссылка на изображение в формате URL
 * @param callback - функция обратного вызова
 * @param className - CSS класс
 * @param dependency - зависимости для useEffect
 */
const AsyncVideo: FC<{
  video: string,
  callback?: () => void,
  className?: string,
  dependency?: any[],
}> = React.memo(({video, callback, className, dependency}) => {
  const [_video, set_video] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Имитация отложенной загрузки видео
   */
  useEffect(() => {
    async function loadImg() {
      set_video(video);
      setIsLoading(false);
    }

    loadImg().then()
  }, dependency || [])

  if (isLoading) {
    return <img src={blankImg} alt=""/>
  }

  return (
    <video className={className}
           onClick={callback}
           src={_video}
           controls
           muted={true}
           playsInline
           autoPlay={true}
           webkit-playsinline="true"
           loop/>
  )
});
export default AsyncVideo;