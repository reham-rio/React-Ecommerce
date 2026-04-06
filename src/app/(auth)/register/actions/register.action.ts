"use server";
import { registerSchemaType } from "../schema/register.schema";

export async function registerFn(formData: registerSchemaType) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signup`,
    {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    },
  );
  if (!data.ok) throw new Error(data.statusText);

  //   const payload = await data.json();
  //   console.log("payload", payload);
  return data.ok;
}
