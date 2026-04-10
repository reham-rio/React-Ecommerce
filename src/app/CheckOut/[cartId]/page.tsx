import CheckOut from "../CheckOut";

export default async function page({
  params,
}: {
  params: { cartId: string };
}) {
  const { cartId } = params;

  return (
    <div>
      <CheckOut cartId={cartId}></CheckOut>
    </div>
  );
}
