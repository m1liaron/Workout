import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addExercise, selectExercise } from '../../redux/exercise/exerciseSlice';
import Exercise from '../exercise/Exercise';

const fixedDiv = {
    position: 'fixed',
    bottom: '122px',
    right: '21%'
}

const WorkoutExerciseList = ({ workoutId}) => {
  const exercises = useSelector(selectExercise);
  const [value, setValue] = useState('');
  const [start, setStart] = useState(false);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();

  const handleAddExercise = (e) => {
    const newExercise = {
      name: value === '' ? 'New training' : value,
      id: uuidv4(),
      workoutId: workoutId,
    };

    dispatch(addExercise(newExercise));

    setValue('');
  };

  return (
    <div style={{ padding: '10px' }}>
      {change ?<p>режим розробки</p> : null}
    <div style={{display: 'flex', marginBottom:'10px'}}>
        <input
      type="text"
      placeholder="ім'я"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="form-control"
      />
      <button
        onClick={handleAddExercise}
        className="btn btn-primary"
      >
        Додати тренування
      </button>
    </div>
    <div>
      <ul>
        {exercises.length === 0 ? (
          <h1 className="text-center">Нема поки що тренуваннь</h1>
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
                  star={start}
                  change={change}
                  className="my-3"
                />
            ))
        )}
      </ul>
          <div style={fixedDiv}>
            <button onClick={() => setStart(!start)} className="btn btn-primary">Почати</button>
            <button onClick={() => setChange(!change)} className="btn btn-secondary" style={{marginLeft: '10px'}}>Редагувати</button>
          </div>
      </div>
      </div>
  );
}

export default WorkoutExerciseList;