"use server";

import { getTokenFun } from "@/utlities/getTokenFun";

export async function deleteItemCart(productId: string) {
  const token = await getTokenFun();

  if (!token) {
    throw new Error("unauthorized!");
  }

  try {
    const data = await fetch(`${process.env.API}cart/${productId}`, {
      method: "delete",
      body: JSON.stringify({ productId }),
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
