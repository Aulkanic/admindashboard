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

