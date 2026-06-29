import React, { useState, useEffect } from 'react';
import { X, Plus, Save } from 'lucide-react';

const ItemFormModal = ({ isOpen, onClose, onSubmit, editItem }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'book',
    category: '',
    description: '',
    rating: 0,
    status: 'planned',
    progress: '',
    favorite: false
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title || '',
        type: editItem.type || 'book',
        category: editItem.category || '',
        description: editItem.description || '',
        rating: editItem.rating || 0,
        status: editItem.status || 'planned',
        progress: editItem.progress || '',
        favorite: editItem.favorite || false
      });
    } else {
      setFormData({
        title: '',
        type: 'book',
        category: '',
        description: '',
        rating: 0,
        status: 'planned',
        progress: '',
        favorite: false
      });
    }
  }, [editItem, isOpen]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: inputType === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      rating: parseFloat(formData.rating) || 0
    };
    onSubmit(submissionData, editItem?._id);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editItem ? 'Öğeyi Düzenle' : 'Yeni Öğe Ekle'}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="item-title">Başlık *</label>
            <input
              id="item-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Kitap veya film adı..."
              required
            />
          </div>

          {/* Type and Category side-by-side */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="item-type">Tür *</label>
              <select id="item-type" name="type" value={formData.type} onChange={handleChange}>
                <option value="book">📚 Kitap</option>
                <option value="movie">🎬 Film</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="item-category">Kategori</label>
              <input
                id="item-category"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Örn: Bilim Kurgu, Dram..."
              />
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="item-description">Açıklama</label>
            <textarea
              id="item-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Kısa bir açıklama veya yorum ekleyin..."
              rows="3"
            />
          </div>

          {/* Rating, Status, Progress row */}
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="item-rating">Puan (0-10)</label>
              <input
                id="item-rating"
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="item-status">Durum</label>
              <select id="item-status" name="status" value={formData.status} onChange={handleChange}>
                <option value="planned">Planlandı</option>
                <option value="in-progress">Devam Ediyor</option>
                <option value="completed">Tamamlandı</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="item-progress">İlerleme</label>
              <input
                id="item-progress"
                type="text"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                placeholder="Sayfa 120 / Bölüm 3"
              />
            </div>
          </div>

          {/* Favorite checkbox */}
          <div className="form-group form-checkbox">
            <label htmlFor="item-favorite">
              <input
                id="item-favorite"
                type="checkbox"
                name="favorite"
                checked={formData.favorite}
                onChange={handleChange}
              />
              <span className="checkbox-label">❤️ Favorilere ekle</span>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="form-submit-btn">
            {editItem ? <Save size={18} /> : <Plus size={18} />}
            <span>{editItem ? 'Güncelle' : 'Ekle'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemFormModal;
