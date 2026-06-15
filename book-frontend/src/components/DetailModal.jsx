import React from 'react';
import { BookOpen, X } from 'lucide-react';

export default function DetailModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            <BookOpen size={20} className="text-primary" />
            Chi Tiết Cuốn Sách
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            <div className="detail-item">
              <span className="detail-label">Mã số (ID)</span>
              <span className="detail-value">{book.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tiêu đề sách</span>
              <span className="detail-value">{book.title}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tác giả</span>
              <span className="detail-value">{book.author}</span>
            </div>
            <div className="form-grid two-cols">
              <div className="detail-item">
                <span className="detail-label">Giá tiền</span>
                <span className="detail-value">
                  {book.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Số lượng còn lại</span>
                <span className="detail-value">{book.quantity} cuốn</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
