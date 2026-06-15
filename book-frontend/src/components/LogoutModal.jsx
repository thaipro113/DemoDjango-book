import React from 'react';
import { LogOut, X } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title" style={{ color: 'var(--warning)' }}>
            <LogOut size={20} />
            Xác Nhận Đăng Xuất
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này không?</p>
          <p style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Bạn sẽ cần phải đăng nhập lại để tiếp tục quản lý danh sách sách.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Không
          </button>
          <button className="btn btn-danger" onClick={onConfirm} style={{ backgroundColor: 'var(--danger)' }}>
            Có, Đăng Xuất
          </button>
        </div>
      </div>
    </div>
  );
}
