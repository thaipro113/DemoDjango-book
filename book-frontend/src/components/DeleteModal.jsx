import React from 'react';
import { ShieldAlert, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title" style={{ color: 'var(--danger)' }}>
            <ShieldAlert size={20} />
            Xác Nhận Xóa Sách
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa cuốn sách này không?</p>
          <div 
            style={{ 
              marginTop: '12px', 
              padding: '12px', 
              backgroundColor: 'var(--bg-tertiary)', 
              borderRadius: 'var(--radius-sm)',
              borderLeft: '4px solid var(--danger)'
            }}
          >
            <p style={{ fontWeight: 650, color: 'var(--text-primary)' }}>{book.title}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tác giả: {book.author}</p>
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            * Hành động này không thể hoàn tác.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Đồng Ý Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
