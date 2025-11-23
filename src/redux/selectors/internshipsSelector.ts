import {RootState} from "@/redux/store";

export const getInternshipsSelector = (state: RootState) => {
    return state.internships.internships
}
export const getCategoriesSelector = (state: RootState) => {
    return state.internships.categories
}
export const getInternshipsLoadingSelector = (state: RootState) => {
    return state.internships.loading
}