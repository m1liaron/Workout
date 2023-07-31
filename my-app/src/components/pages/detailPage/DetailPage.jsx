import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { selectExercise } from "../../../redux/exercise/exerciseSlice";
import { selectHistory } from "../../../redux/history/historySlice";
import { selectWorkout } from "../../../redux/workout/workoutSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { formatTime } from "../../statistic/Statistic";

const DetailPage = () => {
    const exercise = useSelector(selectExercise);
    const history = useSelector(selectHistory);
    const workout = useSelector(selectWorkout);
    const [count, setCount] = useState(0);
    const workoutName = workout.length > 0 ? workout[0].name : null;
    const navigate = useNavigate();
    
     const handleBackButtonClick = () => {
        navigate(-1); 
    }
    
    // useEffect(() => {
    //     if (history.length <= 0) {
    //     setCount(0)
    //     } else {
    //     setCount(count + 1);
    //     }
    // }, [history]);  

    // const sliceMonth = history.length > 1 ? history[count].month.slice(0, 3) : null;
    
    return (
        <>
            <h1 style={{display: 'table'}}>
                <Link to='/statistic' onClick={handleBackButtonClick}>
                    <i className="fa-solid fa-arrow-left fa-xs" style={{marginRight: '20px', marginLeft: '15px'}}></i>
                </Link>
                Деталі
            </h1>
            <div style={{ textAlign: 'left' }}>
                <div style={{ background: '#fff', marginBottom: '0', padding: '10px'}}>
                     <h1>{workoutName}</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h1>{history[count].startTime + '-' + history[count].finishTime}</h1>
                            <p style={{color: 'gray'}}>{'Лип' + ' ' + history[count].day}</p>
                        </div>
                        <div>
                                <h1>{formatTime(history[count].time)}</h1>
                                <p style={{color: 'gray'}}>Тривалість</p>
                        </div>
                    </div>
                </div>
                {exercise.map(item => {
                    return (
                        <div style={{ padding: '10px',marginBottom: '20px', background: '#fff'}}>
                            <div style={{ background: '#fff'}}>
                                <h3>{item.name}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DetailPage;