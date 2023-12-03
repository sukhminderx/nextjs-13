export default async function Page1({ params }: { params: { slug: string } }) {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.slug
  ).then((res) => res.json());
  console.log("dyaminc " + res.title);
  return (
    <div>
      My Post: {params.slug}
      <div>name: {res.title}</div>
    </div>
  );
}
