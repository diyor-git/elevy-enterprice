import {internshipsAPI} from "@/api/internships";
import {createAsyncThunk, GetThunkAPI} from '@reduxjs/toolkit';


interface GetInternshipsParams {
    lang?: string;
    search?: string;

    [key: string]: any;
}

export const getInternships = createAsyncThunk(
    'internships/getAllInternships',
    async (params: GetInternshipsParams = {}, thunkAPI) => {
        try {
            const response = await internshipsAPI.getAllInternships(params)
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)
export const getCategories = createAsyncThunk(
    'internships/getCategories',
    async (__, thunkAPI) => {
        try {
            const response = await internshipsAPI.getCategories()
            return response.data
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)