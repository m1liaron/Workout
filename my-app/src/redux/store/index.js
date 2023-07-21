import { configureStore } from "@reduxjs/toolkit";
import { workoutsReducers } from "../workout/workoutSlice";

export const store = configureStore({
    reducer: {
        workouts: workoutsReducers,
    }
});