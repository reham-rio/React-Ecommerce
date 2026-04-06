import { getProducts } from "@/apis/products.api";
import React from "react";
import ProductItem from "../ProductItem/ProductItem";

export default async function Products() {
  const data = await getProducts();

  return (
        <>
    <h2 className='my-5'>Featured <span className='text-green-500 underline'>Products</span></h2>
    <div className="grid xl:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-5 py-10">
      {data?.map((prod) => (
        <ProductItem key={prod._id} prod={prod}></ProductItem>
      ))}
    </div>
          </>

  );
}
