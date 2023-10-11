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
export const SetApplicant = {
    SET_APPLICANT: (data) => axiosInstance.patch(Endpoints.SET_APPLICANT,data)
}
export const FetchingBmccScho = {
    FETCH_SCHOLARS: () => axiosInstance.get(Endpoints.FETCH_BMCCSCHOLAR)
}
export const FetchingBmccSchoinfo = {
    FETCH_SCHOLARSINFO: (data) => axiosInstance.get(Endpoints.FETCH_BMCCSCHOLARINFO+data)
}
export const CreatingScore = {
    CREATE_SCORECARD: (data) => axiosInstance.post(Endpoints.CREATE_SCORECARD,data)
}
export const Addusertolistapp = {
    ADD_USEAPP: (data) => axiosInstance.post(Endpoints.ADD_APPLICANTLIST,data)
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
export const AddBMCC = {
    ADD_BMCC: (data) => axiosInstance.post(Endpoints.BMCC_ADD,data)
}
export const FetchingBMCC = {
    FETCH_BMCC: () => axiosInstance.get(Endpoints.BMCC_FETCH)
}
export const Activitylog = {
    ACTIVITY_LOG: () => axiosInstance.get(Endpoints.ACTIVITY_LOG)
}
export const UserScore = {
    USER_SCORE: (data) => axiosInstance.get(Endpoints.FETCH_USERSCORE+data)
}
export const UpdateEmp = {
    UPDATE_EMP: (data) => axiosInstance.patch(Endpoints.UPDATE_EMP,data)
}
export const setRemarks = {
    SET_REMARKS: (data) => axiosInstance.patch(Endpoints.SET_REMARKS,data)
}
export const UpdatePassword = {
    UPDATE_PASS: (data) => axiosInstance.patch(Endpoints.UPDATE_PASS,data)
}
export const UpdateProfile = {
    UPDATE_PROFILE: (data) => axiosInstance.patch(Endpoints.UPDATE_PROFILE,data)
}
export const UpdateScheduleApp = {
    UPDATE_SCHEDULE: (data) => axiosInstance.patch(Endpoints.UPDATE_SCHEDULE,data)
}
export const FailedUser = {
    FAILED_USER: (data) => axiosInstance.post(Endpoints.FAILED_USER,data)
}
export const ScholarStand = {
    UPDATE_SCHOSTAND: (data) => axiosInstance.post(Endpoints.UPDATE_BMCCSCHOLAR,data)
}
export const FetchingAnnounce = {
    FETCH_ANNOUNCE: () => axiosInstance.get(Endpoints.FETCH_ANNOUNCEMENT)
}
export const FetchingReportApp = {
    FETCH_APPLICANTS: () => axiosInstance.get(Endpoints.FETCH_REPORTAPP)
}
export const FetchingReportScho = {
    FETCH_SCHOLARS: () => axiosInstance.get(Endpoints.FETCH_REPORTSCHO)
}
export const FetchingReportUser = {
    FETCH_USERACCS: () => axiosInstance.get(Endpoints.FETCH_REPORTUSER)
}
export const LogoutAdmin = {
    SET_LOGOUT: (data) => axiosInstance.post(Endpoints.SET_OFFLINE,data)
}
export const GrantAccess = {
    GRANT_ACCESS: (data) => axiosInstance.post(Endpoints.GRANT_ACCESS,data)
}
export const GrantAccess1 = {
    GRANT_ACCESS1: (data) => axiosInstance.post(Endpoints.GRANT_ACCESS1,data)
}
export const CreateAnnouncement = {
    CREATE_ANNOUNCEMENT: (data) => axiosInstance.post(Endpoints.CREATE_ANNOUNCEMENT,data)
}
export const UpdatePassSlots = {
    UPDATE_PASSSLOTS: (data) => axiosInstance.post(Endpoints.UPDATE_SCORESLOT,data)
}
export const DecrePassSlots = {
    DECRE_PASSSLOTS: () => axiosInstance.post(Endpoints.DECRE_SCORESLOT)
}
export const FetchPassSlots = {
    FETCH_PASSSLOTS: () => axiosInstance.get(Endpoints.FETCH_SCORESLOT)
}
export const NewDeadline = {
    NEW_DEADLINE: (data) => axiosInstance.post(Endpoints.UPDATE_REQUIREMENTS,data)
}
export const DeleteReq = {
    DELETE_REQ: (data) => axiosInstance.post(Endpoints.DELETE_REQUIREMENTS,data)
}
export const Documentary = {
    FETCH_DOCUMENTARY: () => axiosInstance.get(Endpoints.FETCH_DOCUMENTARY)
}
export const CancelApp = {
    CANCEL_APP: (data) => axiosInstance.patch(Endpoints.CANCEL_APP,data)
}
export const CancelBatch = {
    CANCEL_BATCH: (data) => axiosInstance.patch(Endpoints.CANCEL_BATCH,data)
}
export const FetchingApplist = {
    FETCH_APP: (data) => axiosInstance.post(Endpoints.FETCH_APPLI,data)
}
export const FetchingBatchlist = {
    FETCH_BATCH: (data) => axiosInstance.post(Endpoints.FETCH_BATCH,data)
}
export const FetchingUserAppdetails = {
    FETCH_USERDET: (data) => axiosInstance.get(Endpoints.FETCH_USERINFORMATION+data)
}
export const SetInterview = {
    SET_INTERVIEW: (data) => axiosInstance.post(Endpoints.SET_INTERVIEW,data)
}
export const UserActivity = {
    USER_LOG: (data) => axiosInstance.post(Endpoints.USER_ACTIVITY,data)
}
export const EmpAuthorized = {
    AUTHORIZATION: (data) => axiosInstance.post(Endpoints.EMP_AUTHORIZATION,data)
}
export const ListAccess = {
    ACCESS: () => axiosInstance.get(Endpoints.ACCESS)
}
export const Colors = {
    COLOR: (data) => axiosInstance.patch(Endpoints.COLOR,data)
}
export const Colorlist = {
    FETCH_COLOR: () => axiosInstance.get(Endpoints.FFETCH_COLOR)
}
export const WebsiteImg = {
    WEB_IMG: (data) => axiosInstance.patch(Endpoints.WEBSITE,data)
}
export const WebImg = {
    FETCH_WEB: () => axiosInstance.get(Endpoints.FETCH_WEBSITE)
}
export const Logolist = {
    FETCH_LOGO: () => axiosInstance.get(Endpoints.FETCH_LOGOS)
}
export const Rulelist = {
    FETCH_RULE: () => axiosInstance.get(Endpoints.FETCH_RULE)
}
export const Rule = {
    RULE: (data) => axiosInstance.patch(Endpoints.RULE,data)
}
export const Logos = {
    LOGOS: (data) => axiosInstance.patch(Endpoints.LOGOS,data)
}
export const CreateTrivia = {
    TRIVIA: (data) => axiosInstance.patch(Endpoints.CREATE_TRIVIA,data)
}
export const FetchTrivia = {
    ETCH_TRIVIA: () => axiosInstance.get(Endpoints.FETCH_TRIVIA)
}
export const CreateFaqs = {
    CREATE_FAQS: (data) => axiosInstance.post(Endpoints.CREATE_FAQS,data)
}
export const UpdateFaqs = {
    UPDATE_FAQS: (data) => axiosInstance.patch(Endpoints.UPDATE_FAQS,data)
}
export const FetchFaqs = {
    FETCH_FAQS: () => axiosInstance.get(Endpoints.FETCH_FAQS)
}
export const DeleteFaqs = {
    DELETE_FAQS: (data) => axiosInstance.post(Endpoints.DELETE_FAQS+data)
}
export const WebSection = {
    WEB_SEC: () => axiosInstance.get(Endpoints.WEB_SECTION)
}
export const RevokeUserList = {
    FETCH_REVOKE: () => axiosInstance.get(Endpoints.FETCH_REVOKE)
}
export const EmployeeAccess = {
    EMP_ACCESS: (data) => axiosInstance.post(Endpoints.EMP_ACCESS,data)
}
export const UpdateEmployeeAccess = {
    EMP_UPTDACCESS: (data) => axiosInstance.post(Endpoints.UPDATE_EMPACCESS,data)
}
export const Weblinks = {
    UPDATE_LINKS: (data) => axiosInstance.patch(Endpoints.LINKS,data)
}
export const ApplicationForm = {
    FETCH_FORM: () => axiosInstance.get(Endpoints.APPLICATION_FORM)
}
export const QuestionForm = {
    Q_FORM: (data) => axiosInstance.post(Endpoints.ADD_QUESTIONS,data)
}
export const ChoiceForm = {
    C_FORM: (data) => axiosInstance.post(Endpoints.ADD_CHOICES,data)
}
export const QuestionScore = {
    Q_SCORE: (data) => axiosInstance.patch(Endpoints.SCORE_QUESTIONS,data)
}
export const ChoiceScore = {
    C_SCORE: (data) => axiosInstance.patch(Endpoints.SCORE_CHOICES,data)
}
export const QuestionDelete = {
    DELETE_QFORM: (data) => axiosInstance.delete(Endpoints.DELETE_QUESTION+data)
}
export const ChoiceDelete = {
    DELETE_CFORM: (data) => axiosInstance.delete(Endpoints.DELETE_CHOICES+data)
}
export const EditFormQuestion = {
    EDIT_FORMQ: (data) => axiosInstance.patch(Endpoints.EDIT_QUESTIONS,data)
}
export const USERFRM_ID = {
    FORMUSR: (data) => axiosInstance.get(Endpoints.USERFRM_ID+data)
}
export const BmccRoles = {
    BMCC_ROLE: () => axiosInstance.get(Endpoints.FETCH_ROLE)
}
export const BmccAddroles = {
    ADD_ROLE: (data) => axiosInstance.post(Endpoints.ADD_ROLE,data)
}
export const BmccRemroles = {
    REMOVE_RULE: (data) => axiosInstance.post(Endpoints.REMOVE_ROLE,data)
}
export const ForgotPasswordofEmp = {
    FORGOT_PASS: (data) => axiosInstance.post(Endpoints.FORGOT_ADMIN,data)
}
export const GenerateRenewal = {
    GENERATE_RENEW: (data) => axiosInstance.post(Endpoints.GENERATE_RENEW,data)
}
export const FetchRenewal = {
    FETCH_RENEW: () => axiosInstance.get(Endpoints.FETCH_RENEW)
}
export const FetchRenewalCode = {
    FETCH_RENEWCODE: (data) => axiosInstance.get(Endpoints.FETCH_RENEWCODE+data)
}
export const FetchRenewalDet = {
    FETCH_RENEWINF: (data) => axiosInstance.post(Endpoints.FETCH_RENEWINF,data)
}
export const SetRenewalDetails = {
    SET_RENEWINF: (data) => axiosInstance.post(Endpoints.SET_RENEWINF,data)
}
export const SetSchoRenewDetails = {
    FETCH_SCHORE: (data) => axiosInstance.post(Endpoints.FETCH_RENEWSCHO,data)
}
export const RenewedScho = {
    RENEWED: (data) => axiosInstance.post(Endpoints.RENEWED,data)
}
export const BackupLists = {
    BACKUP: () => axiosInstance.get(Endpoints.BACKUP)
}
export const DownloadBackup = {
    DOWNLOAD: (data) => axiosInstance.get(Endpoints.DOWNLOAD+data)
}
export const BackupNow = {
    BACKUPNOW: () => axiosInstance.get(Endpoints.BACKUPNOW)
}
export const RestoreDb = {
    RESTORE: (data) => axiosInstance.post(Endpoints.RESTORE,data)
}
export const Payrollreports = {
    PAYROLL: () => axiosInstance.get(Endpoints.PAYROLL)
}
export const Userlistsreports = {
    USERLISTED: (data) => axiosInstance.get(Endpoints.REPORTUSER+data)
}
export const AdminNotify = {
    ADMIN_NOTIF: () => axiosInstance.get(Endpoints.ADMIN_NOTIF)
}