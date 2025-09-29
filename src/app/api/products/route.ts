
import { NextResponse } from 'next/server';
import { productsPromise } from '@/lib/server-data';

export async function GET() {
  try {
    const products = await productsPromise;
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products for API:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
