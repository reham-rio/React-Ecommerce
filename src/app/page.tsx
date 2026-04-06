import Products from "./_components/Products/Products";
import MySlider from "./_components/Slider/Slider";
import slider1 from "../assests/home-slider-1.d79601a8.png";
import slider2 from "../assests/1678301723274-cover.jpeg";
import slider3 from "../assests/home-slider-1.d79601a8.png";
import { lazy, Suspense } from "react";
import Loading from "./_components/Loading/Loading";
import { getServerSession } from "next-auth";

const Categories = lazy(() => import("./_components/Categories/Categories"));

export default async function Home() {

  const data = await getServerSession()
  return (
    <div>
      <h1 className="capitalize">{data?.user?.name}</h1>
      <MySlider
        slidesPerView={1}
        pageList={[slider1.src, slider2.src, slider3.src]}
      />
      <Suspense fallback={<Loading></Loading>}>
        <Categories />
      </Suspense>
      <Products />
    </div>
  );
}
