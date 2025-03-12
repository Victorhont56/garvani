'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  'Top',
  'Self-contain',
  'Flat',
  'Shop',
  'Office',
  'Event Centre',
  'land',
];

const HeroThree = () => {
  const [activeTab, setActiveTab] = useState('buy');

  return (
    <div className="p-4 font-satoshi">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-text-900">Featured Properties</h2>

        {/* Toggle Button */}
        <div className="flex bg-gray-900 rounded-full">
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-4 py-1 rounded-full text-white transition ${
              activeTab === 'buy' ? 'bg-green-500' : ''
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveTab('rent')}
            className={`px-4 py-1 rounded-full text-white transition ${
              activeTab === 'rent' ? 'bg-green-500' : ''
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Category Carousel */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={3.5}
        spaceBetween={16}
        navigation
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                index === 0
                  ? 'font-bold text-gray-900'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroThree;
