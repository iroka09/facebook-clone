import { NextResponse, NextRequest } from 'next/server';
import sharp from 'sharp';


export const dynamic = 'force-dynamic';



async function getImage(imageUrl:string, quality:number) {
  const imageResponse = await fetch(imageUrl, { cache: "no-store" });
  if (!imageResponse.ok) {
    throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
  }
  // Get the image buffer
  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = globalThis.Buffer.from(arrayBuffer);
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
}


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const imageUrl = searchParams.get('url');
    const quality = Number(searchParams.get('q'));
    if (!imageUrl) throw Error('Image URL is required')
    // Validate URL format
    new URL(imageUrl);
    // Fetch the image with native fetch()
    return await getImage(imageUrl, quality || 40)
  }
  catch (e) {
    console.error('Error processing ORIGINAL image: ', e);
    try {
      const fallbackPhotoUrl = "https://www.mountainmotorvehicles.co.uk/wp-content/uploads/2024/05/No-image-available-2.jpg"
      return await getImage(fallbackPhotoUrl, 100)
    }
    catch (e) {
      console.error('Error processing fallback image: ', e);
      return NextResponse.json({ error: 'Failed to process image' }, {
        status: 500
      });
    }
  }
}