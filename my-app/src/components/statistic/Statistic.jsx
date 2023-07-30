import React, { useState, useEffect } from 'react';
import './Statistic.css';
import {selectStatic} from '../../redux/statistic/statisticSlice'
import { useSelector } from 'react-redux';
// import { StyledInput } from './Statistic.styled';

const Statistic = ({setShowBar}) => {
  const timeAll = useSelector(selectStatic);
  const [value, setValue] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    setShowBar(true);
  })

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  const table = [];
  let dayCounter = 1;

  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();

  for (let i = 0; i < weeksInMonth; i++) {
    const row = [];

    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        row.push(<td key={i + '-' + j} className="empty-cell"></td>);
      } else {
        const isActive = day === dayCounter && month === curMonth && year === curYear;
        row.push(
          <td key={dayCounter} className={isActive ? 'active tracker' : 'tracker'}>
            {dayCounter}
          </td>
        );
        dayCounter++;
      }
    }

    table.push(<tr key={i}>{row}</tr>);
  }

  const handleDateChange = (e) => {
    setValue(e.target.value);
    const date = new Date(e.target.value);
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  };

  const handleLeftArrowClick = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  useEffect(() => {
    setYear(new Date().getFullYear());

    setIsDisabled(month === curMonth && year === curYear);
  }, [month, year, curMonth, curYear]);

  const handleRightArrowClick = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }

  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const allTime = timeAll.reduce((a, b) => a + b, 0);

  return (
    <div>
          <h6>Ви займались
            <p style={{color: 'rgb(75, 104, 197)', fontWeight: 'bold'}}></p>
          </h6>
      <div style={{display: 'flex', gap:'10px', justifyContent:'center'}}>
        <div style={{display: 'table'}}>
          <h6>сьогодні:
            <p style={{color: 'rgb(75, 104, 197)', fontWeight: 'bold'}}>{timeAll.length === 0 ? '00:00:00' : formatTime(timeAll[0])}</p>
          </h6>
        </div>
        <div style={{display: 'table'}}>
          <h6>усього:
            <p style={{color: 'rgb(75, 104, 197)', fontWeight: 'bold'}}>{timeAll.length === 0 ? '00:00:00' : formatTime(allTime)}</p>
          </h6>
        </div>
      </div>
      <div style={{ padding: '15px' }}>
        <div>{months[month]} {year}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'  }}>
          <button onClick={handleLeftArrowClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button onClick={handleRightArrowClick} disabled={isDisabled}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ background: 'rgb(70 192 255)' }}>Нед</th>
              <th>Пон</th>
              <th>Вів</th>
              <th>Сер</th>
              <th>Чет</th>
              <th>П'я</th>
              <th style={{ background: 'rgb(70 192 255)' }}>Суб</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
      </div>
      {/* <StyledInput type="date" value={value} onChange={handleDateChange} /> */}
      </div>
  );
};

export default Statistic;
