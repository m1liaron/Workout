import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sets: []
}

const setsSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {
        addSets(state, action) {
            state.sets = [...state.sets, action.payload];
        },
        removeSets(state, action) {
            state.sets = state.sets.filter(item => item.id !== action.payload);
        }
    }
})

export const { addSets, removeSets } = setsSlice.actions;

export const selectSets = (state) => state.sets.sets;

export const setsReducers = setsSlice.reducer