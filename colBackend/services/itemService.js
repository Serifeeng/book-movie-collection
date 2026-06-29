const Item = require('../models/Item');

const getItems = async (userId, options = {}) => {
  const {
    search = '',
    type = 'all',
    category = 'all',
    favorite,
    status = 'all',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 6
  } = options;

  const query = { user: userId };

  // Search filter
  if (search.trim()) {
    query.$or = [
      { title: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
      { category: { $regex: search.trim(), $options: 'i' } }
    ];
  }

  // Type filter
  if (type && type !== 'all') {
    query.type = type;
  }

  // Category filter
  if (category && category !== 'all') {
    query.category = category;
  }

  // Status filter
  if (status && status !== 'all') {
    query.status = status;
  }

  // Favorite filter
  if (favorite === 'true' || favorite === true) {
    query.favorite = true;
  }

  // Pagination config
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 6;
  const skip = (pageNum - 1) * limitNum;

  // Sorting config
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const items = await Item.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const totalItems = await Item.countDocuments(query);
  const totalPages = Math.ceil(totalItems / limitNum);

  // Get all unique categories for filter options
  const allUserItems = await Item.find({ user: userId });
  const categories = ['all', ...new Set(allUserItems.map(item => item.category).filter(Boolean))];

  return {
    items,
    pagination: {
      totalItems,
      totalPages,
      currentPage: pageNum,
      limit: limitNum
    },
    categories
  };
};

const getItemById = async (userId, itemId) => {
  const item = await Item.findOne({ _id: itemId, user: userId });
  if (!item) {
    throw new Error('Öğe bulunamadı.');
  }
  return item;
};

const createItem = async (userId, itemData) => {
  const item = new Item({
    ...itemData,
    user: userId
  });
  return await item.save();
};

const updateItem = async (userId, itemId, updateData) => {
  const item = await Item.findOneAndUpdate(
    { _id: itemId, user: userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!item) {
    throw new Error('Öğe bulunamadı veya güncelleme yetkiniz yok.');
  }
  return item;
};

const deleteItem = async (userId, itemId) => {
  const item = await Item.findOneAndDelete({ _id: itemId, user: userId });
  if (!item) {
    throw new Error('Öğe bulunamadı veya silme yetkiniz yok.');
  }
  return { message: 'Öğe başarıyla silindi.' };
};

const getStats = async (userId) => {
  const total = await Item.countDocuments({ user: userId });
  const books = await Item.countDocuments({ user: userId, type: 'book' });
  const movies = await Item.countDocuments({ user: userId, type: 'movie' });
  const favorites = await Item.countDocuments({ user: userId, favorite: true });
  
  const completed = await Item.countDocuments({ user: userId, status: 'completed' });
  const inProgress = await Item.countDocuments({ user: userId, status: 'in-progress' });
  const planned = await Item.countDocuments({ user: userId, status: 'planned' });

  // Average ratings
  const ratings = await Item.aggregate([
    { $match: { user: userId, rating: { $gt: 0 } } },
    { $group: { _id: null, avgRating: { $avg: '$rating' } } }
  ]);
  const avgRating = ratings.length > 0 ? parseFloat(ratings[0].avgRating.toFixed(1)) : 0;

  return {
    total,
    books,
    movies,
    favorites,
    statusCounts: {
      completed,
      inProgress,
      planned
    },
    avgRating
  };
};

module.exports = {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getStats
};
