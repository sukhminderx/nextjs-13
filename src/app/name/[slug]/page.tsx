export const dynamicParams = false; // true | false,
export async function generateStaticParams() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );

  return posts
    .filter((p: any) => p.id < 3)
    .map((post: any) => ({
      slug: `${post.id}`,
    }));
}

export default async function Page1({ params }: { params: { slug: string } }) {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.slug
  ).then((res) => res.json());
  console.log("static " + res.title);
  return (
    <div>
      My Post: {params.slug}
      <div>name: {res.title}</div>
    </div>
  );
}
