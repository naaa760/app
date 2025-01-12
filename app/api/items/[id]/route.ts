import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const item = await prisma.item.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!item) {
      return new NextResponse("Item not found", { status: 404 });
    }

    if (item.createdBy !== parseInt(session.user.id)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.item.delete({
      where: { id: parseInt(params.id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
