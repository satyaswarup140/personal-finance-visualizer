import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Budget from '@/models/budget';

export async function GET() {
  await dbConnect();
  const budgets = await Budget.find({});
  return NextResponse.json(budgets);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const budget = await Budget.create(data);
  return NextResponse.json(budget);
}
