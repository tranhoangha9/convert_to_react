import { prisma } from '../../../lib/prisma';

/**
 * GET /api/cart?userId=123
 * Lấy giỏ hàng của user từ DB
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 });
    }

    // Lấy giỏ hàng từ DB với Cart và CartItem models
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Format lại data để match với format cũ (localStorage)
    const cartItems = cart?.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: parseFloat(item.product.price),
      image: item.product.image,
      quantity: item.quantity,
      brand: item.product.shortDescription || '',
      description: item.product.description || ''
    })) || [];

    return Response.json({
      success: true,
      cartItems
    });

  } catch (error) {
    console.error('Error fetching cart:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

/**
 * POST /api/cart
 * Lưu giỏ hàng của user vào DB
 * Body: { userId: number, cartItems: Array }
 */
export async function POST(request) {
  try {
    const { userId, cartItems } = await request.json();

    if (!userId) {
      return Response.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 });
    }

    if (!Array.isArray(cartItems)) {
      return Response.json({
        success: false,
        error: 'Cart items must be an array'
      }, { status: 400 });
    }

    // Kiểm tra user có tồn tại không
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return Response.json({
        success: false,
        error: 'User not found'
      }, { status: 404 });
    }

    // Tìm hoặc tạo Cart cho user
    let cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: parseInt(userId)
        }
      });
    }

    // Xóa tất cả CartItem cũ
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    // Tạo CartItem mới
    if (cartItems.length > 0) {
      await prisma.cartItem.createMany({
        data: cartItems.map(item => ({
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity
        }))
      });
    }

    return Response.json({
      success: true,
      message: 'Cart saved successfully'
    });

  } catch (error) {
    console.error('Error saving cart:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

/**
 * DELETE /api/cart?userId=123
 * Xóa toàn bộ giỏ hàng của user
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return Response.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 });
    }

    // Tìm cart của user
    const cart = await prisma.cart.findUnique({
      where: { userId: parseInt(userId) }
    });

    if (cart) {
      // Xóa tất cả CartItem
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
    }

    return Response.json({
      success: true,
      message: 'Cart cleared successfully'
    });

  } catch (error) {
    console.error('Error clearing cart:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
