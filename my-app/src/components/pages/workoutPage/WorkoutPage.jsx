import WorkoutList from "../../workoutList/WorkoutList";
// import { useState } from "react";

// const penDiv = {
//     position: 'fixed',
//     bottom: '20px',
//     right: '5px'
// }

// const addWorkout = {
//     position: 'fixed',
//     bottom: '150px',
// }

// const pen = {
//     backgroundColor: 'rgb(75, 104, 197)',
//     color: 'white',
//     padding: '20px',
//     borderRadius: '20px',
//     cursor: 'pointer',
//     border: 'none'
// }

const WorkoutPage = () => {
    // const [visible, setVisible] = useState(false);

    return (
        <div style={{padding: '20px'}}>
            <h1>Workout</h1>
            <WorkoutList />
            {/* <div style={addWorkout}>
                <div style={penDiv}>
                    <button onClick={() => setVisible(!visible)} style={pen}>+ Новий</button>
                </div>
            {visible ? 
                <div>
                    <input style={{background: 'rgb(75, 104, 197)', color: '#ffff'}} className="form-control" type="text" />
                </div> : false
            }
            </div> */}
        </div>
    )
}

export default WorkoutPage;