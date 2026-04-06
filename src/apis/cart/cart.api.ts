import { getTokenFun } from "@/utlities/getTokenFun";
import { CartRes } from "./actions/cart.interface";

export async function getCart(): Promise<CartRes | null> {
  const token = await getTokenFun();

  if (!token) {
    throw new Error("unauthorized!");
  }

  try {
    const data = await fetch(`${process.env.API}cart`, {
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
