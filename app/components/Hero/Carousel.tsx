'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const properties = [
  {
    id: 1,
    title: 'Rent and Sales of Homes',
    image: '/images/image-one.png', // ✅ Fixed path
    count: '750+',
    category: 'Listed Properties',
  },
  {
    id: 2,
    title: 'Store & Commercial building',
    image: '/images/image-two.png', // ✅ Fixed path
    count: '120+',
    category: 'Commercial building',
  },
  {
    id: 3,
    title: 'Luxury Apartments',
    image: '/images/image-six.jpeg', // ✅ Fixed path
    count: '200+',
    category: 'Apartments',
  },
  {
    id: 4,
    title: 'Beachfront Villas',
    image: '/images/image-seven.jpeg', // ✅ Fixed path
    count: '50+',
    category: 'Villas',
  },
  {
    id: 5,
    title: 'Office Spaces',
    image: '/images/image-five.jpg', // ✅ Fixed path + file extension
    count: '300+',
    category: 'Office Spaces',
  },
  {
    id: 6,
    title: 'Land & Lots',
    image: '/images/image-four.jpg', // ✅ Fixed path
    count: '100+',
    category: 'Land & Lots',
  },
];

const Carousel = () => {
  return (
    <div className="px-4 py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3.5 },
        }}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id}>
            <div className="bg-[#F9FAFB] rounded-2xl font-satoshi overflow-hidden border border-text shadow-[0px_18px_28px_#F9FAFB]">
              <div className="relative h-[250px]">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                <p className="text-sm text-gray-600">{property.category}</p>
                <div className="mt-3 flex  flex-row items-center justify-center mb-10 justify-between">
                  <span className="text-xl font-bold text-gray-900">{property.count}</span>
                  <button className="bg-primary flex gap-2 text-text font-bold px-4 py-2 rounded-full shadow-md hover:bg-hover transition ">
                   <span>Check</span>
                   <span><MdKeyboardDoubleArrowRight size={24} /></span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
