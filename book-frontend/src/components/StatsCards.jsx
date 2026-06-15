import React from 'react';
import { BookOpen, Package, Coins, ShieldAlert } from 'lucide-react';

export default function StatsCards({ totalCount, currentTotalQuantity, currentTotalValue, outOfStockCount }) {
  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Tổng loại sách</span>
          <span className="stat-value">{totalCount}</span>
        </div>
        <div className="stat-icon-wrapper primary">
          <BookOpen size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Tổng cuốn (trang này)</span>
          <span className="stat-value">{currentTotalQuantity}</span>
        </div>
        <div className="stat-icon-wrapper success">
          <Package size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Giá trị (trang này)</span>
          <span className="stat-value">
            {currentTotalValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </span>
        </div>
        <div className="stat-icon-wrapper warning">
          <Coins size={24} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-info">
          <span className="stat-label">Hết hàng (trang này)</span>
          <span className="stat-value">{outOfStockCount}</span>
        </div>
        <div className="stat-icon-wrapper danger">
          <ShieldAlert size={24} />
        </div>
      </div>
    </section>
  );
}
