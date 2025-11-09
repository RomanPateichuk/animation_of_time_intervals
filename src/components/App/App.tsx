import image from '../../assets/icons/favicon.png';
import svg from '../../assets/icons/gpt.svg';
import svg2 from '../../assets/icons/titleLine.svg';
import s from './styles.module.scss';

export const App = () => {
  return (
    <>
      <img src={image} alt="icon" width="150" height="150" />
      <img src={svg} alt="icon" width="150" height="150" />
      <div className={s.titleWrapper}>
        <div>
          <img src={svg2} alt="icon2" />
        </div>
        <p className={s.title}>Исторические даты</p>
      </div>

      <div>
        <p className={s.subTitle}>2015</p>
        <p className={s.description}>
          13 сентября — частное солнечное затмение, видимое в Южной Африке и части
          Антарктиды
        </p>
      </div>

      <div className={s.numbersWrapper}>
        <p className={s.dateStart}>2015</p>
        <p className={s.dateEnd}>2022</p>
      </div>
    </>
  );
};
