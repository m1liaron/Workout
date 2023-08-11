import { createSlice } from '@reduxjs/toolkit';

const storedSets = JSON.parse(localStorage.getItem('sets')) || [];

const initialState = {
    sets: storedSets
}

const setsSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {
        addSets(state, action) {
            state.sets = [...state.sets, action.payload];
            localStorage.setItem('sets', JSON.stringify(state.sets));
        },
        removeSet(state, action) {
            const setIdToRemove = action.payload;
            state.sets = state.sets.filter(item => item.setId !== setIdToRemove);
            localStorage.setItem('sets', JSON.stringify(state.sets));
        },
        updateSets: (state, action) => {
            const { setId, checked } = action.payload;
            const setToUpdate = state.sets.find((set) => set.setId === setId);
            if (setToUpdate) {
                setToUpdate.checked = checked;
            }
            localStorage.setItem('sets', JSON.stringify(state.sets));
        },
        updateSetTime(state, action) {
            const { setId, startTime, timer } = action.payload;
            const set = state.sets.find((set) => set.setId === setId);
            if (set) {
                set.startTime = startTime;
                set.timer = timer;
            }
            localStorage.setItem('sets', JSON.stringify(state.sets));
        },
    }
})

export const { addSets, removeSet, updateSets, updateSetTime } = setsSlice.actions;

export const selectSets = (state) => state.sets.sets;

export const setsReducers = setsSlice.reducer