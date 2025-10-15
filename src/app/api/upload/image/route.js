import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Không có file được upload' },
        { status: 400 }
      );
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Chỉ cho phép upload file ảnh' },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (max 1MB)
    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Kích thước file quá lớn (tối đa 1MB)' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Tạo tên file unique
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `${timestamp}_${Math.random().toString(36).substring(2)}${extension}`;

    // Tạo thư mục uploads nếu chưa tồn tại
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Lưu file
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Trả về URL của ảnh
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      filename: filename
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi upload ảnh' },
      { status: 500 }
    );
  }
}
