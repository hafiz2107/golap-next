import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //Wire up AI agent
  try {
    const body = await req.json();
    const { id } = await params;
    const content = body.content;
    const transcribed = await client.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        title: content.title,
        description: content.summery,
        summery: body.transcript,
      },
    });

    if (transcribed) {
      console.log("Transcibed");
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500 });
  }
}
