"use client";
import Image from "next/image";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination , Navigation , Mousewheel, Keyboard } from 'swiper/modules';




const HomeSlider = () => {
  return (
<div className="HomeSlider px-2 py-2">

  <Swiper
  slidesPerView={2.5}
  spaceBetween={15}
  pagination={{
    clickable: true,
   
  }}
  autoplay={{
    delay: 2000, 
    disableOnInteraction: true, 
  }}
   cssMode={true}
        navigation={true}
        mousewheel={true}
        keyboard={true}
  modules={[Autoplay, Pagination ,Navigation, Mousewheel, Keyboard ]}
  className="mySwiper"
>
        <SwiperSlide>
          <div className="item">
            <Image src={"/slide8.jpg"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>
        

        <SwiperSlide>
          <div className="item">
            <Image src={"/slide2.webp"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>

        
        <SwiperSlide>
          <div className="item">
            <Image src={"/slide3.webp"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>
         <SwiperSlide>
          <div className="item">
            <Image src={"/slide4.webp"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>
         <SwiperSlide>
          <div className="item">
            <Image src={"/slide5.webp"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>
         <SwiperSlide>
          <div className="item">
            <Image src={"/slide6.webp"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>
         <SwiperSlide>
          <div className="item">
            <Image src={"/slide7.webp"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>

          <SwiperSlide>
          <div className="item">
            <Image src={"/slide1.jpg"} alt="alid" width={3157} height={1540} />
          </div>
        </SwiperSlide>
        
      </Swiper>
</div>
  );
};

export default HomeSlider;





