import './FinishWorkout.css'
import StrongMan from '../../assets/img/strong_men.png'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectHistory } from '../../redux/history/historySlice';

const FinishWorkout = ({count}) => {
  const historiya = useSelector(selectHistory);

  const time = historiya[count].time;
  const startDay = historiya[count].day;
  const startTime = historiya[count].startTime;
  const finishTime = historiya[count].finishTime;

  const formatTime = (time) => {
      const hours = Math.floor(time / 3600000);
      const minutes = Math.floor((time % 3600000) / 60000);
      const seconds = Math.floor((time % 60000) / 1000);

      const timeUnits = [];

      if (hours > 0) {
        const hoursSuffix = hours > 1 && hours < 5 ? 'години' : 'година';
        timeUnits.push(`${hours.toString().padStart(2)} ${hoursSuffix}`);
      }

      if (minutes > 0) {
        const minuteSuffix = minutes > 1 && minutes < 5 ? 'хвилини' : 'хвилин';
        timeUnits.push(`${minutes.toString().padStart(2)} ${minuteSuffix}`);
      }

      if (seconds > 0) {
        const secondSuffix = seconds > 1 && seconds < 5 ? 'секунди' : 'секунд';
        timeUnits.push(`${seconds.toString().padStart(2, "0")} ${secondSuffix}`);
      }

      return timeUnits.join(' ');
  };

  return (
    <>
      <div className='container'>
        <div style={{ display: 'flex' }}>
          <img src={StrongMan} alt='Man' style={{ width: '150px' }} />
          <div
            style={{
              width: '8rem',
              height: '5.5rem',
              fill: '#FFF',
              filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              background: '#fff',
              borderRadius: '100%',
            }}
          >
            <h1 style={{ marginTop: '20px' }}>Вітаю!</h1>
          </div>
        </div>
        <div
          style={{
            width: '244px',
            border: '1px solid #A9D6FF',
            background: '#FFF',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <h4>
            Тривалість:
          </h4>
          <p>{formatTime(time)}</p>
          <h4>Займались: </h4>
          <p>{startDay}</p>
          <span style={{background: 'rgb(75, 104, 197)', color: '#ffff', padding: '10px', borderRadius:'10px'}}>{startTime}-{finishTime}</span>
        </div>
          <Link to='/statistic'>
            Повернутись
          </Link>
      </div>
    </>
  )
}

export default FinishWorkout;