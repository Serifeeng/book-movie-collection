import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/common/Navbar';
import Filters from '../components/items/Filters';
import ItemCard from '../components/items/ItemCard';
import ItemFormModal from '../components/items/ItemFormModal';
import itemService from '../services/itemService';
import { useToast } from '../components/common/Toast';
import { Plus, ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';

const Home = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1, currentPage: 1, limit: 6 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { showToast } = useToast();

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await itemService.getItems({
        search,
        type: typeFilter,
        category: categoryFilter,
        status: statusFilter,
        sortBy,
        sortOrder,
        page,
        limit: 6
      });
      setItems(data.items);
      setPagination(data.pagination);
      setCategories(data.categories || []);
    } catch (err) {
      showToast('Veriler yüklenirken hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, categoryFilter, statusFilter, sortBy, sortOrder, page]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await itemService.getStats();
      setStats(data);
    } catch (err) {
      // Silent fail for stats
    }
  }, []);

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, [fetchItems, fetchStats]);

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, categoryFilter, statusFilter, sortBy, sortOrder]);

  const handleSubmit = async (formData, itemId) => {
    try {
      if (itemId) {
        await itemService.updateItem(itemId, formData);
        showToast('Öğe başarıyla güncellendi!', 'success');
      } else {
        await itemService.createItem(formData);
        showToast('Yeni öğe başarıyla eklendi!', 'success');
      }
      setModalOpen(false);
      setEditItem(null);
      fetchItems();
      fetchStats();
    } catch (err) {
      const msg = err.response?.data?.message || 'İşlem sırasında hata oluştu.';
      showToast(msg, 'error');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await itemService.deleteItem(id);
      showToast('Öğe başarıyla silindi.', 'success');
      fetchItems();
      fetchStats();
    } catch (err) {
      showToast('Silme işlemi başarısız oldu.', 'error');
    }
  };

  const handleToggleFavorite = async (id, currentFavorite) => {
    try {
      await itemService.updateItem(id, { favorite: !currentFavorite });
      showToast(
        !currentFavorite ? 'Favorilere eklendi! ❤️' : 'Favorilerden çıkarıldı.',
        'info'
      );
      fetchItems();
      fetchStats();
    } catch (err) {
      showToast('Favori durumu güncellenemedi.', 'error');
    }
  };

  const openAddModal = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  return (
    <div className="dashboard-page">
      <Navbar stats={stats} />

      <main className="dashboard-main">
        {/* Page header with add button */}
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Koleksiyonum</h1>
            <p className="page-subtitle">
              {stats ? `${stats.total} öğe · Ortalama puan: ${stats.avgRating}` : 'Yükleniyor...'}
            </p>
          </div>
          <button className="add-item-btn" onClick={openAddModal} id="add-item-btn">
            <Plus size={20} />
            <span>Yeni Ekle</span>
          </button>
        </div>

        {/* Filters */}
        <Filters
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categories={categories}
        />

        {/* Item Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="skeleton-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <PackageOpen size={48} className="empty-icon" />
            <h3>Koleksiyonunuz boş</h3>
            <p>Kitap veya film ekleyerek koleksiyonunuzu oluşturmaya başlayın.</p>
            <button className="add-item-btn" onClick={openAddModal}>
              <Plus size={18} />
              <span>İlk Öğeyi Ekle</span>
            </button>
          </div>
        ) : (
          <>
            <div className="items-grid">
              {items.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  id="prev-page-btn"
                >
                  <ChevronLeft size={18} />
                  <span>Önceki</span>
                </button>

                <div className="page-numbers">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      className={`page-num ${num === page ? 'active' : ''}`}
                      onClick={() => setPage(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  className="page-btn"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  id="next-page-btn"
                >
                  <span>Sonraki</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Add/Edit Modal */}
      <ItemFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        onSubmit={handleSubmit}
        editItem={editItem}
      />
    </div>
  );
};

export default Home;
