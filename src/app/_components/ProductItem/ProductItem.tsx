import { productInterface } from "@/interfaces/products.interface";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButtonCom from "../ButtonCom";

interface pageProps {
  prod: productInterface;
}

export default function ProductItem({ prod }: pageProps) {
  return (
    <div className="p-4 rounded-[8px] border border-border-color">
      <Link href={`/productdetails/${prod._id}`}>
        <Image
          width={100}
          height={100}
          src={prod.imageCover}
          alt={prod.title}
          className="w-1/2 mx-auto block"
        />
      </Link>

      <h5 className="text-gray-500 font-light my-2">{prod.category.name}</h5>
      <p className="line-clamp-2">{prod.title}</p>

      <p className="flex gap-2 items-center">
        <StarIcon className="text-yellow-400"></StarIcon>
        {prod.ratingsAverage}
      </p>

      <div className="flex justify-between items-center">
        <>
          {prod.priceAfterDiscount ? (
            <div className="flex gap-3 my-2">
              <p className="text-green-500">{prod.priceAfterDiscount}EGP</p>
              <p className="text-gray-500 text-sm line-through">
                {prod.price}EGP
              </p>
            </div>
          ) : (
            <p className="my-2">{prod.price}EGP</p>
          )}
        </>
        <ButtonCom cls="rounded-circle cursor-pointe text-white bg-green-600" id={prod._id}>+</ButtonCom>
      </div>
    </div>
  );
}
