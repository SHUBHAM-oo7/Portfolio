// @flow strict
import { personalData } from "@/utils/data/personal-data";

async function getBlog(slug) {
  const res = await fetch(`https://dev.to/api/articles/${personalData.devUsername}/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
};

async function generateStaticParams() {
  // Fetch all blog posts to get the slugs
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const blogs = await res.json();

  // Return the list of paths that should be statically generated
  return blogs.map(blog => ({
    slug: blog.slug
  }));
}

async function BlogDetails({ params }) {
  const slug = params.slug;
  const blog = await getBlog(slug);

  return (
    <div>
      {/* Render your blog details here */}
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
    </div>
  );
}

export default BlogDetails;
export { generateStaticParams };
