import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/common/Navbar';
import ItemCard from '../components/items/ItemCard';
import ItemFormModal from '../components/items/ItemFormModal';
import itemService from '../services/itemService';
import { useToast } from '../components/common/Toast';
import { Heart, PackageOpen } from 'lucide-react';

const Favorites = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { showToast } = useToast();

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await itemService.getItems({ favorite: 'true', limit: 50 });
      setItems(data.items);
    } catch (err) {
      showToast('Favoriler yüklenirken hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await itemService.getStats();
      setStats(data);
    } catch (err) {
      // Silent
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
    fetchStats();
  }, [fetchFavorites, fetchStats]);

  const handleEdit = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  const handleSubmit = async (formData, itemId) => {
    try {
      if (itemId) {
        await itemService.updateItem(itemId, formData);
        showToast('Öğe başarıyla güncellendi!', 'success');
      }
      setModalOpen(false);
      setEditItem(null);
      fetchFavorites();
      fetchStats();
    } catch (err) {
      showToast('Güncelleme başarısız oldu.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await itemService.deleteItem(id);
      showToast('Öğe başarıyla silindi.', 'success');
      fetchFavorites();
      fetchStats();
    } catch (err) {
      showToast('Silme işlemi başarısız oldu.', 'error');
    }
  };

  const handleToggleFavorite = async (id, currentFavorite) => {
    try {
      await itemService.updateItem(id, { favorite: !currentFavorite });
      showToast('Favorilerden çıkarıldı.', 'info');
      fetchFavorites();
      fetchStats();
    } catch (err) {
      showToast('Favori durumu güncellenemedi.', 'error');
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar stats={stats} />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">
              <Heart size={28} className="title-icon fav-color" fill="currentColor" />
              Favorilerim
            </h1>
            <p className="page-subtitle">
              {items.length} favori öğe
            </p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="skeleton-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-card"></div>
              ))}
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <Heart size={48} className="empty-icon" />
            <h3>Henüz favori eklemediniz</h3>
            <p>Koleksiyonunuzdaki öğeleri favorilere ekleyin ve burada görüntüleyin.</p>
          </div>
        ) : (
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
        )}
      </main>

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

export default Favorites;
