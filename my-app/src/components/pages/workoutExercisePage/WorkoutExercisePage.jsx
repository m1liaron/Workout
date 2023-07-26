import { useParams } from 'react-router-dom';
import WorkoutExerciseList from '../../workoutExerciseList/WorkoutExerciseList';

const WorkoutExercisePage = () => {
  const { workoutId } = useParams();

  return (
    <>
      <h1>Exercise</h1>
      <WorkoutExerciseList workoutId={workoutId} />
    </>
  );
};

export default WorkoutExercisePage;
