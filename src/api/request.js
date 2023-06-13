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
export const FetchingApplicantsInfo = {
    FETCH_INFO: (data) => axiosInstance.get(Endpoints.FETCH_APPLICANTSINFO+data)
}
export const ListofSub = {
    FETCH_SUB: (data) => axiosInstance.get(Endpoints.FETCH_SUBMITTED+data)
}
export const CheckingSubs = {
    CHECK_SUB: (data) => axiosInstance.patch(Endpoints.CHECK_SUBMITTED,data)
}
export const CheckingApplicants = {
    CHECK_APP: (data) => axiosInstance.patch(Endpoints.CHECK_APPLICANTS,data)
}
export const FetchingQualified = {
    FETCH_QUALIFIED: () => axiosInstance.get(Endpoints.FETCH_QUALIFIED)
}
export const CreateAppointment = {
    CREATE_APPOINT: (data) => axiosInstance.post(Endpoints.CREATE_APPOINT,data)
}
export const FetchingAppointList = {
    FETCH_LISTAPPOINT: () => axiosInstance.get(Endpoints.FETCH_APPOINTLIST)
}
export const FetchingSchoProg = {
    FETCH_SCHOPROG: () => axiosInstance.get(Endpoints.FETCH_SCHOPROG)
}
export const CreateSchoProg = {
    CREATE_SCHOPROG: (data) => axiosInstance.post(Endpoints.CREATE_SCHOLAR,data)
}
export const UpdateSchoProg = {
    UPDATE_SCHOPROG: (data) => axiosInstance.patch(Endpoints.UPDATE_SCHOPROG,data)
}
export const Reaapointed = {
    RE_APPOINT: (data) => axiosInstance.patch(Endpoints.RE_APPOINT,data)
}
export const SetApproved = {
    SET_APPROVE: (data) => axiosInstance.patch(Endpoints.SET_APPROVED,data)
}
export const FetchingBmccScho = {
    FETCH_SCHOLARS: () => axiosInstance.get(Endpoints.FETCH_BMCCSCHOLAR)
}
export const CreatingScore = {
    CREATE_SCORECARD: (data) => axiosInstance.post(Endpoints.CREATE_SCORECARD,data)
}
export const FetchingScore = {
    FETCH_SCORECARD: (data) => axiosInstance.get(Endpoints.FETCH_SCORECARD+data)
}
export const ListofReq = {
    FETCH_REQUIREMENTS: () => axiosInstance.get(Endpoints.LIST_REQUIREMENTS)
}
export const Addrequirements = {
    ADD_REQUIREMENTS: (data) => axiosInstance.post(Endpoints.ADD_REQUIREMENTS,data)
}
