"use server";

import { getTokenFun } from "@/utlities/getTokenFun";

export async function updateCart({productId, count}:{productId: string, count: number}) {
  const token = await getTokenFun();

  if (!token) {
    throw new Error("unauthorized!");
  }

  try {
    const data = await fetch(`${process.env.API}cart/${productId}`, {
      method: "put",
      body: JSON.stringify({ count }),
      headers: {
        token,
        "Content-type": "application/json",
      },
    });

    const payload = await data.json();

    return payload;
  } catch (error) {
    throw new Error("unauthorized");
  }
}
