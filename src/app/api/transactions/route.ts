import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Transaction from '@/models/transaction';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find({});
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const transaction = await Transaction.create(data);
  return NextResponse.json(transaction);
}
