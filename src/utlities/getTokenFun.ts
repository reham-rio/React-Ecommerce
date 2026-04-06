import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getTokenFun():Promise<string> {

  const cookie = await cookies();

  const nextAuthToken = cookie.get("next-auth.session-token")?.value;
  
  const decodeCookie = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: nextAuthToken,
  });

  console.log(decodeCookie);

  return decodeCookie?.token as string
}
