import { NextResponse, NextRequest } from 'next/server';
//import sharp from 'sharp';


export const dynamic = 'force-dynamic';



export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl// new URL(decodeURIComponent(req.url))
    const imageUrl = searchParams.get('url');

    console.log("nextUrl", req.nextUrl)
    console.log("imageUrl", imageUrl)

    const quality = Number(searchParams.get('q')) || 50;
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, {
        status: 400
      });
    }
    // Validate URL format
    try {
      new URL(imageUrl);
    } catch (e) {
      console.log(e)
      return NextResponse.json({ error: 'Invalid URL format' }, {
        status: 400
      });
    }
    // Fetch the image with native fetch()
    const imageResponse = await fetch(imageUrl, { cache: "no-store" });
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    // Get the image buffer
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = globalThis.Buffer.from(arrayBuffer);
    // Process with Sharp
    return 5/*
    const processedImage = await sharp(buffer)
      .jpeg({ mozjpeg: true, quality })
      .toBuffer();
    // Return the processed image
    return new NextResponse(processedImage, {
      headers: {
        'Content-Type': 'image/jpeg',
        //'Cache-Control': 'no-store, max-age=0'
      },
    });*/
  }
  catch (e) {
    console.error('Error processing image: ', e);
    return NextResponse.json({ error: 'Failed to process image' }, {
      status: 500
    });
  }
}