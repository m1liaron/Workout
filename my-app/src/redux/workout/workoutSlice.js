import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    workouts: []
}

const workoutsSlice = createSlice({
    name: 'workout',
    initialState,
    reducers: {
        addWorkout(state, action) {
            state.workouts = [...state.workouts, action.payload];
        },
        removeWorkout(state, action) {
            state.workouts = state.workouts.filter(item => item.id !== action.payload);
        }
    }
})

export const { addWorkout, removeWorkout } = workoutsSlice.actions;

export const selectWorkout = (state) => state.workouts.workout;

export const workoutsReducers = workoutsSlice.reducer