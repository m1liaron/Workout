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
            const setIdToRemove = action.payload;
            state.sets = state.sets.filter(item => item.id !== setIdToRemove);
          }
    }
})

export const { addSets, removeSets } = setsSlice.actions;

export const selectSets = (state) => state.sets.sets;

export const setsReducers = setsSlice.reducer