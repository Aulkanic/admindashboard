import { setAdmin, setAuthenticated } from '../../../../Redux/loginSlice';
import { showToast } from '../../../../components/Toast/toast';
import { login } from '../../../../api/request';
import { RouteUrl } from '../../../../Routes/routes';

const HandleSubmit = async (email, password, setLoadingCallback,dispatch,navigate) => {

  try {
    if (!email || !password) {
      showToast('Please provide email and password first', 'error');
      return;
    }

    setLoadingCallback(true);
    const res = await login.ADMIN_LOGIN({ email, password });

    if (res.data.success === 1) {
      const inf = [res.data.userDetails, res.data.sectionId];
      localStorage.setItem('AdminisOnline', true);
      dispatch(setAuthenticated(true));
      dispatch(setAdmin(inf));
      showToast('Login Success', 'success');
      console.log(RouteUrl.DASHBOARD)
      navigate(RouteUrl.DASHBOARD);
    } else {
      showToast(`${res.data.message}`, 'error');
      navigate(RouteUrl.LOGIN);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    showToast('An error occurred while processing your request', 'error');
  } finally {
    setLoadingCallback(false);
  }
};

export default HandleSubmit;
