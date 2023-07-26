import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, WorkoutExercisePage, WorkoutPage, NotFoundPage } from '../pages';
import NavBar from '../navbar/NavBar';

function App() {
  return (
    <div>
      <div style={{
        textAlign: 'center',
        justifyContent: 'center',
    }}>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/workout' element={<WorkoutPage/>} />
            <Route path='/workout/exercise/:workoutId' element={<WorkoutExercisePage/>} />
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
