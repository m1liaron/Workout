import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addExercise, removeExercise, selectExercise } from '../../redux/exercise/exerciseSlice';
import { addHistory, selectHistory } from '../../redux/history/historySlice';
import { removeWorkout , updateWorkoutName, selectWorkout } from '../../redux/workout/workoutSlice';
import Exercise from '../exercise/Exercise';
import Stopwatch from '../stopwatch/Stopwatch';
import FinishWorkout from '../finishWorkout/FinishWorkout';
import { Link } from 'react-router-dom';
import { selectSets } from '../../redux/sets/setsSlice';

const fixedDiv = {
    position: 'fixed',
    bottom: '22px',
    right: '0%'
}

const WorkoutExerciseList = ({ workoutId, setShowBar }) => {
  const historiya = useSelector(selectHistory);
  const exercises = useSelector(selectExercise);
  const workout = useSelector(selectWorkout);
  const sets = useSelector(selectSets);
  const [value, setValue] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [start, setStart] = useState(false);
  const [change, setChange] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [startDay, setStartDay] = useState('');
  const [finishTime, setFinishTime] = useState('');
  const [count, setCount] = useState(0);
  const [editWorkout, setEditWorkout] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const dispatch = useDispatch();

  const selectedWorkout = workout.filter(item => item.id === workoutId);

  const handleAddExercise = (e) => {
    const newExercise = {
      name: value === '' ? 'Нова вправа' : value,
      id: uuidv4(),
      workoutId: workoutId,
    };

    dispatch(addExercise(newExercise));

    setValue('');
  };

  useEffect(() => {
    setShowBar(false)
  });

  const startWorkout = () => {
    if (exercises.length !== 0) {
      setStart(true)
      setStartTime(`${new Date().getHours()}:${new Date().getMinutes()}`);
      setChange(false);
    } else {
      return;
    }
  }

  const finishWorkout = () => {
    setShowFinished(true);
   const exId = exercises.map(e => {
     return e.id;
   })
    const exDuration = sets.map(e => {
      return e.timer;
    })
    
    console.log(exDuration)

    const historyWorkout = {
      day: startDay,
      time: elapsedTime,
      startTime: startTime,
      finishTime: finishTime,
      exerciseId: exId,
      duration: exDuration,
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

  const removeCurWorkout = () => {
    const selectedExercises = exercises
      .filter(item => item.workoutId === workoutId)
      .map(item => item.id);

    selectedExercises.forEach(exerciseId => {
      dispatch(removeExercise(exerciseId));
    });
    dispatch(removeWorkout(workoutId));
  };

  return (
    <>
      {!start ?
        <div style={{ background : 'rgb(75, 104, 197)', color: '#fff'}}>
            <div style={{justifyContent: 'space-between', display: 'flex', padding: '20px' ,alignItems: 'center'}}>
              <Link to='/' style={{color: '#fff'}}>
                    <i className="fa-solid fa-arrow-left fa-2xl" style={{marginRight: '20px', marginLeft: '15px'}}></i>
            </Link>
            {editWorkout ?
              <div style={{maxWidth: '113px', background: '#000'}}>
                <Link to='/'><button onClick={removeCurWorkout}>Видалити</button></Link>
                {/* <button onClick={() => setChangeName(true)}>Редагувати</button> */}
              </div>
              : null}
                    <i class="fa-solid fa-ellipsis-vertical fa-2xl" style={{lineHeight: '0em'}} onClick={() => setEditWorkout(!editWorkout)}></i>
            </div>
          <h1 style={{ padding : '10px'}}>{selectedWorkout[0].name}</h1>
      </div> : null}
    <div>
        {start && !showFinished ? <Stopwatch start={start} elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} /> : null}
      {change && exercises.length > 0 ?<p>режим розробки</p> : null}
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
          <div style={{...fixedDiv, right: start ? '10%' : '0%'}}>
            {!showFinished ? <button onClick={!start ? startWorkout : finishWorkout} className="btn btn-primary" style={{ fontSize: '2rem', width: '330px', marginBottom: '10px'}}>{start ? 'Закінчити' : 'Почати'}</button> : null}
            {!start ? 
            <button onClick={() => setChange(!change)} className="btn btn-secondary" style={{fontSize: '2rem', width: '330px' ,}}><i style={{fontSize: '1rem'}} class="fa-solid fa-pen fa-xs"></i> Редагувати</button>
              : null
          }
          </div>
      </div>
      </div>
      <div style={{background: '#fff'}}>
        {showFinished ? 
          <FinishWorkout setShowBar={setShowBar} count={count} /> : null
        }
        {/* {changeName ? 
          <ChangeWorkout setActive={setChangeName} selectedWorkout={selectedWorkout} />
        : null} */}
      </div>
    </>
  );
}

export default WorkoutExerciseList;


// const div = {
//     position: 'fixed',
//     top: '0',
//     left:' 0',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// }

// const content = {
//     position: 'relative',
//     maxWidth: '400px',
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//     top: '411px'
// }

// const ChangeWorkout = ({setActive, selectedWorkout}) => {
//   const [value, setValue] = useState('');
//   const dispatch = useDispatch();
  
//   const onSubmit = () => {
//       dispatch(updateWorkoutName({ workoutId: selectedWorkout.id, newName: value }));
//       setActive(false);
//   };  

//   return (
//     <>
//       <div style={div}>
//         <div style={content}>
//           <div>
//              <input style={{width: '100%'}} type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
//              <button type='submit' onClick={onSubmit}>Зберегти</button>
//           </div>
//         </div>
//      </div>
//     </>
//   )
// }