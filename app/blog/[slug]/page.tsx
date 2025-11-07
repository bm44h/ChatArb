// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/app/lib/blog';
import { notFound } from 'next/navigation';
import markdownToHtml from '@/app/lib/markdownToHtml';

export async function generateStaticParams() {
  const posts = getAllPosts(['slug']);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// فقط عرف النوع يدوياً
type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'content', 'imageUrl']);

  if (!post) return notFound();

  const content = await markdownToHtml(post.content || '');

  return (
    <div className="bg-white py-12 lg:py-20" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500">{post.date}</p>
          </header>

          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}
