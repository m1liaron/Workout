import { useParams } from 'react-router-dom';
import WorkoutExerciseList from '../../workoutExerciseList/WorkoutExerciseList';

const WorkoutExercisePage = ({setShowBar}) => {
  const { workoutId } = useParams();

  return (
    <>
      <WorkoutExerciseList key={workoutId} workoutId={workoutId} setShowBar={setShowBar} />
    </>
  );
};

export default WorkoutExercisePage;
