import {AxiosResponse} from "axios";
import $instance from "@/api/index";


export const internshipsAPI = {
    getAllInternships(params?: Record<string, any>): Promise<AxiosResponse<any>> {
        return $instance.get<any>(`internships`,  { params }).then((response) => {
            return response
        })
    },
    getCategories(): Promise<AxiosResponse<any>> {
        return $instance.get<any>(`internships/categories`).then((response) => {
            return response
        })
    },
}

