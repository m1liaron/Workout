import WorkoutList from "../../workoutList/WorkoutList";

const penDiv = {
    position: 'fixed',
    bottom: '-4px',
    right: '10px'
}

const pen = {
  backgroundColor: '#31B0D5',
  color: 'white',
  padding: '20px',
  borderRadius: '100%',
  borderColor: '#46b8da',
  cursor: 'pointer'
}

const WorkoutPage = () => {
    return (
        <>
            <h1>Workout</h1>
            <WorkoutList />
            <div style={penDiv}>
                <i style={pen} class="fa-solid fa-pen fa-2xl"></i>
            </div>
        </>
    )
}

export default WorkoutPage;