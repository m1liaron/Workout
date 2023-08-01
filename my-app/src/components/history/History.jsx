import { Link } from "react-router-dom";
import { selectHistory } from "../../redux/history/historySlice";
import { useSelector } from "react-redux";
import { formatTime } from "../statistic/Statistic";

const History = ({month}) => {
  const history = useSelector(selectHistory);

  return (
    <>
      {history.map((entry, index) => (
        <Link key={index} to={`/history/detail/:${entry.id}`} style={{ color: '#000' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: '#fff', padding: '10px' }}>
            <div>
              <h1>{entry.startTime + '-' + entry.finishTime}</h1>
              <p style={{ color: 'gray' }}>{month.slice(0, 3) + ' ' + entry.day}</p>
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
