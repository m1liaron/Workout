import React, { useState, useEffect } from 'react';
import { addWorkout, selectWorkout } from "../../redux/workout/workoutSlice";
import { useDispatch, useSelector } from 'react-redux';
import Workout from "../workout/Workout";
import { UL } from './WorkoutList.styled';
import { v4 as uuidv4 } from 'uuid';

const WorkoutList = () => {
  const workouts = useSelector(selectWorkout);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

const handleAddWorkout = () => {
    const newWorkout = {
      name: value === '' ? 'Нове тренування' : value,
      id: uuidv4()
    };


  dispatch(addWorkout(newWorkout));

    setValue('');
  };

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);
  
  return (
    <>
      <input
        type="text"
        placeholder="ім'я"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ marginBottom: '20px' }}
        className="form-control"
      />
      <button
        onClick={handleAddWorkout}
        className="btn btn-primary"
      >
        Додати тренування
      </button>
      <UL className="list-group">
        {workouts &&
          workouts.map((workout) => (
            <Workout
              key={workout.id}
              id={workout.id}
              name={workout.name}
              className="list-group-item"
            />
          ))
        }
      </UL>
    </>
  );
}

export default WorkoutList;
