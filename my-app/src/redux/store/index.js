import { configureStore } from "@reduxjs/toolkit";
import { workoutsReducers } from "../workout/workoutSlice";
import { exerciseReducers } from "../exercise/exerciseSlice";
import { setsReducers } from "../sets/setsSlice";
import { historyReducers } from '../history/historySlice';

export const store = configureStore({
    reducer: {
        workouts: workoutsReducers,
        exercise: exerciseReducers,
        sets: setsReducers,
        history: historyReducers
    }
});