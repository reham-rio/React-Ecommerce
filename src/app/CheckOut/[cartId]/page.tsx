import CheckOut from "../CheckOut";

export default async function page({params}:{params:Promise<{cartId:string}>}) {

  const {cartId} = (await (params)).cartId
  console.log('cartId', cartId);
  

  return (
    <div>
      <CheckOut cartId={cartId}></CheckOut>
    </div>
  );
}
