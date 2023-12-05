import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  console.log("print /api/names");
  return Response.json({ data: "success" });
}
