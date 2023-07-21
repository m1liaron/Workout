import { addWorkout, removeWorkout, selectWorkout } from "./workoutSlice";
import { useDispatch, useSelector } from 'react-redux';

const WorkoutList = () => {
    const workoutList = useSelector(selectWorkout)
    const dispatch = useDispatch()
    return (
        <>
        </>
    )
}

export default WorkoutList;