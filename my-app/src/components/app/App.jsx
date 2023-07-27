import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, WorkoutExercisePage, WorkoutPage, StatisticPage, NotFoundPage } from '../pages';
import NavBar from '../navbar/NavBar';

function App() {
  return (
    <div>
      <div style={{
        textAlign: 'center',
        justifyContent: 'center',
    }}>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/workout' element={<WorkoutPage/>} />
            <Route path='/workout/exercise/:workoutId' element={<WorkoutExercisePage/>} />
            <Route path='/statistic' element={<StatisticPage/>} />
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
          <NavBar/>
        </Router>
      </div>
    </div>
  );
}

export default App;
