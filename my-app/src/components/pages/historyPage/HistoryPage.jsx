import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { selectHistory } from '../../../redux/history/historySlice';
import History from "../../history/History";
import { Link } from "react-router-dom";
import { formatTime } from "../../statistic/Statistic";

const HistoryPage = ({ setShowBar }) => {
  const historiya = useSelector(selectHistory);
  const [value, setValue] = useState('');
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
  const [isDisabled, setIsDisabled] = useState(false);
  const [count, setCount] = useState(0);
    
  // console.log(historiya[historiya.length - 1].time)

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

  useEffect(() => {
    setShowBar(false);
  });

  return (
        <>
            <h1 style={{display: 'table'}}>
                <Link to='/statistic'>
                    <i className="fa-solid fa-arrow-left fa-xs" style={{marginRight: '20px', marginLeft: '15px'}}></i>
                </Link>
                Історія
            </h1>
            <div style={{ padding: '15px', background: '#fff', marginBottom: '20px' }}>
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
                    <th style={{ background: 'rgb(70 192 255)', color: '#fff'}}>Н</th>
                    <th>П</th>
                    <th>В</th>
                    <th>С</th>
                    <th>Ч</th>
                    <th>П</th>
                    <th style={{ background: 'rgb(70 192 255)', color: '#fff' }}>С</th>
                    </tr>
                </thead>
          <tbody>{table}</tbody>
        </table>
        
            </div>
            <div style={{ background: '#fff', marginBottom: '20px' }}>
                        <History
                          month={months[month]}
                        />
            </div>
        </>
    )
}

export default HistoryPage;