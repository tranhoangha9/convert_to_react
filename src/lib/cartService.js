/**
 * Cart Service - Quản lý giỏ hàng (localStorage hoặc DB)
 * - Chưa đăng nhập: lưu vào localStorage
 * - Đã đăng nhập: lưu vào DB qua API
 */

const CART_STORAGE_KEY = 'cartItems';

/**
 * Lấy thông tin user từ localStorage (hoặc cookie)
 * @returns {Object|null} User object hoặc null nếu chưa đăng nhập
 */
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Lấy giỏ hàng từ localStorage
 * @returns {Array} Mảng các item trong giỏ hàng
 */
const getLocalCart = () => {
  if (typeof window === 'undefined') return [];
  
  const cartStr = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartStr) return [];
  
  try {
    return JSON.parse(cartStr);
  } catch (error) {
    console.error('Error parsing cart data:', error);
    return [];
  }
};

/**
 * Lưu giỏ hàng vào localStorage
 * @param {Array} cartItems - Mảng các item trong giỏ hàng
 */
const saveLocalCart = (cartItems) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

  const event = new Event('storage');
  event.key = CART_STORAGE_KEY;
  window.dispatchEvent(event);
};

const clearLocalCart = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
  
  const event = new Event('storage');
  event.key = CART_STORAGE_KEY;
  window.dispatchEvent(event);
};

/**
 * @param {number} userId - ID của user
 * @returns {Promise<Array>}
 */
const getDbCart = async (userId) => {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    const data = await response.json();
    
    if (data.success) {
      return data.cartItems || [];
    }
    
    console.error('Error fetching cart from DB:', data.error);
    return [];
  } catch (error) {
    console.error('Error fetching cart from DB:', error);
    return [];
  }
};

/**
 * Lưu giỏ hàng vào DB (cho user đã đăng nhập)
 * @param {number} userId - ID của user
 * @param {Array} cartItems - Mảng các item trong giỏ hàng
 * @returns {Promise<boolean>} true nếu thành công
 */
const saveDbCart = async (userId, cartItems) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, cartItems }),
    });
    
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error saving cart to DB:', error);
    return false;
  }
};

/**
 * @returns {Promise<Array>} 
 */
export const getCart = async () => {
  const user = getCurrentUser();
  
  if (!user || !user.id) {
    console.log('User not logged in, returning empty cart');
    return [];
  }
  return await getDbCart(user.id);
};

/**

 * @param {Object} product - Sản phẩm cần thêm
 * @param {number} quantity - Số lượng (mặc định 1)
 * @returns {Promise<boolean>} true nếu thành công
 */
export const addToCart = async (product, quantity = 1) => {
  try {
    console.log('addToCart called with:', { product, quantity });
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      quantity: quantity
    };

    const user = getCurrentUser();
    console.log('Current user:', user);
    
    if (!user || !user.id) {
      console.error('User not logged in');
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
      return false;
    }
    const currentCart = await getDbCart(user.id);
    console.log('Current cart from DB:', currentCart);
    
    const existingItem = currentCart.find(item => String(item.id) === String(product.id));
    
    let updatedCart;
    if (existingItem) {
      updatedCart = currentCart.map(item =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...currentCart, cartItem];
    }
    
    console.log('Updated cart:', updatedCart);
    const success = await saveDbCart(user.id, updatedCart);
    console.log('Save result:', success);
    
    return success;
  } catch (error) {
    console.error('Error in addToCart:', error);
    return false;
  }
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng (LUÔN dùng DB)
 * @param {number} productId - ID sản phẩm
 * @param {number} quantity - Số lượng mới
 * @returns {Promise<boolean>} true nếu thành công
 */
export const updateCartItemQuantity = async (productId, quantity) => {
  const user = getCurrentUser();
  
  if (!user || !user.id) {
    console.error('User not logged in');
    return false;
  }

  // Luôn cập nhật DB
  const currentCart = await getDbCart(user.id);
  const updatedCart = currentCart.map(item =>
    String(item.id) === String(productId)
      ? { ...item, quantity: Math.max(1, quantity) }
      : item
  );
  
  return await saveDbCart(user.id, updatedCart);
};

/**
 * Xóa sản phẩm khỏi giỏ hàng (LUÔN dùng DB)
 * @param {number} productId - ID sản phẩm cần xóa
 * @returns {Promise<boolean>} true nếu thành công
 */
export const removeFromCart = async (productId) => {
  const user = getCurrentUser();
  
  if (!user || !user.id) {
    console.error('User not logged in');
    return false;
  }

  // Luôn xóa khỏi DB
  const currentCart = await getDbCart(user.id);
  const updatedCart = currentCart.filter(item => String(item.id) !== String(productId));
  
  return await saveDbCart(user.id, updatedCart);
};

/**
 * Xóa toàn bộ giỏ hàng
 * @returns {Promise<boolean>} true nếu thành công
 */
export const clearCart = async () => {
  const user = getCurrentUser();
  
  if (user && user.id) {
    // Đã đăng nhập: xóa DB
    return await saveDbCart(user.id, []);
  } else {
    // Chưa đăng nhập: xóa localStorage
    clearLocalCart();
    return true;
  }
};

/**
 * Merge giỏ hàng từ localStorage vào DB khi user đăng nhập
 * Gọi hàm này ngay sau khi đăng nhập thành công
 * @param {number} userId - ID của user vừa đăng nhập
 * @returns {Promise<boolean>} true nếu thành công
 */
export const mergeLocalCartToDb = async (userId) => {
  try {
    // Lấy giỏ hàng từ localStorage
    const localCart = getLocalCart();
    
    if (localCart.length === 0) {
      return true; // Không có gì để merge
    }
    
    // Lấy giỏ hàng hiện tại từ DB
    const dbCart = await getDbCart(userId);
    
    // Merge: ưu tiên cộng dồn số lượng nếu sản phẩm đã tồn tại
    const mergedCart = [...dbCart];
    
    localCart.forEach(localItem => {
      const existingItem = mergedCart.find(item => item.id === localItem.id);
      
      if (existingItem) {
        // Sản phẩm đã có trong DB: cộng dồn số lượng
        existingItem.quantity += localItem.quantity;
      } else {
        // Sản phẩm mới: thêm vào
        mergedCart.push(localItem);
      }
    });
    
    // Lưu giỏ hàng đã merge vào DB
    const success = await saveDbCart(userId, mergedCart);
    
    if (success) {
      // Xóa giỏ hàng khỏi localStorage sau khi merge thành công
      clearLocalCart();
      console.log('Cart merged successfully from localStorage to DB');
    }
    
    return success;
  } catch (error) {
    console.error('Error merging cart:', error);
    return false;
  }
};
