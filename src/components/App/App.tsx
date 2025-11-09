import { HistoricalEvent } from '@components/App/types';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import arrowLeft from '../../assets/icons/arrowLeft.svg';
import arrowRight from '../../assets/icons/arrowRight.svg';
import titleLine from '../../assets/icons/titleLine.svg';
import { historicalEvents } from './mockData';
import s from './styles.module.scss';

export const App = () => {
  const [element, setElement] = useState<HistoricalEvent | null>(null);
  const [activeElement, setActiveElement] = useState(10);

  useEffect(() => {
    setElement(historicalEvents[9]);
  }, []);

  const radius = 266;

  const clickItemHandler = (item: HistoricalEvent, index: number) => {
    setActiveElement(index);
    setElement(item);
  };

  const previousDateHandler = () => {
    setActiveElement((prev) => {
      const newIndex = prev > 1 ? prev - 1 : 1;
      setElement(historicalEvents[newIndex - 1]);
      return newIndex;
    });
  };

  const nextDateHandler = () => {
    setActiveElement((prev) => {
      const newIndex =
        prev < historicalEvents.length ? prev + 1 : historicalEvents.length;
      setElement(historicalEvents[newIndex - 1]);
      return newIndex;
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.titleWrapper}>
          <div>
            <img src={titleLine} alt="titleLine" />
          </div>
          <p className={s.title}>
            Исторические <br /> даты
          </p>
        </div>

        <div className={s.numbersWrapper}>
          <p className={s.dateStart}>{element?.start}</p>
          <p className={s.dateEnd}>{element?.end}</p>
        </div>
        <div className={s.circleWrapper}>
          {historicalEvents.map((item, index) => {
            const angle = ((2 * Math.PI) / historicalEvents.length) * index;
            const itemSize = index + 1 === activeElement ? 56 : 6;
            const x = 268 + radius * Math.cos(angle) - itemSize / 2;
            const y = 265 + radius * Math.sin(angle) - itemSize / 2;

            return (
              <div
                onClick={() => {
                  clickItemHandler(item, index + 1);
                }}
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                className={classNames({
                  [s.active]: index + 1 === activeElement,
                  [s.item]: index + 1 !== activeElement,
                })}>
                {index + 1 === activeElement ? index + 1 : null}
              </div>
            );
          })}
        </div>
        <div className={s.circleButtons}>
          <p className={s.text}>{`${activeElement}/${historicalEvents.length}`}</p>
          <div className={s.group}>
            <button
              onClick={previousDateHandler}
              disabled={activeElement === 1}
              className={s.button}>
              <img src={arrowLeft} alt="arrow left" />
            </button>
            <button
              onClick={nextDateHandler}
              disabled={activeElement === historicalEvents.length}
              className={s.button}>
              <img src={arrowRight} alt="arrow right" />
            </button>
          </div>
        </div>
        <div className={s.slider}>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={4}>
            {element &&
              element?.children?.map((item) => (
                <SwiperSlide>
                  <div className={s.sliderItem} key={item.id}>
                    <p className={s.subTitle}>{item.year}</p>
                    <p className={s.description}>{item.description}</p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
