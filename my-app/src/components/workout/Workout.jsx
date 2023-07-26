import { removeWorkout } from '../../redux/workout/workoutSlice';
import { useDispatch } from 'react-redux'; 
import { LI } from './Workout.styled';
import { Link } from "react-router-dom";

const Workout = ({ name, id }) => {
    const dispatch = useDispatch();

    return (
        <>
            <LI>{name}</LI>
            <Link to={`/workout/exercise/${id}`}>Exercise</Link>
            <button onClick={() => dispatch(removeWorkout(id))}>Remove</button>
        </>
    )
}

export default Workout;