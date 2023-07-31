import { Link } from "react-router-dom";
import { selectHistory } from "../../redux/history/historySlice";
import { useSelector } from "react-redux";

const History = ({ time, day, startTime, finishTime, month, count }) => {
    const history = useSelector(selectHistory);
    const id = history.length != 0 ? history[count].id : null;
    const sliceMonth = month.slice(0, 3);
    
    return (
        <Link to={`/history/detail/:${id}`} style={{color: '#000'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', background: '#fff', padding: '10px' }}>
                <div>
                    <h1>{startTime + '-' + finishTime}</h1>
                    <p style={{color: 'gray'}}>{sliceMonth + ' ' + day}</p>
                </div>
                <div>
                    <h1>{time}</h1>
                    <p style={{color: 'gray'}}>Тривалість</p>
                </div>
            </div>
        </Link>
    )
}

export default History;