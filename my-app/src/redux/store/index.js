import { configureStore } from "@reduxjs/toolkit";
import { workoutsReducers } from "../workout/workoutSlice";
import { exerciseReducers } from "../exercise/exerciseSlice";
import { setsReducers } from "../sets/setsSlice";

export const store = configureStore({
    reducer: {
        workouts: workoutsReducers,
        exercise: exerciseReducers,
        sets: setsReducers
    }
});