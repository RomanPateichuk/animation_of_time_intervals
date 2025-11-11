import { HistoricalEvent } from '@components/App/types';
import { useGSAP } from '@gsap/react';
import classNames from 'classnames';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import arrowLeft from '../../assets/icons/arrowLeft.svg';
import arrowRight from '../../assets/icons/arrowRight.svg';
import titleLine from '../../assets/icons/titleLine.svg';
import { historicalEvents } from './mockData';
import s from './styles.module.scss';

export const App = () => {
  const [elements, setElements] = useState<HistoricalEvent[] | null>(null);
  const [activeElement, setActiveElement] = useState(6);
  const [hoveredElement, setHoveredElement] = useState<number | null>(null);

  const isExtraLarge = useMediaQuery('(max-width: 1200px)');
  const isMedium = useMediaQuery('(max-width: 768px)');

  const container = useRef<HTMLDivElement | null>(null);
  const rotationIndex = useRef({ index: 6 });
  useEffect(() => {
    setElements(historicalEvents);
  }, []);

  useGSAP(
    () => {
      updateCirclePositions(activeElement);

      gsap.to(rotationIndex.current, {
        index: activeElement,
        duration: 0.5,
        ease: 'power2.inOut',

        onUpdate: () => {
          updateCirclePositions(rotationIndex.current.index);
        },
      });
    },
    { scope: container, dependencies: [activeElement, elements, hoveredElement] },
  );

  const updateCirclePositions = (currentAnimatedIndex: number) => {
    const R = 265;
    const centerX = 268;
    const centerY = 265;

    const items = gsap.utils.toArray(
      '[data-gsap-target="circle-item"]',
      container.current,
    );

    items.forEach((item: any, i) => {
      const angleStep = Math.PI / 3;
      const offsetAngle = (5 - (currentAnimatedIndex - 1)) * angleStep;
      const angle = i * angleStep + offsetAngle;
      const isActive = i + 1 === activeElement;
      const isHovered = i + 1 === hoveredElement;
      const itemSize = isActive || isHovered ? 56 : 6;
      const xPos = centerX + R * Math.cos(angle) - itemSize / 2;
      const yPos = centerY + R * Math.sin(angle) - itemSize / 2;

      gsap.set(item, {
        x: xPos,
        y: yPos,
        position: 'absolute',
      });
    });
  };

  const generateCircleItems = () => {
    return (
      <>
        {elements?.map((item, index) => {
          const hoverHandlers = !isMedium
            ? {
                onMouseEnter: () => {
                  setHoveredElement(index + 1);
                },
                onMouseLeave: () => {
                  setHoveredElement(null);
                },
              }
            : {};

          return (
            <div
              key={item.id}
              data-gsap-target="circle-item"
              {...hoverHandlers}
              onClick={() => {
                clickItemHandler(index + 1);
              }}
              className={classNames({
                [s.active]: index + 1 === activeElement || index + 1 === hoveredElement,
                [s.item]: index + 1 !== activeElement && index + 1 !== hoveredElement,
              })}>
              {index + 1 === activeElement || index + 1 === hoveredElement
                ? index + 1
                : null}
              {index + 1 === activeElement && (
                <div className={s.circleTitle}>{item.title}</div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  const clickItemHandler = (index: number) => {
    setActiveElement(index);
  };

  const previousDateHandler = () => {
    setActiveElement((prev) => {
      return prev > 1 ? prev - 1 : 1;
    });
  };

  const nextDateHandler = () => {
    setActiveElement((prev) => {
      return prev < historicalEvents.length ? prev + 1 : historicalEvents.length;
    });
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.bg}>
          <div className={s.numbersWrapper}>
            <p className={s.dateStart}>{elements?.[activeElement - 1]?.start}</p>
            <p className={s.dateEnd}>{elements?.[activeElement - 1]?.end}</p>
          </div>
          <div ref={container} className={s.circleWrapper}>
            {generateCircleItems()}
          </div>
        </div>
        <div className={s.titleWrapper}>
          {!isMedium && (
            <div>
              <img src={titleLine} alt="title line" />
            </div>
          )}
          <p className={s.title}>
            Исторические <br /> даты
          </p>
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
            navigation={!isMedium}
            modules={[Navigation, Pagination]}
            pagination={
              isMedium && {
                clickable: true,
              }
            }
            spaceBetween={isExtraLarge ? 50 : 80}
            slidesPerView={isMedium ? 2 : isExtraLarge ? 3 : 4}
            slidesOffsetBefore={isExtraLarge ? 0 : 80}
            slidesOffsetAfter={isExtraLarge ? 0 : 80}>
            {elements &&
              elements?.[activeElement - 1]?.children?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={s.sliderItem}>
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
