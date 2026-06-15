import React from 'react';
import { Plus, Edit, X } from 'lucide-react';

export default function BookFormModal({
  isOpen,
  onClose,
  onSubmit,
  isEditMode,
  formValues,
  setFormValues,
  formErrors,
  apiErrors
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {isEditMode ? (
              <>
                <Edit size={20} style={{ color: 'var(--warning)' }} />
                Cập Nhật Sách
              </>
            ) : (
              <>
                <Plus size={20} className="text-primary" />
                Thêm Sách Mới
              </>
            )}
          </h3>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="input-group">
                <label>Tiêu đề sách *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formValues.title}
                  onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                  placeholder="Nhập tiêu đề cuốn sách"
                />
                {formErrors.title && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{formErrors.title}</span>}
                {apiErrors.title && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{apiErrors.title.join(', ')}</span>}
              </div>

              <div className="input-group">
                <label>Tác giả *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formValues.author}
                  onChange={(e) => setFormValues({ ...formValues, author: e.target.value })}
                  placeholder="Nhập tên tác giả"
                />
                {formErrors.author && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{formErrors.author}</span>}
                {apiErrors.author && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{apiErrors.author.join(', ')}</span>}
              </div>

              <div className="form-grid two-cols">
                <div className="input-group">
                  <label>Giá bán (VND) *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-control" 
                    value={formValues.price}
                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                    placeholder="Giá bán"
                  />
                  {formErrors.price && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{formErrors.price}</span>}
                  {apiErrors.price && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{apiErrors.price.join(', ')}</span>}
                </div>

                <div className="input-group">
                  <label>Số lượng *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={formValues.quantity}
                    onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })}
                    placeholder="Số lượng nhập kho"
                  />
                  {formErrors.quantity && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{formErrors.quantity}</span>}
                  {apiErrors.quantity && <span style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{apiErrors.quantity.join(', ')}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy bỏ
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              style={isEditMode ? { backgroundColor: 'var(--warning)' } : {}}
            >
              {isEditMode ? 'Lưu Thay Đổi' : 'Thêm Sách'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
