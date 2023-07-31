import React, { useState, useEffect } from 'react';
import './Statistic.css';
import { useSelector } from 'react-redux';
import { selectHistory } from '../../redux/history/historySlice';
import History from '../history/History';
import { Link } from 'react-router-dom';
// import { StyledInput } from './Statistic.styled';

const Statistic = ({ setShowBar }) => {
  const historiya = useSelector(selectHistory);
  const timeAll = '100';
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
  const [isDisabled, setIsDisabled] = useState(false);
  const [count, setCount] = useState(0);
    
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    setShowBar(true);
  })

    useEffect(() => {
    if (historiya.length <= 1) {
      setCount(0)
    } else {
      setCount(count + 1);
    }
    }, [historiya]);  
    
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  const curDate = new Date();
  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();
    
  const table = [];
  let dayCounter = 1;

  for (let i = 0; i < weeksInMonth; i++) {
    const row = [];

    for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        row.push(<td key={i + '-' + j} className="empty-cell"></td>);
        } else {
        const isActive = day === dayCounter && month === curMonth && year === curYear;

        // Check if the dayCounter matches any of the days in historiya
        const isHistoryDay = historiya.some(historyEntry => {
            const entryDay = parseInt(historyEntry.day.split('.')[0]);
            return entryDay === dayCounter;
        });

        row.push(
            <td
            key={dayCounter}
            className={`tracker ${isActive ? 'active' : ''} ${isHistoryDay ? 'history-day' : ''}`}
            >
            {dayCounter}
            </td>
        );
        dayCounter++;
        }
    }

    table.push(<tr key={i}>{row}</tr>);
  }

  useEffect(() => {
    setYear(new Date().getFullYear());

    setIsDisabled(month === curMonth && year === curYear);
  }, [month, year, curMonth, curYear]);

  const months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ];

//   const allTime = timeAll.reduce((a, b) => a + b, 0);
    
  const time = historiya.length === 0 ? '00:00:00' : formatTime(historiya[count].time);
    
  return (
    <div style={{ marginBottom: '120px' }}>
      <div style={{ background: '#fff', marginBottom: '20px'}}>
        <h6>Ви займались
            <p style={{color: 'rgb(75, 104, 197)', fontWeight: 'bold'}}></p>
        </h6>
        <div style={{display: 'flex', gap:'10px', justifyContent:'center'}}>
        <div style={{display: 'table'}}>
            <h6>сьогодні:
            <p style={{color: 'rgb(75, 104, 197)', fontWeight: 'bold'}}>{time}</p>
            </h6>
        </div>
        <div style={{display: 'table'}}>
            {/* <h6>усього:
            <p style={{color: 'rgb(75, 104, 197)', fontWeight: 'bold'}}>{historiya.length === 0 ? '00:00:00' : formatTime(historiya[0].time)}</p>
            </h6> */}
        </div>
        </div>
      </div>
          <Link to='/history' style={{textDecoration: 'none'}}>
            <div style={{ padding: '15px', background: '#fff', marginBottom: '20px' }}>
                <div>{months[month]} {year}</div>
                <table>
                <thead>
                    <tr>
                    <th style={{ background: 'rgb(70 192 255)', color: '#fff'}}>Нед</th>
                    <th>Пон</th>
                    <th>Вів</th>
                    <th>Сер</th>
                    <th>Чет</th>
                    <th>П'я</th>
                    <th style={{ background: 'rgb(70 192 255)', color: '#fff' }}>Суб</th>
                    </tr>
                </thead>
                <tbody>{table}</tbody>
                </table>
            </div>
          </Link>
            {/* <StyledInput type="date" value={value} onChange={handleDateChange} /> */}
            <h1>Історія</h1>
          {historiya && historiya.map((historyEntry, index) => (
        <div key={index} style={{ padding: '15px'}}>
          <History
            time={formatTime(historyEntry.time)}
            day={historyEntry.day}
            startTime={historyEntry.startTime}
            finishTime={historyEntry.finishTime}
            month={months[month]}
            count={count}
          />
        </div>
          ))}
    </div>
  );
};

export default Statistic;



 export const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
 };