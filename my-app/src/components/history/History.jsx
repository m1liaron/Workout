import { Link } from "react-router-dom";
import { selectHistory } from "../../redux/history/historySlice";
import { useSelector } from "react-redux";
import { formatTime } from "../statistic/Statistic";

const History = ({ month, monthL, lastHistoryEntry  }) => {
  const history = useSelector(selectHistory);

  const monthHistory = history.filter(entry => {
    const entryMonth = entry.day.split('.')[1];
    return parseInt(entryMonth) === month + 1;
  });

  let historyEntriesToShow = history; 

  if (lastHistoryEntry) {
    historyEntriesToShow = [lastHistoryEntry];
  }

  return (
    <>
      {historyEntriesToShow.map((entry, index) => (
        <Link key={index} to={`/history/detail/:${entry.id}`} style={{ color: '#000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: '#fff', padding: '10px' }}>
            <div>
              <h1>{entry.startTime + '-' + entry.finishTime}</h1>
              <p style={{ color: 'gray' }}>{monthL.slice(0, 3) + ' ' + entry.day}</p>
            </div>
            <div>
              <h1>{formatTime(entry.time)}</h1>
              <p style={{ color: 'gray' }}>Тривалість</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

export default History;
