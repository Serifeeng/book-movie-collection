import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const Filters = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  categories = []
}) => {
  return (
    <div className="filters-bar">
      {/* Search */}
      <div className="filter-search">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Başlık, kategori veya açıklama ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search-input"
        />
      </div>

      {/* Filter controls row */}
      <div className="filter-controls">
        <div className="filter-group">
          <SlidersHorizontal size={14} />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} id="type-filter">
            <option value="all">Tüm Türler</option>
            <option value="book">📚 Kitap</option>
            <option value="movie">🎬 Film</option>
          </select>
        </div>

        <div className="filter-group">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} id="status-filter">
            <option value="all">Tüm Durumlar</option>
            <option value="planned">Planlandı</option>
            <option value="in-progress">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>

        {categories.length > 1 && (
          <div className="filter-group">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} id="category-filter">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Tüm Kategoriler' : cat}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="filter-group sort-group">
          <ArrowUpDown size={14} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} id="sort-by">
            <option value="createdAt">Tarihe Göre</option>
            <option value="title">İsme Göre</option>
            <option value="rating">Puana Göre</option>
          </select>
          <button
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            title={sortOrder === 'desc' ? 'Azalan' : 'Artan'}
            id="sort-order-toggle"
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
