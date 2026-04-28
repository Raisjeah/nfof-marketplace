import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'nfof_marketplace' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
          }
          resolve(NextResponse.json({ url: result.secure_url }));
        }
      ).end(buffer);
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
