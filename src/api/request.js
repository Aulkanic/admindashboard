import axiosInstance from "./axios";
import Endpoints from "./endpoints";

export const ApplicantsRequest = {

    ALL_APPLICANTS: () => axiosInstance.get(Endpoints.FETCH_APPLICANTS)

}

export const UsersRequest = {

    ALL_USERS: () => axiosInstance.get(Endpoints.FETCH_USER_BY_ID)
}

export const ScholarsRequest = {

    ALL_SCHOLARS: () => axiosInstance.get(Endpoints.FETCH_SCHOLARS)
}

export const login = {
    ADMIN_LOGIN: (data) => axiosInstance.post(Endpoints.FETCH_ADMIN,data)
}
export const FetchNews = {
    FETCH_NEWS: () => axiosInstance.get(Endpoints.FETCH_NEWS)
}
export const CreateNews = {
    CREATE_NEWS: (data) => axiosInstance.post(Endpoints.CREATE_NEWS,data)
}
