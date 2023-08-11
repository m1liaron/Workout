import { createSlice } from '@reduxjs/toolkit';

const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || [];

const initialState = {
    workouts: storedWorkouts,
}

const workoutsSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        addWorkout(state, action) {
            state.workouts = [...state.workouts, action.payload];
            localStorage.setItem('workouts', JSON.stringify(state.workouts));
        },
        removeWorkout(state, action) {
            state.workouts = state.workouts.filter(item => item.id !== action.payload);
            localStorage.setItem('workouts', JSON.stringify(state.workouts));
        }
    }
})

export const { addWorkout, removeWorkout, updateWorkoutName } = workoutsSlice.actions;

export const selectWorkout = (state) => state.workouts.workouts;

export const workoutsReducers = workoutsSlice.reducer