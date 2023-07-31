import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addExercise, selectExercise } from '../../redux/exercise/exerciseSlice';
import { addHistory, selectHistory } from '../../redux/history/historySlice';
import { selectWorkout } from '../../redux/workout/workoutSlice';
import Exercise from '../exercise/Exercise';
import Stopwatch from '../stopwatch/Stopwatch';
import FinishWorkout from '../finishWorkout/FinishWorkout';

const fixedDiv = {
    position: 'fixed',
    bottom: '122px',
    right: '21%'
}

const WorkoutExerciseList = ({ workoutId, setShowBar }) => {
  const historiya = useSelector(selectHistory);
  const [isRunning, setIsRunning] = useState(false);
  const exercises = useSelector(selectExercise);
  const [value, setValue] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [start, setStart] = useState(false);
  const [change, setChange] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [startDay, setStartDay] = useState('');
  const [finishTime, setFinishTime] = useState('');
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const handleAddExercise = (e) => {
    const newExercise = {
      name: value === '' ? 'Нова вправа' : value,
      id: uuidv4(),
      workoutId: workoutId,
    };

    dispatch(addExercise(newExercise));

    setValue('');
  };

  const startWorkout = () => {
    if (exercises.length !== 0) {
      setStart(true)
      setShowBar(false);
      setStartTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
    } else {
      return;
    }
  }

  const finishWorkout = () => {
    setShowFinished(true);

    const historyWorkout = {
      day: startDay,
      time: elapsedTime,
      startTime: startTime,
      finishTime: finishTime,
      id: uuidv4()
    }

    dispatch(addHistory(historyWorkout));
    if (historiya.length <= 0) {
      setCount(0)
    } else {
      setCount(count + 1);
    }
  }

  useEffect(() => {
    setFinishTime(`${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`);
    setStartDay(`${new Date().getDate()}.0${new Date().getMonth() + 1}`);
  })

  return (
    <>
    <div>
        {start && !showFinished ? <Stopwatch start={start} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} /> : null}
      {change ?<p>режим розробки</p> : null}
    {!start ? 
    <div style={{display: 'flex', marginBottom:'10px', padding: '10px'}}>
      <input
        type="text"
        placeholder="ім'я"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="form-control"
    />
    <button onClick={handleAddExercise} className="btn btn-primary">Додати вправу</button>
    </div> 
    : null
    }
      <div>
          {!showFinished ? 
      <ul>
        {exercises.length === 0 ? (
          <h1 className="text-center">Нема поки що вправ</h1>
        ) : (
          exercises
            .filter(exercise => {
              return exercise.workoutId === workoutId;
            })
            .map((exercise) => (
                <Exercise
                  key={exercise.id}
                  id={exercise.id}
                  name={exercise.name}
                  start={start}
                  change={change}
                  className="my-3"
                />
            ))
        )}
      </ul>: null}
          <div style={{...fixedDiv, right: start ? '30%' : '21%', bottom: start ? '12px' : '126px'}}>
            {!showFinished ? <button onClick={!start ? startWorkout : finishWorkout} className="btn btn-primary">{start ? 'Закінчити' : 'Почати'}</button> : null}
            {!start ? 
            <button onClick={() => setChange(!change)} className="btn btn-secondary" style={{marginLeft: '10px'}}>Редагувати</button>
              : null
          }
          </div>
      </div>
      </div>
      <div>
        {showFinished ? 
          <FinishWorkout setShowBar={setShowBar} count={count} /> : null
        }
      </div>
    </>
  );
}

export default WorkoutExerciseList;