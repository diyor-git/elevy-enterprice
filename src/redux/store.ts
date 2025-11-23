import {configureStore} from '@reduxjs/toolkit';
import startupsReducer from '@/redux/slices/startups-slice';
import internshipsReducer from '@/redux/slices/internships-slice';

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        startups: startupsReducer,
        internships: internshipsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
