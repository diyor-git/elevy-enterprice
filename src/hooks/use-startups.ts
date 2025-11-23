import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import {
  setSearchQuery,
  setSelectedCategory,
  setSelectedStage,
  resetFilters,
  addStartup,
  selectFilteredStartups,
} from '@/redux/slices/startups-slice';

export const useStartups = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchQuery = useSelector(
    (state: RootState) => state.startups.searchQuery
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.startups.selectedCategory
  );
  const selectedStage = useSelector(
    (state: RootState) => state.startups.selectedStage
  );
  const filteredStartups = useSelector(selectFilteredStartups);

  return {
    searchQuery,
    selectedCategory,
    selectedStage,
    filteredStartups,
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    setSelectedCategory: (category: string) =>
      dispatch(setSelectedCategory(category)),
    setSelectedStage: (stage: string) => dispatch(setSelectedStage(stage)),
    resetFilters: () => dispatch(resetFilters()),
    addStartup: (startup: any) => dispatch(addStartup(startup)),
  };
};
