import Image from "next/image";
import styles from "./page.module.css";
export default async function Home() {
  async function myAction() {
    "use server";
    console.log("Success");
  }
  await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => console.log(json.title));

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
