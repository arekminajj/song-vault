import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createReview } from "@/repositories/review.repository";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const review = await createReview({
      ...body,
      userId: session.user.id,
    });
    
    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}