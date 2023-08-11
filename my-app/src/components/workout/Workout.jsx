import { LINK } from './Workout.styled';

const Workout = ({ name, id }) => {
    return (
        <div style={{display: 'flex'}}>
            <LINK to={`/workout/exercise/${id}`} style={{textDecoration: 'none'}}>
                <p>{name}</p>
            </LINK>
        </div>
    )
}

export default Workout;