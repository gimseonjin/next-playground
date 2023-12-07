import { Post, PrismaClient } from "@prisma/client";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const getPostById = async (id: number) => {
  const client = new PrismaClient();

  const post = await client.post.findFirstOrThrow({
    where: {
      id,
    },
  });

  const matterResult = matter(post.content!);

  const processedContent = remark()
    .use(remarkHtml)
    .processSync(matterResult.content);

  post.content = processedContent.toString();

  return post;
};

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await getPostById(parseInt(id, 10));
  return (
    <div>
      <h1>posts/{post.id}</h1>
      <div>
        <h3>{post.title}</h3>
        <article dangerouslySetInnerHTML={{ __html: post.content! }} />
        <p>{post.date.toDateString()}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;
