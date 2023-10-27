const Endpoints = {
    FETCH_APPLICANTS:"personalinfo/applicants",
    FETCH_USER_BY_ID:"userProf/UserAccounts",
    FETCH_ACCOUNTS:"userProf/UserAccounts",
    SET_REMARKS:"userProf/Remarks",
    CREATE_SCHOLAR:"scholar/createScho",
    CREATE_NEWS:"news/create",
    FETCH_NEWS: 'news/newsinfo',
    SEEN_NOTIF: 'news/SeenNotif',
    FETCH_ADMIN:"admin/login",
    LOGIN_USER:"user/login",
    FETCH_APPLICANTSINFO: 'personalinfo/ApplicantFdetails/',
    FETCH_SUBMITTED: 'requirements/',
    CHECK_SUBMITTED: 'requirements/Check',
    CHECK_APPLICANTS: 'requirements/CheckApplicants',
    FETCH_QUALIFIED: 'Appointment/List',
    CREATE_APPOINT: 'Appointment/appoint',
    FETCH_APPOINTLIST: 'Appointment/appointList',
    FETCH_SCHOPROG: 'scholar/schoCat',
    UPDATE_SCHOPROG: 'scholar/UpdateStatus',
    RE_APPOINT: 'Appointment/Reappointed',
    SET_APPROVED: 'Appointment/SetApproved',
    SET_APPLICANT: 'Appointment/SetApplicants',
    ADD_APPLICANTLIST: 'Appointment/Addusertolist',
    UPDATE_SCHEDULE: 'Appointment/UpdateSchedule',
    CANCEL_APP: 'Appointment/CancelApp',
    CANCEL_BATCH: 'Appointment/CancelBatch',
    FETCH_APPLI: 'Appointment/Applist',
    FETCH_BATCH: 'Appointment/Batchlist',
    FAILED_USER: 'Appointment/Failed',
    SET_INTERVIEW: 'Appointment/Interview',
    FETCH_USERINFORMATION: 'Appointment/UserDetails/',
    FETCH_BMCCSCHOLAR: 'BMCCScholar/Scholars',
    UPDATE_BMCCSCHOLAR: 'BMCCScholar/Schostanding',
    FETCH_BMCCSCHOLARINFO: 'BMCCScholar/SchoInfo/',
    CREATE_SCORECARD: 'Scorecard/score',
    FETCH_SCORECARD: 'Scorecard/getScore/',
    FETCH_USERSCORE: 'Scorecard/UserScore/',
    LIST_REQUIREMENTS: 'documents/Requirements',
    ADD_REQUIREMENTS: 'documents/AddRequirements',
    UPDATE_REQUIREMENTS: 'documents/UpdateDeadline',
    DELETE_REQUIREMENTS: 'documents/DeleteReqid',
    FETCH_DOCUMENTARY: 'documents/Documentary',
    BMCC_ADD: 'admin/Create',
    BMCC_FETCH: 'admin/BMCCmembers',
    ACTIVITY_LOG: 'admin/Activitylog',
    UPDATE_EMP: 'admin/Update',
    UPDATE_PASS: 'admin/Updatepassword',
    USER_ACTIVITY: 'admin/Userlog',
    EMP_AUTHORIZATION: 'admin/Authorization',
    ACCESS: 'admin/Access',
    UPDATE_PROFILE: 'admin/Updateprofile',
    FETCH_ANNOUNCEMENT:'announce/Announced',
    FETCH_REPORTAPP:'Reports/Applicants',
    FETCH_REPORTSCHO:'Reports/Scholars',
    FETCH_REPORTUSER:'Reports/UserAccounts',
    PAYROLL:'Reports/Payroll',
    REPORTUSER:'Reports/Userlists?',
    SET_OFFLINE:"admin/Logout",
    FORGOT_ADMIN:"admin/ForgotPassword",
    GRANT_ACCESS:"admin/GrantAccess",
    GRANT_ACCESS1:"admin/GrantAccessApp",
    WEB_SECTION:"admin/WebSection",
    EMP_ACCESS:"admin/EmployeeAccess",
    UPDATE_EMPACCESS:"admin/UpdateAccess",
    WEBSITE:"admin/WebsiteImg",
    FETCH_WEBSITE:"admin/WebImg1",
    FETCH_ROLE:"admin/Roles",
    ADD_ROLE:"admin/AddRoles",
    REMOVE_ROLE:"admin/RemoveRoles",
    CREATE_ANNOUNCEMENT:'announce/createannounced',
    UPDATE_SCORESLOT:'Dynamic/Update',
    FETCH_SCORESLOT:'Dynamic/PassSlot',
    DECRE_SCORESLOT:'Dynamic/DecreSlot',
    COLOR:'Dynamic/Colors',
    FFETCH_COLOR:'Dynamic/Colorslist1',
    FETCH_RULE:'Dynamic/Rulelist',
    FETCH_LOGOS:'Dynamic/Logolist',
    LOGOS:'Dynamic/Logo',
    RULE:'Dynamic/Rule',
    LINKS:'Dynamic/WebLinks',
    CREATE_TRIVIA:'trivia/create',
    FETCH_TRIVIA:'trivia/TriviaoftheDay',
    CREATE_FAQS:'Faqs/Create',
    FETCH_FAQS:'Faqs/Fetch',
    UPDATE_FAQS:'Faqs/Update',
    DELETE_FAQS:'Faqs/Delete/',
    FETCH_REVOKE:'userProf/Revoke',
    APPLICATION_FORM:'ApplicationForm/Form1',
    ADD_QUESTIONS:'ApplicationForm/AddQForm',
    ADD_CHOICES:'ApplicationForm/AddCQuestions',
    SCORE_QUESTIONS:'ApplicationForm/ScoreQuestions',
    SCORE_CHOICES:'ApplicationForm/ScoreChoices',
    DELETE_QUESTION:'ApplicationForm/DeleteQuestion/',
    DELETE_CHOICES:'ApplicationForm/DeleteChoice/',
    EDIT_QUESTIONS:'ApplicationForm/EditQuestions',
    USERFRM_ID:'ApplicationForm/',
    GENERATE_RENEW:'RenewalForm/Generate',
    FETCH_RENEW:'RenewalForm/',
    FETCH_RENEWINF:'RenewalForm/Renewal',
    SET_RENEWINF:'RenewalForm/SetRenewal',
    FETCH_RENEWCODE:'RenewalForm/RenewCode/',
    FETCH_RENEWSCHO:'RenewalForm/Scho',
    RENEWED:'RenewalForm/Renewed',
    DECLINED:'RenewalForm/Declined',
    BACKUP:'admin/Backuplists',
    BACKUPNOW:'admin/Backup',
    RESTORE:'admin/Restore',
    ADMIN_NOTIF:'admin/Notification',
    SCHOLAROLD: 'BMCCScholar/Renew/'
}

export default Endpoints