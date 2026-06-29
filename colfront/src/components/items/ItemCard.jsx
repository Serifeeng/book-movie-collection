import React from 'react';
import { Heart, Trash2, Edit3, BookOpen, Film, Star, Clock, CheckCircle, CalendarDays } from 'lucide-react';

const statusLabels = {
  'planned': 'Planlandı',
  'in-progress': 'Devam Ediyor',
  'completed': 'Tamamlandı'
};

const statusIcons = {
  'planned': <Clock size={13} />,
  'in-progress': <CalendarDays size={13} />,
  'completed': <CheckCircle size={13} />
};

const ItemCard = ({ item, onEdit, onDelete, onToggleFavorite }) => {
  const formattedDate = new Date(item.createdAt).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={`item-card ${item.favorite ? 'is-favorite' : ''}`}>
      {/* Type badge */}
      <div className={`card-type-badge badge-${item.type}`}>
        {item.type === 'book' ? <BookOpen size={14} /> : <Film size={14} />}
        <span>{item.type === 'book' ? 'Kitap' : 'Film'}</span>
      </div>

      {/* Favorite toggle */}
      <button
        className={`card-fav-btn ${item.favorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(item._id, item.favorite)}
        title={item.favorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      >
        <Heart size={18} fill={item.favorite ? 'currentColor' : 'none'} />
      </button>

      {/* Content */}
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>

        {item.category && item.category !== 'General' && (
          <span className="card-category">{item.category}</span>
        )}

        {item.description && (
          <p className="card-desc">{item.description}</p>
        )}

        {/* Rating */}
        <div className="card-rating">
          <Star size={14} fill={item.rating > 0 ? '#f59e0b' : 'none'} stroke="#f59e0b" />
          <span>{item.rating > 0 ? item.rating.toFixed(1) : '—'}</span>
          <span className="rating-max">/ 10</span>
        </div>

        {/* Status */}
        <div className={`card-status status-${item.status}`}>
          {statusIcons[item.status]}
          <span>{statusLabels[item.status] || item.status}</span>
        </div>

        {item.progress && (
          <div className="card-progress">
            <span className="progress-label">İlerleme:</span>
            <span>{item.progress}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer">
        <span className="card-date">{formattedDate}</span>
        <div className="card-actions">
          <button className="card-action-btn edit-btn" onClick={() => onEdit(item)} title="Düzenle">
            <Edit3 size={15} />
          </button>
          <button className="card-action-btn delete-btn" onClick={() => onDelete(item._id)} title="Sil">
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
