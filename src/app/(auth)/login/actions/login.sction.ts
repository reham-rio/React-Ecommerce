"use server";
import { cookies } from "next/headers";
import { loginSchemaType } from "./../schema/login.schema";

export async function loginFn(formData: loginSchemaType) {
  const data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/auth/signin`,
    {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    },
  );
  if (!data.ok) throw new Error(data.statusText);

  const payload = await data.json();
  const cookie = await cookies();
  cookie.set("token", payload?.token, {
    expires: 60 * 60 * 24 *7,
    httpOnly: true,
  });  //client & server
  return data.ok;
}
