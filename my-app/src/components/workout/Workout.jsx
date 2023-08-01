import { removeWorkout } from '../../redux/workout/workoutSlice';
import { useDispatch } from 'react-redux'; 
import { LINK } from './Workout.styled';

const Workout = ({ name, id }) => {
    const dispatch = useDispatch();

    return (
        <div style={{display: 'flex'}}>
            <LINK to={`/workout/exercise/${id}`} style={{textDecoration: 'none'}}>
                <p>{name}</p>
            </LINK>
            <button className='btn btn-primary' onClick={() => dispatch(removeWorkout(id))}>Видалити</button>
        </div>
    )
}

export default Workout;