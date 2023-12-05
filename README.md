This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

##

So
by default Server side component fetch api call occurs in build
you will see console logged in terminal in build process, not while npm start

to make it occur in server
cache no store
you will see console logged in terminal in start process every time the component shows in browser ie loads in server, not while npm build

to see log on browser console. use client components

similar for invalidate

now for dynamic route
[slug]/page.tsx

export default async function Page1({ params }: { params: { slug: string } }) {
const res = await fetch(
"https://jsonplaceholder.typicode.com/posts/" + params.slug
).then((res) => res.json());
return (

<div>
My Post: {params.slug}
<div>name: {res.title}</div>
</div>
);
}

this will be rendered on server and api will be called on run time not build time.
logged on terminal

now if we use generateStaticParams with dynamic routes
like
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

in this case, only first 2 ids will be build during build, rest will be server called as dynamic

so for 1st 2 , logs in build
otherwise in start

dynamicParams
Control what happens when a dynamic segment is visited that was not generated with generateStaticParams.

layout.tsx | page.tsx or in slug page.tsx

export const dynamicParams = true // true | false,
true (default): Dynamic segments not included in generateStaticParams are generated on demand.
false: Dynamic segments not included in generateStaticParams will return a 404.

## now, aprt from 2, others will return 404

#

The below gives an error
Failed to parse internal url because nodejs dont have idea of base url
export default async function Page2() {
const res = await fetch("http://localhost:3000/api/names", {
method: "GET",
}).then((response) => response.json());

so instead of doing this, just use server functions and directly call DB etc

import Image from "next/image";
import styles from "./page.module.css";
export default async function Home() {
async function myAction() {
"use server";
console.log("Success");
}
return (

<main className={styles.main}>
<div className={styles.description}>
<p>Get started by editing&nbsp;</p>
</div>
<form action={myAction}>
<button type="submit">Add to Cart</button>
</form>
</main>
);
}
This sends an API call to same URL and performs actions at server

#

Route handler - build time or server time request

First of all, everything api call made in useEffect of any component is server side.

The question is only about the direct fetch (earlier getServerSideProps).

--

THe following GET api gets called at build time only, not on request time
export async function GET() {
console.log("print /api/names"); //printed only during build
return Response.json({ data: "success" });
}

Now, if we add dynamic functions like cookie, auth headers, or other ways mentioned previously
import { cookies } from "next/headers";

export async function GET() {
const cookieStore = cookies();
const theme = cookieStore.get("theme");
console.log("print /api/names"); // called on every req, not on build
return Response.json({ data: "success" });
}

Other methods such as POST eg:
export async function POST() {
console.log("print post /api/class");
return Response.json({ data: "success" });
}

always called dynamically,, not on build
