import { createSlice } from '@reduxjs/toolkit';

const storedExercise = JSON.parse(localStorage.getItem('exercise')) || [];

const initialState = {
    exercise: storedExercise
}

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        addExercise(state, action) {
            state.exercise = [...state.exercise, action.payload];
            localStorage.setItem('exercise', JSON.stringify(state.exercise));
        },
        removeExercise(state, action) {
            state.exercise = state.exercise.filter(item => item.id !== action.payload);
            localStorage.setItem('exercise', JSON.stringify(state.exercise));
        }
    }
})

export const { addExercise, removeExercise } = exerciseSlice.actions;

export const selectExercise = (state) => state.exercise.exercise;

export const exerciseReducers = exerciseSlice.reducer