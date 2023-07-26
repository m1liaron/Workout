import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    exercise: [],
}

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        addExercise(state, action) {
            state.exercise = [...state.exercise, action.payload];
        },
        removeExercise(state, action) {
            state.exercise = state.exercise.filter(item => item.id !== action.payload);
            state.sets = state.sets.filter(item => item.id !== action.payload);
        }
    }
})

export const { addExercise, removeExercise } = exerciseSlice.actions;

export const selectExercise = (state) => state.exercise.exercise;

export const exerciseReducers = exerciseSlice.reducer