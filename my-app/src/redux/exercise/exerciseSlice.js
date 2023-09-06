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
        },
        updateImg: (state, action) => {
            const { setId, img } = action.payload;
            const setToUpdate = state.exercise.find((set) => set.setId === setId);
            if (setToUpdate) {
                setToUpdate.img = img;
            }
            localStorage.setItem('exercise', JSON.stringify(state.exercise));
        },
    }
})

export const { addExercise, removeExercise, updateImg } = exerciseSlice.actions;

export const selectExercise = (state) => state.exercise.exercise;

export const exerciseReducers = exerciseSlice.reducer