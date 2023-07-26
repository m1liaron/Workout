import { configureStore } from "@reduxjs/toolkit";
import { workoutsReducers } from "../workout/workoutSlice";
import { exerciseReducers } from "../exercise/exerciseSlice";

export const store = configureStore({
    reducer: {
        workouts: workoutsReducers,
        exercise: exerciseReducers
    }
});