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
        removeSet(state, action) {
            const setIdToRemove = action.payload;
            state.sets = state.sets.filter(item => item.setId !== setIdToRemove);
        },
        updateSets: (state, action) => {
            const { setId, checked } = action.payload;
            const setToUpdate = state.sets.find((set) => set.setId === setId);
            if (setToUpdate) {
                setToUpdate.checked = checked;
            }
        },
    }
})

export const { addSets, removeSet, updateSets } = setsSlice.actions;

export const selectSets = (state) => state.sets.sets;

export const setsReducers = setsSlice.reducer