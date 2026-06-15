import { useState, useEffect } from 'react';
import ToastContainer from './components/ToastContainer';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import FilterPanel from './components/FilterPanel';
import BookTable from './components/BookTable';
import DetailModal from './components/DetailModal';
import BookFormModal from './components/BookFormModal';
import DeleteModal from './components/DeleteModal';
import SettingsPanel from './components/SettingsPanel';
import LoginScreen from './components/LoginScreen';
import LogoutModal from './components/LogoutModal';
import { useTheme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import { useBooks } from './hooks/useBooks';
import { useAuth } from './hooks/useAuth';
import './App.css';

function App() {
  // --- STATE CONFIG ---
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem('api_url') || 'http://localhost:8000/api/book';
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // --- PERSIST CONFIG ---
  useEffect(() => {
    localStorage.setItem('api_url', apiUrl);
  }, [apiUrl]);

  // --- CUSTOM HOOKS ---
  const [isDarkMode, setIsDarkMode] = useTheme();
  const { toasts, showToast } = useToast();

  const {
    authToken,
    username,
    loginLoading,
    loginError,
    setLoginError,
    handleLogin,
    handleRegister,
    handleLogout
  } = useAuth({ apiUrl, showToast });

  const {
    books,
    loading,
    error,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalCount,
    filterTitle,
    setFilterTitle,
    filterAuthor,
    setFilterAuthor,
    selectedBook,
    isDetailOpen,
    setIsDetailOpen,
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    formValues,
    setFormValues,
    formErrors,
    apiErrors,
    resetForm,
    fetchBooks,
    handleFilterSubmit,
    handleClearFilter,
    handleAddBook,
    handleViewDetail,
    handleOpenEdit,
    handleEditBook,
    handleOpenDelete,
    handleDeleteBook,
    currentTotalQuantity,
    currentTotalValue,
    outOfStockCount,
    totalPages
  } = useBooks({ apiUrl, authToken, showToast });

  // Nếu chưa đăng nhập (không có authToken), chuyển hướng tới LoginScreen
  if (!authToken) {
    return (
      <LoginScreen
        loginLoading={loginLoading}
        loginError={loginError}
        setLoginError={setLoginError}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        toasts={toasts}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        onAddClick={() => { resetForm(); setIsAddOpen(true); }}
        username={username || 'Tài khoản'}
        onLogout={() => setIsLogoutOpen(true)}
      />

      {/* Settings Panel */}
      <SettingsPanel
        showSettings={showSettings}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        authToken={authToken}
        setAuthToken={() => {}} // Không cho phép chỉnh sửa token trực tiếp ở settings khi đang đăng nhập
      />

      {/* Dashboard Stats */}
      <StatsCards
        totalCount={totalCount}
        currentTotalQuantity={currentTotalQuantity}
        currentTotalValue={currentTotalValue}
        outOfStockCount={outOfStockCount}
      />

      {/* Control Panel (Filter / Page Size) */}
      <FilterPanel
        filterTitle={filterTitle}
        setFilterTitle={setFilterTitle}
        filterAuthor={filterAuthor}
        setFilterAuthor={setFilterAuthor}
        handleFilterSubmit={handleFilterSubmit}
        handleClearFilter={handleClearFilter}
      />

      {/* Main List Table & Pagination */}
      <BookTable
        loading={loading}
        error={error}
        books={books}
        fetchBooks={fetchBooks}
        handleViewDetail={handleViewDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
        pageSize={pageSize}
        setPageSize={setPageSize}
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        totalPages={totalPages}
      />

      {/* --- MODAL: DETAIL --- */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        book={selectedBook}
      />

      {/* --- MODALS: ADD / EDIT BOOK --- */}
      <BookFormModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddBook}
        isEditMode={false}
        formValues={formValues}
        setFormValues={setFormValues}
        formErrors={formErrors}
        apiErrors={apiErrors}
      />

      <BookFormModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditBook}
        isEditMode={true}
        formValues={formValues}
        setFormValues={setFormValues}
        formErrors={formErrors}
        apiErrors={apiErrors}
      />

      {/* --- MODAL: DELETE CONFIRM --- */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteBook}
        book={selectedBook}
      />

      {/* --- MODAL: LOGOUT CONFIRM --- */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          handleLogout();
        }}
      />
    </div>
  );
}

export default App;
