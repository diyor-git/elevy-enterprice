import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Startup } from '@/types/startup';
import { defaultStartups } from '@/data/startup-data';

interface StartupsState {
  items: Startup[];
  searchQuery: string;
  selectedCategory: string;
  selectedStage: string;
}

const initialState: StartupsState = {
  items: defaultStartups,
  searchQuery: '',
  selectedCategory: 'All Categories',
  selectedStage: 'All Stages',
};

const startupsSlice = createSlice({
  name: 'startups',
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
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSelectedStage,
  resetFilters,
  addStartup,
} = startupsSlice.actions;

// Selector for filtered startups
export const selectFilteredStartups = (state: { startups: StartupsState }) => {
  const { items, searchQuery, selectedCategory, selectedStage } = state.startups;

  return items.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Categories' || startup.category === selectedCategory;

    const matchesStage =
      selectedStage === 'All Stages' || startup.stage === selectedStage;

    return matchesSearch && matchesCategory && matchesStage;
  });
};

export default startupsSlice.reducer;
