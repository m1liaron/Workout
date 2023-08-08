import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { selectExercise } from "../../../redux/exercise/exerciseSlice";
import { selectHistory } from "../../../redux/history/historySlice";
import { selectWorkout } from "../../../redux/workout/workoutSlice";
import { selectSets } from "../../../redux/sets/setsSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { formatTime } from "../../statistic/Statistic";
import './DetailPage.css'
import Graph from "../../graph/Grapgh";

const DetailPage = () => {
    const { id } = useParams();
    const exercise = useSelector(selectExercise);
    const history = useSelector(selectHistory);
    const workout = useSelector(selectWorkout);
    const sets = useSelector(selectSets);
    const [count, setCount] = useState(0);
    const workoutName = workout.length > 0 ? workout[count].name : null;
    const navigate = useNavigate();

    const cleanedId = id.replace(":", "");

    const selectedHistory = history.find(entry => entry.id === cleanedId);
    
    const selectedExercises = exercise.filter(item => selectedHistory.exerciseId.includes(item.id));

     const handleBackButtonClick = () => {
        navigate(-1); 
    }

    return (
        <>
            <h1 style={{display: 'table'}}>
                <Link to='/statistic' onClick={handleBackButtonClick}>
                    <i className="fa-solid fa-arrow-left fa-xs" style={{marginRight: '20px', marginLeft: '15px'}}></i>
                </Link>
                Деталі
            </h1>
            {workout
                .filter((workout => workout.id === selectedExercises[0].workoutId))
                .map((enty) => {
                    <h1>{enty.name}</h1>
                })}
                <div style={{ textAlign: 'left' }}>
                <div style={{ background: '#fff', marginBottom: '0', padding: '10px'}}>
                     <h1>{workoutName}</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{fontWeight: 'bold'}}>{selectedHistory.startTime + '-' + selectedHistory.finishTime}</h1>
                            <p style={{color: 'gray'}}>{'Лип' + ' ' + selectedHistory.day}</p>
                        </div>
                        <div>
                            <h1 style={{fontWeight: 'bold'}}>{formatTime(selectedHistory.time)}</h1>
                            <p style={{color: 'gray'}}>Тривалість</p>
                        </div>
                    </div>
                </div>
                {selectedExercises.map(exercise => (
                    <div key={exercise.id} style={{ padding: '10px',marginBottom: '20px', background: '#fff'}}>
                        <div style={{ background: '#fff'}}>
                            <h3 style={{marginLeft: '10px', fontWeight: 'bold'}}>{exercise.name}</h3>
                            {sets
                                .filter((set) => set.exId === exercise.id) 
                                .map((set,index) => (
                                    <li key={set.setId} style={{
                                                    display: 'flex',
                                                    borderRadius: '20px',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                    padding: '5px',
                                                    marginBottom: '10px',
                                                    justifyContent:'space-between'
                                                }}>
                                        <div style={{display:'flex'}}>
                                            <h1 style={{background: '#000', borderRadius: '100%', color: '#fff', padding: '0px 11px 1px 8px', fontSize: '2rem'}}>{index + 1}</h1>
                                            <span style={{margin: '0px 5px 0px 5px'}}> x </span>
                                            <h1>{set.repetitions}</h1>
                                        </div>
                                        <p>{set.timer > 0 ? formatTime(set.timer) : 0}</p>
                                    </li>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <Graph/>
        </>
    )
}

export default DetailPage;