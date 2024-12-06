import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await client.user.findUnique({
      where: {
        clerkid: id,
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
        studio: true,
      },
    });

    if (user) return NextResponse.json({ status: 200, user: user });

    const clerkInstance = await clerkClient();
    const clerkUserInstance = await clerkInstance.users.getUser(id);

    const createUser = await client.user.create({
      data: {
        clerkid: clerkUserInstance.id,
        email: clerkUserInstance.emailAddresses[0].emailAddress,
        firstname: clerkUserInstance.firstName,
        lastname: clerkUserInstance.lastName,
        studio: {
          create: {},
        },
        workspace: {
          create: {
            name: `${clerkUserInstance.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
        subscription: {
          create: {},
        },
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (createUser) return NextResponse.json({ status: 201, user: createUser });
    console.log("🛑-> User not created");
    return NextResponse.json({ status: 400 });
  } catch (err) {
    console.log("🛑-> ", err);
    return NextResponse.json({ status: 500 });
  }
}
