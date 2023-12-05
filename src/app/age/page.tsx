"use client";

import React from "react";

export default async function Page2() {
  const callAPI = async () => {
    const res = await fetch("/api/names").then((response) => response.json());
    console.log("static " + res);
  };
  const callPost = async () => {
    const res = await fetch("/api/class", {
      method: "POST",
    }).then((response) => response.json());
    console.log("post " + res);
  };
  React.useEffect(() => {
    callAPI();
    callPost();
  }, []);
  return (
    <div>
      <div>name: </div>
    </div>
  );
}
