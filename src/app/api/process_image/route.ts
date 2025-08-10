import { NextResponse } from 'next/server';
import sharp from 'sharp';



export const dynamic = 'force-dynamic'; // Disable all caching


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    const quality = searchParams.get('q') || 50;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch (e) {
      console.log(e)
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the image with native fetch()
    const imageResponse = await fetch(imageUrl, {
      cache: 'no-store' // Disable caching for this fetch
    });

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    // Get the image buffer
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Process with Sharp
    const processedImage = await sharp(buffer)
      .jpeg({ mozjpeg: true, quality })
      .toBuffer();

    // Return the processed image
    return new NextResponse(processedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        //'Cache-Control': 'no-store, max-age=0'
      },
    });

  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}