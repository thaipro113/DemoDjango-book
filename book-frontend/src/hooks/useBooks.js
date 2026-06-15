import { useState, useEffect, useCallback } from 'react';
import * as bookApi from '../services/bookApi';

export function useBooks({ apiUrl, authToken, showToast }) {
  // --- STATE DATA ---
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalCount, setTotalCount] = useState(0);

  // --- STATE FILTERS ---
  const [filterTitle, setFilterTitle] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ title: '', author: '' });

  // --- STATE MODALS & FORMS ---
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    price: '',
    quantity: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiErrors, setApiErrors] = useState({});

  // --- FETCH DATA ---
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookApi.fetchBooks({
        apiUrl,
        authToken,
        page,
        pageSize,
        title: appliedFilters.title,
        author: appliedFilters.author
      });

      if (data && typeof data === 'object' && 'results' in data) {
        setBooks(data.results);
        setTotalCount(data.count);
      } else if (Array.isArray(data)) {
        setBooks(data);
        setTotalCount(data.length);
      } else {
        setBooks([]);
        setTotalCount(0);
      }
    } catch (err) {
      setError(err.message);
      setBooks([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, authToken, page, pageSize, appliedFilters]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // --- FILTER ACTIONS ---
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setAppliedFilters({ title: filterTitle, author: filterAuthor });
  };

  const handleClearFilter = () => {
    setFilterTitle('');
    setFilterAuthor('');
    setPage(1);
    setAppliedFilters({ title: '', author: '' });
  };

  // --- FORM VALIDATION ---
  const validateForm = () => {
    const errors = {};
    if (!formValues.title.trim()) errors.title = 'Tiêu đề không được bỏ trống';
    if (!formValues.author.trim()) errors.author = 'Tác giả không được bỏ trống';
    
    if (formValues.price === '' || formValues.price === null) {
      errors.price = 'Giá không được bỏ trống';
    } else if (parseFloat(formValues.price) < 0) {
      errors.price = 'Giá không được âm';
    }

    if (formValues.quantity === '' || formValues.quantity === null) {
      errors.quantity = 'Số lượng không được bỏ trống';
    } else if (parseInt(formValues.quantity, 10) < 0) {
      errors.quantity = 'Số lượng không được âm';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormValues({ title: '', author: '', price: '', quantity: '' });
    setFormErrors({});
    setApiErrors({});
  };

  // --- CRUD ACTIONS ---

  // 1. ADD BOOK
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await bookApi.createBook({
        apiUrl,
        authToken,
        title: formValues.title,
        author: formValues.author,
        price: parseFloat(formValues.price),
        quantity: parseInt(formValues.quantity, 10)
      });

      showToast('Thêm sách mới thành công!');
      setIsAddOpen(false);
      resetForm();
      fetchBooks();
    } catch (err) {
      if (err.data) {
        setApiErrors(err.data);
      }
      showToast(err.message || 'Thêm sách thất bại.', 'danger');
    }
  };

  // 2. VIEW DETAIL
  const handleViewDetail = async (id) => {
    try {
      const data = await bookApi.fetchBookDetail({ apiUrl, authToken, id });
      setSelectedBook(data);
      setIsDetailOpen(true);
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  // 3. EDIT BOOK (OPEN FORM)
  const handleOpenEdit = (book) => {
    setSelectedBook(book);
    setFormValues({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      quantity: book.quantity.toString()
    });
    setFormErrors({});
    setApiErrors({});
    setIsEditOpen(true);
  };

  const handleEditBook = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await bookApi.updateBook({
        apiUrl,
        authToken,
        id: selectedBook.id,
        title: formValues.title,
        author: formValues.author,
        price: parseFloat(formValues.price),
        quantity: parseInt(formValues.quantity, 10)
      });

      showToast(`Cập nhật sách "${formValues.title}" thành công!`);
      setIsEditOpen(false);
      resetForm();
      fetchBooks();
    } catch (err) {
      if (err.data) {
        setApiErrors(err.data);
      }
      showToast(err.message || 'Cập nhật sách thất bại.', 'danger');
    }
  };

  // 4. DELETE BOOK (OPEN DIALOG)
  const handleOpenDelete = (book) => {
    setSelectedBook(book);
    setIsDeleteOpen(true);
  };

  const handleDeleteBook = async () => {
    try {
      await bookApi.deleteBook({ apiUrl, authToken, id: selectedBook.id });
      showToast(`Đã xóa sách "${selectedBook.title}" thành công!`);
      setIsDeleteOpen(false);
      fetchBooks();
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  // --- STATS COMPUTATION ---
  const currentTotalQuantity = books.reduce((sum, b) => sum + (b.quantity || 0), 0);
  const currentTotalValue = books.reduce((sum, b) => sum + ((b.price || 0) * (b.quantity || 0)), 0);
  const outOfStockCount = books.filter(b => !b.quantity || b.quantity <= 0).length;

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return {
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
    fetchBooks,
    resetForm,
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
  };
}
