import React, { useState, useEffect } from 'react';
import './Statistic.css';
import { useSelector } from 'react-redux';
import { selectHistory } from '../../redux/history/historySlice';
import History from '../history/History';
import { Link } from 'react-router-dom';

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
    if (historiya.length <= 0) {
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

        const isHistoryDay = historiya.some(historyEntry => {
            const entryDay = parseInt(historyEntry.day.split('.')[0]);
            return entryDay === dayCounter && month === curMonth && year === curYear;
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

  const time = historiya.length === 0 ? '00:00:00' : formatTime(historiya[historiya.length - 1].time);
  const allTime = historiya.map(item => item.time).reduce((a, b) => a + b, 0);

  return (
    <div style={{ marginBottom: '120px' }}>
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
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{ display: 'table' }}>
              <h1>сьогодні</h1>
              <p>{time}</p>
          </div>
          <div style={{display: 'table'}}>
            <h1>усього:</h1>
              <p>{historiya.length === 0 ? '00:00:00' : formatTime(allTime)}</p>
          </div>
          </div>
            </div>
          </Link>
            {/* <StyledInput type="date" value={value} onChange={handleDateChange} /> */}
          <h1>Історія</h1>
          <div style={{textAlign: 'right'}}>
            <Link to='/history' style={{textDecoration: 'none'}}>Подивитись усю</Link>
          </div>
        <div>
            <History
            monthL={months[month]}
            month={month}
            lastHistoryEntry={historiya[historiya.length - 1]} 
          />
        </div>
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