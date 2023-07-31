import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WorkoutExercisePage, WorkoutPage, StatisticPage, HistoryPage, DetailPage, NotFoundPage, } from '../pages';
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
            <Route path='/statistic' element={<StatisticPage setShowBar={setShowBar}/>} />
            <Route path='/history' element={<HistoryPage setShowBar={setShowBar}/>} />
            <Route path='/history/detail/:id' element={<DetailPage setShowBar={setShowBar}/>} />
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
          {showBar && <NavBar />}
        </Router>
      </div>
    </div>
  );
}

export default App;
