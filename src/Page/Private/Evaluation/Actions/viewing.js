import { FetchingApplicantsInfo,ListofSub,USERFRM_ID } from "../../../../api/request";

export default async function Viewing(applicantNum) {
    const formData = new FormData();
    formData.append('applicantNum',applicantNum)
    try {
      const response = await Promise.all([
        FetchingApplicantsInfo.FETCH_INFO(applicantNum),
        ListofSub.FETCH_SUB(applicantNum),
        USERFRM_ID.FORMUSR(applicantNum)
      ]);

      return response
    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
}
