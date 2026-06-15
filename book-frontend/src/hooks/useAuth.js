import { useState, useCallback } from 'react';
import * as bookApi from '../services/bookApi';

export function useAuth({ apiUrl, showToast }) {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('auth_token') || '';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = useCallback(async (loginUsername, loginPassword) => {
    setLoginLoading(true);
    setLoginError('');
    try {
      const data = await bookApi.login({ apiUrl, username: loginUsername, password: loginPassword });
      const token = data.access;
      setAuthToken(token);
      setUsername(loginUsername);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('username', loginUsername);
      showToast('Đăng nhập thành công!');
      return true;
    } catch (err) {
      setLoginError(err.message || 'Đăng nhập thất bại.');
      showToast(err.message || 'Đăng nhập thất bại.', 'danger');
      return false;
    } finally {
      setLoginLoading(false);
    }
  }, [apiUrl, showToast]);

  const handleRegister = useCallback(async (regUsername, regEmail, regPassword) => {
    setLoginLoading(true);
    setLoginError('');
    try {
      await bookApi.register({ apiUrl, username: regUsername, email: regEmail, password: regPassword });
      showToast('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
      return true;
    } catch (err) {
      setLoginError(err.message || 'Đăng ký thất bại.');
      showToast(err.message || 'Đăng ký thất bại.', 'danger');
      return false;
    } finally {
      setLoginLoading(false);
    }
  }, [apiUrl, showToast]);

  const handleLogout = useCallback(() => {
    setAuthToken('');
    setUsername('');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    showToast('Đã đăng xuất thành công.');
  }, [showToast]);

  return {
    authToken,
    username,
    loginLoading,
    loginError,
    setLoginError,
    handleLogin,
    handleRegister,
    handleLogout
  };
}
