'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

type Property = {
  id: number;
  title: string;
  image: string;
  location: string;
  type: string;
  size: string;
  price: string;
  category: string;
  listingType: 'buy' | 'rent';
};

const properties: Property[] = [
  {
    id: 1,
    title: '4 bedroom Bungalow',
    image: '/images/image-one.png',
    location: '123 Adeola Odeku Street, Victoria Island, Lagos, Nigeria.',
    type: 'Bungalow',
    size: '178 sqm',
    price: '₦50,000/month',
    category: 'Self-contain',
    listingType: 'rent',
  },
  {
    id: 2,
    title: 'Luxury Apartment',
    image: '/images/image-two.png',
    location: '456 Banana Island, Ikoyi, Lagos, Nigeria.',
    type: 'Apartment',
    size: '200 sqm',
    price: '₦120,000/month',
    category: 'Flat',
    listingType: 'buy',
  },
  {
    id: 3,
    title: 'Office Space',
    image: '/images/image-three.png',
    location: 'Lekki Phase 1, Lagos, Nigeria.',
    type: 'Office',
    size: '300 sqm',
    price: '₦300,000/month',
    category: 'Office',
    listingType: 'rent',
  },
  {
    id: 4,
    title: 'Event Centre',
    image: '/images/image-four.jpg',
    location: 'Eko Atlantic, Lagos, Nigeria.',
    type: 'Event Centre',
    size: '500 sqm',
    price: '₦500,000/day',
    category: 'Event Centre',
    listingType: 'buy',
  },
  {
    id: 5,
    title: 'Luxury Shop',
    image: '/images/image-five.png',
    location: 'VI, Lagos, Nigeria.',
    type: 'Shop',
    size: '150 sqm',
    price: '₦80,000/month',
    category: 'Shop',
    listingType: 'rent',
  },
  {
    id: 6,
    title: 'Penthouse',
    image: '/images/image-six.jpeg',
    location: 'Ikoyi, Lagos, Nigeria.',
    type: 'Penthouse',
    size: '400 sqm',
    price: '₦1,000,000/month',
    category: 'Flat',
    listingType: 'buy',
  },
  {
    id: 7,
    title: 'Event Centre',
    image: '/images/image-four.jpg',
    location: 'Eko Atlantic, Lagos, Nigeria.',
    type: 'Event Centre',
    size: '500 sqm',
    price: '₦500,000/day',
    category: 'Event Centre',
    listingType: 'buy',
  },
  {
    id: 8,
    title: 'Luxury Shop',
    image: '/images/image-five.png',
    location: 'VI, Lagos, Nigeria.',
    type: 'Shop',
    size: '150 sqm',
    price: '₦80,000/month',
    category: 'Shop',
    listingType: 'rent',
  },
  {
    id: 9,
    title: 'Penthouse',
    image: '/images/image-six.jpeg',
    location: 'Ikoyi, Lagos, Nigeria.',
    type: 'Penthouse',
    size: '400 sqm',
    price: '₦1,000,000/month',
    category: 'Flat',
    listingType: 'buy',
  },
  {
    id: 10,
    title: 'Event Centre',
    image: '/images/image-four.jpg',
    location: 'Eko Atlantic, Lagos, Nigeria.',
    type: 'Event Centre',
    size: '500 sqm',
    price: '₦500,000/day',
    category: 'Event Centre',
    listingType: 'buy',
  },
  {
    id: 11,
    title: 'Luxury Shop',
    image: '/images/image-five.png',
    location: 'VI, Lagos, Nigeria.',
    type: 'Shop',
    size: '150 sqm',
    price: '₦80,000/month',
    category: 'Shop',
    listingType: 'rent',
  },
  {
    id: 12,
    title: 'Penthouse',
    image: '/images/image-six.jpeg',
    location: 'Ikoyi, Lagos, Nigeria.',
    type: 'Penthouse',
    size: '400 sqm',
    price: '₦1,000,000/month',
    category: 'Flat',
    listingType: 'buy',
  },
  {
    id: 13,
    title: 'Event Centre',
    image: '/images/image-four.jpg',
    location: 'Eko Atlantic, Lagos, Nigeria.',
    type: 'Event Centre',
    size: '500 sqm',
    price: '₦500,000/day',
    category: 'Event Centre',
    listingType: 'buy',
  },
  {
    id: 14,
    title: 'Luxury Shop',
    image: '/images/image-five.png',
    location: 'VI, Lagos, Nigeria.',
    type: 'Shop',
    size: '150 sqm',
    price: '₦80,000/month',
    category: 'Shop',
    listingType: 'rent',
  },
  {
    id: 15,
    title: 'Penthouse',
    image: '/images/image-six.jpeg',
    location: 'Ikoyi, Lagos, Nigeria.',
    type: 'Penthouse',
    size: '400 sqm',
    price: '₦1,000,000/month',
    category: 'Flat',
    listingType: 'buy',
  },
];

const categories = ['Top', 'Self-contain', 'Flat', 'Shop', 'Office', 'Event Centre'];

const PropertyList = () => {
  const [selectedListingType, setSelectedListingType] = useState<'buy' | 'rent'>('buy');
  const [selectedCategory, setSelectedCategory] = useState<string>('Top');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredProperties = properties
    .filter(
      (property) =>
        (selectedCategory === 'Top' || property.category === selectedCategory) &&
        property.listingType === selectedListingType
    )
    .slice(0, showAll ? undefined : 5);

  return (
    <div className="px-4 py-8 font-satoshi">
      {/* Heading and Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Properties</h2>
        <div className="flex bg-text rounded-full p-1">
          <button
            onClick={() => setSelectedListingType('buy')}
            className={`px-4 py-2 text-sm rounded-full ${
              selectedListingType === 'buy' ? 'bg-primary text-text-500 font-bold' : 'text-white font-bold'
            } transition`}
          >
            Buy
          </button>
          <button
            onClick={() => setSelectedListingType('rent')}
            className={`px-4 py-2 text-sm rounded-full ${
              selectedListingType === 'rent' ? 'bg-primary text-text-500 font-bold' : 'text-white font-bold'
            } transition`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Category Carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4.5}
        navigation
        loop
        className="mb-6"
      >
        {categories.map((category) => (
          <SwiperSlide key={category}>
            <button
              onClick={() => setSelectedCategory(category)}
              className={`text-sm px-3 py-2 rounded-md ${
                selectedCategory === category ? 'font-bold text-black' : 'text-gray-400'
              } transition`}
            >
              {category}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-[250px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="p-4">
              <p className="text-gray-600">{property.location}</p>
              <h3 className="font-bold text-lg">{property.title}</h3>
              <p className="text-gray-500">{property.type}</p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-400">Size:</p>
                  <p className="font-semibold">{property.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Price:</p>
                  <p className="font-semibold">{property.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      {!showAll && filteredProperties.length >= 5 && (
        <div className="text-center mt-20">
          <button
            onClick={() => setShowAll(true)}
            className="bg-primary text-text px-6 py-3 rounded-full font-bold hover:bg-hover transition shadow-[0px_20px_30px_#64e465]"
          >
            <div className='flex gap-4'>
              <span>View All</span>
              <span><MdKeyboardDoubleArrowDown size={24} /></span>
            </div>  
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
