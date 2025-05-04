import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/lib/store/store';

interface LoaderState {
    loading: boolean;
}

const initialState: LoaderState = {
    loading: false,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
    },
});

export const { startLoading, stopLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
export const loadingState = (state:RootState) => state.loader.loading;
