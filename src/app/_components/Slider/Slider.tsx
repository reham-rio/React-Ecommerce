"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function MySlider({
  slidesPerView,
  pageList,
}: {
  slidesPerView: number;
  pageList: string[];
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={5}
      slidesPerView={slidesPerView}
      loop
      navigation
      pagination={{
        clickable: true,
        renderBullet(index, className) {
          return `<span class='${className} bg-white! w-5! h-5! rounded-3xl!'></span> `;
        },
        bulletActiveClass: "bg-white! opacity-100! w-10! rounded-3xl!",
      }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {pageList.map((img) => (
        <SwiperSlide key={img}>
          <Image
            src={img}
            alt="pic"
            height={200}
            width={200}
            className="w-full h-70 object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
