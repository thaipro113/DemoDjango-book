import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export default function FilterPanel({
  filterTitle,
  setFilterTitle,
  filterAuthor,
  setFilterAuthor,
  handleFilterSubmit,
  handleClearFilter
}) {
  return (
    <section className="control-panel">
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="input-group">
          <label>Tiêu đề sách</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Tìm theo tiêu đề..." 
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Tác giả</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Tìm theo tác giả..." 
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">
            <Search size={18} />
            <span>Tìm kiếm</span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClearFilter}>
            <RotateCcw size={18} />
            <span>Làm mới</span>
          </button>
        </div>
      </form>
    </section>
  );
}
