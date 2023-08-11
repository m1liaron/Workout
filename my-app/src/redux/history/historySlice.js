import { createSlice } from '@reduxjs/toolkit';

const storedHistory = JSON.parse(localStorage.getItem('history')) || [];

const initialState = {
    history: storedHistory
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistory(state, action) {
            state.history = [...state.history, action.payload];
            localStorage.setItem('history', JSON.stringify(state.history));
        }
    }
})

export const { addHistory } = historySlice.actions;

export const selectHistory= (state) => state.history.history;

export const historyReducers = historySlice.reducer;