import { prisma } from '../../../lib/prisma';

export async function POST(request) {
  try {
    const { customerInfo, paymentInfo, items, total, paymentMethod, userId } = await request.json();

    if (!customerInfo || !paymentInfo || !items || items.length === 0 || !userId) {
      return Response.json({
        success: false,
        error: 'Missing required information'
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      return Response.json({
        success: false,
        error: 'User not found'
      }, { status: 401 });
    }

    // Create order với thông tin đầy đủ
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount: total,
        discountId: orderData.discountId,
        paymentMethod: paymentMethod,
        status: 'pending',
        customerInfo: JSON.stringify(customerInfo),
        paymentInfo: JSON.stringify(paymentInfo),
        shippingAddress: customerInfo.address + ', ' + customerInfo.city + ', ' + customerInfo.district + ', ' + customerInfo.ward,
        notes: null
      }
    });

    const orderItemsData = items.map(item => ({
      orderId: order.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    await prisma.orderItem.createMany({
      data: orderItemsData
    });

    return Response.json({
      success: true,
      orderId: order.id,
      message: 'Order placed successfully'
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
