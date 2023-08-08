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
        updateSetTime(state, action) {
      const { setId, startTime, timer } = action.payload;
      const set = state.sets.find((set) => set.setId === setId);
      if (set) {
        set.startTime = startTime;
        set.timer = timer;
      }
    },
    }
})

export const { addSets, removeSet, updateSets, updateSetTime } = setsSlice.actions;

export const selectSets = (state) => state.sets.sets;

export const setsReducers = setsSlice.reducer