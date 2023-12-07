import { Post, PrismaClient } from "@prisma/client";
import Link from "next/link";
import CreatePost from "./[id]/CreatePost";

const getPost = async () => {
  const client = new PrismaClient();

  return await client.post.findMany({
    orderBy: {
      date: "desc",
    },
  });
};

const PostPage = async () => {
  const posts = await getPost();

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
      <CreatePost />
    </div>
  );
};

export default PostPage;

const PostItem = ({ post }: { post: Post }) => {
  const { id, title, date } = post;
  return (
    <Link href={`/posts/${id}`}>
      <div>
        <h3>{title}</h3>
        <p>{date.toISOString()}</p>
      </div>
    </Link>
  );
};
