import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    statistic: []
}

const statisticSlice = createSlice({
    name: 'statistic',
    initialState,
    reducers: {
        addStatistic(state, action) {
            state.statistic = [...state.statistic, action.payload];
        },
        removeStatistic(state, action) {
            const setIdToRemove = action.payload;
            state.statistic = state.statistic.filter(item => item.id !== setIdToRemove);
        }
    }
})

export const { addStatistic, removeStatistic } = statisticSlice.actions;

export const selectStatic= (state) => state.statistic.statistic;

export const staticReducers = statisticSlice.reducer;