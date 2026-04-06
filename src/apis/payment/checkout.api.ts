'use server'
import { getTokenFun } from "@/utlities/getTokenFun";

interface shippingAddressInterface {
  details: string;
  phone: string;
  city: string;
}

export async function onlinePayment(
  cartId: string,
  shippingAddress: shippingAddressInterface,
) {
  const token = await getTokenFun();

  if (!token) {
    throw new Error("unauthorized!");
  }

  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "post",
      body: JSON.stringify({ shippingAddress }),
      headers: {
        token,
        "Content-type": "application/json",
      },
    },
  );
  if (!data.ok) throw new Error("unauthorized!");
  const res = await data.json();
  return res;
}
