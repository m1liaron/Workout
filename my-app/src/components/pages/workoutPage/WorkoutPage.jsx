import { Link } from "react-router-dom";

const pen = {
  color: '#0f67ff',
  position: 'fixed',
  bottom: '20px',
  right: '0px',
  padding: '2rem',
  backgroundColor: "white",
  borderRadius: '100px'
}

const WorkoutPage = () => {
    return (
        <div>
            {/* <Link to='/workout/exercise'>Exersice</Link> */}
            <i style={pen} class="fa-solid fa-pen fa-2xl"></i>
        </div>
    )
}

export default WorkoutPage;