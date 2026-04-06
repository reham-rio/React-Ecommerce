import { getSingleProduct } from "@/apis/singleproduct.api";
import ButtonCom from "@/app/_components/ButtonCom";
import MySlider from "@/app/_components/Slider/Slider";
import { Button } from "@/components/ui/button";
// import { productInterface } from "@/interfaces/products.interface";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  console.log(id);

  // async function getproduct(): Promise<productInterface> {
  //   try {
  //     const data = await fetch(
  //       `https://ecommerce.routemisr.com/api/v1/productDataucts/${id}`,
  //     );
  //     if (!data.ok) throw new Error("some error");
  //     const payload = await data.json();
  //     return payload?.data;
  //   } catch (error) {
  //     throw new Error("some error");
  //   }
  // }

  const productData = await getSingleProduct(id);

  return (
    <div className="flex items-center">
      <div className="md:w-1/3 w-full p-4">
        <Image
          width={200}
          height={200}
          src={productData.imageCover}
          className="w-2/3"
          alt=""
        />
        <div className="flex gap-3">
          {/* {productData.images.map((img) => (
            <Image
              src={img}
              alt="pic"
              key={img}
              width={50}
              height={50}
              className="cursor-pointer"
            />
          ))} */}
          <MySlider pageList={productData.images} slidesPerView={2}/>
        </div>
      </div>
      <div className="md:w-2/3 w-full p-4">
        <h5 className="text-gray-500 font-light my-2">
          {productData.category.name}
        </h5>
        <h2 className="line-clamp-2">{productData.title}</h2>
        <p>{productData.description}</p>

        <p className="flex gap-2 items-center">
          <StarIcon className="text-yellow-400"></StarIcon>
          {productData.ratingsAverage}
        </p>

        <div className="flex justify-between items-center">
          <>
            {productData.priceAfterDiscount ? (
              <div className="flex gap-3 my-2">
                <p className="text-green-500">
                  {productData.priceAfterDiscount}EGP
                </p>
                <p className="text-gray-500 text-sm line-through">
                  {productData.price}EGP
                </p>
              </div>
            ) : (
              <p className="my-2">{productData.price}EGP</p>
            )}
          </>
        </div>
        <div className="flex w-full gap-5 my-5">
          <ButtonCom id={id} cls="cursor-pointer text-white w-full d-block bg-green-600" >Add To Cart</ButtonCom>
          <Button className="bg-black">Buy It Now</Button>
        </div>
      </div>
    </div>
  );
}