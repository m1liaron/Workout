import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, WorkoutExercisePage, WorkoutPage, StatisticPage, NotFoundPage } from '../pages';
import NavBar from '../navbar/NavBar';
import { useState } from 'react';

function App() {
  const [showBar, setShowBar] = useState(true);

  return (
    <div>
      <div style={{
        textAlign: 'center',
        justifyContent: 'center',
    }}>
        <Router>
          <Routes>
            <Route path='/' element={<WorkoutPage/>} />
            <Route path='/workout/exercise/:workoutId' element={<WorkoutExercisePage setShowBar={setShowBar} />} />
            <Route path='/statistic' element={<StatisticPage/>} />
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
          {showBar && <NavBar />}
        </Router>
      </div>
    </div>
  );
}

export default App;
