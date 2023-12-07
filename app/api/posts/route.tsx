import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request: Request) {
  const {title, content} = await request.json()
  const client = new PrismaClient();

  const post = await client.post.create({data:{
    title,
    content,
    authorId: 1
  }});

  return Response.json({ post })
}