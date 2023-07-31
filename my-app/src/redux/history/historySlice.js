import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [
        // {
        // day:"29.07",
        // time:7000400,
        // startTime:"19:00",
        // finishTime:"20:50"
        // }
    ]
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistory(state, action) {
            state.history = [...state.history, action.payload];
        }
    }
})

export const { addHistory } = historySlice.actions;

export const selectHistory= (state) => state.history.history;

export const historyReducers = historySlice.reducer;