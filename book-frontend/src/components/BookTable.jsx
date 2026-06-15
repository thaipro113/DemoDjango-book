import React from 'react';
import { Eye, Edit, Trash2, ShieldAlert, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookTable({
  loading,
  error,
  books,
  fetchBooks,
  handleViewDetail,
  handleOpenEdit,
  handleOpenDelete,
  pageSize,
  setPageSize,
  page,
  setPage,
  totalCount,
  totalPages
}) {
  if (loading) {
    return (
      <main className="table-container">
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu từ API...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="table-container">
        <div className="empty-state" style={{ color: 'var(--danger)' }}>
          <ShieldAlert size={48} className="empty-icon" style={{ color: 'var(--danger)' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Không thể kết nối đến máy chủ API</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchBooks} style={{ marginTop: '12px' }}>
            Tải lại trang
          </button>
        </div>
      </main>
    );
  }

  if (books.length === 0) {
    return (
      <main className="table-container">
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Danh sách trống</h3>
          <p>Không có cuốn sách nào khớp với bộ lọc tìm kiếm của bạn.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="table-container">
      <div className="table-responsive">
        <table className="book-table">
          <thead>
            <tr>
              <th>Tên Sách</th>
              <th>Tác Giả</th>
              <th>Giá Bán</th>
              <th>Số Lượng</th>
              <th>Trạng Thái</th>
              <th style={{ textAlign: 'right' }}>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const isLowStock = book.quantity > 0 && book.quantity < 5;
              const isOut = !book.quantity || book.quantity <= 0;
              return (
                <tr key={book.id}>
                  <td className="book-title-cell">{book.title}</td>
                  <td>{book.author}</td>
                  <td style={{ fontWeight: 600 }}>
                    {book.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </td>
                  <td>{book.quantity}</td>
                  <td>
                    {isOut ? (
                      <span className="badge badge-danger">Hết hàng</span>
                    ) : isLowStock ? (
                      <span className="badge badge-warning">Sắp hết hàng</span>
                    ) : (
                      <span className="badge badge-success">Còn hàng</span>
                    )}
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button 
                        className="btn-action detail" 
                        onClick={() => handleViewDetail(book.id)}
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        className="btn-action edit" 
                        onClick={() => handleOpenEdit(book)}
                        title="Sửa thông tin"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="btn-action delete" 
                        onClick={() => handleOpenDelete(book)}
                        title="Xóa sách"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="pagination-bar">
        <div className="page-size-selector">
          <span>Hiển thị</span>
          <select 
            value={pageSize} 
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setPage(1);
            }}
          >
            <option value={20}>20 bản ghi</option>
            <option value={100}>100 bản ghi</option>
          </select>
        </div>

        <div className="pagination-info">
          Hiển thị {books.length} trên tổng số {totalCount} cuốn sách
        </div>

        <div className="pagination-controls">
          <button 
            className="pagination-btn" 
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={16} />
            <span>Trước</span>
          </button>
          <span className="page-number">
            Trang {page} / {totalPages}
          </span>
          <button 
            className="pagination-btn" 
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
          >
            <span>Sau</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
