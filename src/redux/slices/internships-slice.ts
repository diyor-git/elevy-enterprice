import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {defaultStartups} from '@/data/startup-data';
import {getCategories, getInternships} from "@/redux/thunks/internships";
import type {Startup} from '@/types/startup';
import {internships} from "@/data/internships";

interface StartupsState {
    items: Startup[];
    searchQuery: string;
    selectedCategory: string;
    selectedStage: string;
    internships: any;
    loading: boolean;
    categories: any
}

const initialState: StartupsState = {
    items: defaultStartups,
    searchQuery: '',
    selectedCategory: 'All Categories',
    selectedStage: 'All Stages',
    internships: [],
    categories: [],
    loading: true,
};


const internshipsSlice = createSlice({
    name: 'internships',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload;
        },
        setSelectedStage: (state, action: PayloadAction<string>) => {
            state.selectedStage = action.payload;
        },
        resetFilters: (state) => {
            state.searchQuery = '';
            state.selectedCategory = 'All Categories';
            state.selectedStage = 'All Stages';
        },
        addStartup: (state, action: PayloadAction<Startup>) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInternships.fulfilled, (state: any, action: any) => {
            state.internships = internships;

            state.loading = false
        });
        builder.addCase(getInternships.pending, (state: any, action: any) => {
            state.loading = true
        });
        builder.addCase(getInternships.rejected, (state: any, action: any) => {
            state.loading = false
            state.internships = internships;
        });


        builder.addCase(getCategories.fulfilled, (state: any, action: any) => {
            state.categories = [{"id": 1, "name": "Design"}, {"id": 2, "name": "Business"}, {"id": 3, "name": "SMM"}];

            state.loading = false
        });
        builder.addCase(getCategories.pending, (state: any, action: any) => {
            state.loading = true
        });
        builder.addCase(getCategories.rejected, (state: any, action: any) => {
            state.loading = false
            state.categories = [{"id": 1, "name": "Design"}, {"id": 2, "name": "Business"}, {"id": 3, "name": "SMM"}];
        });
    }
});

export const {
    setSearchQuery,
    setSelectedCategory,
    setSelectedStage,
    resetFilters,
    addStartup,
} = internshipsSlice.actions;

export default internshipsSlice.reducer;
