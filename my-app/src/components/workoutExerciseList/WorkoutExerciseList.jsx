import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addExercise, selectExercise } from '../../redux/exercise/exerciseSlice';

const WorkoutExerciseList = ({ workoutId }) => {
  const exercises = useSelector(selectExercise);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleAddExercise = () => {
    const newExercise = {
      name: value === '' ? 'New training' : value,
      id: uuidv4(),
      workoutId: workoutId,
    };

    dispatch(addExercise(newExercise));

    setValue('');
  };

  return (
    <>
      <input type="text" placeholder='name' value={value} onChange={(e) => setValue(e.target.value)}/>
      <button onClick={handleAddExercise}>Add</button>
      <ul>
        {exercises &&
          exercises
            .filter(exercise => {
              return exercise.workoutId === workoutId;
            })
            .map((exercise) => (
              <li key={exercise.id}>
                {exercise.name}
              </li>
            ))}
      </ul>
    </>
  );
}

export default WorkoutExerciseList;
