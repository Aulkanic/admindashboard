import { UserInformation } from "../../../../api/request";

export default async function Viewing(applicantNum) {
    try {
      const response = await UserInformation.INFO(applicantNum)
      return response
    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
}
