import React, { useState, useEffect } from 'react';
import './Statistic.css';
import { StyledInput } from './Statistic.styled';

const Statistic = () => {
const [value, setValue] = useState('');
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeksInMonth = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

  const table = [];
  let dayCounter = 1;

  for (let i = 0; i < weeksInMonth; i++) {
    const row = [];

    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
        row.push(<td key={i + "-" + j} className="empty-cell"></td>);
      } else {
        const isActive = day === dayCounter; 
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

  const formattedToday = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  useEffect(() => {
    setValue(formattedToday);
  }, [formattedToday]);

  const handleDateChange = (e) => {
    setValue(e.target.value); 
    };
    
  return (
      <>
        <div style={{ padding: '30px' }}>
            <table>
                <thead>
                <tr>
                    <th style={{background: 'rgb(70 192 255)'}}>Нед</th>
                    <th>Пон</th>
                    <th>Вів</th>
                    <th>Сер</th>
                    <th>Чет</th>
                    <th>П'я</th>
                    <th style={{background: 'rgb(70 192 255)'}}>Суб</th>
                </tr>
                </thead>
                <tbody>{table}</tbody>
            </table>
          </div>
          <StyledInput type="date" value={value} onChange={handleDateChange} />
      </>
  );
};

export default Statistic;
