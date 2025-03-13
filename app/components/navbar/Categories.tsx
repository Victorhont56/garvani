"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";
import { useRef } from "react";

export const categories = [
  { label: "Beach", icon: TbBeach, description: "This property is close to the beach!" },
  { label: "Windmills", icon: GiWindmill, description: "This property has windmills!" },
  { label: "Modern", icon: MdOutlineVilla, description: "This property is modern!" },
  { label: "Countryside", icon: TbMountain, description: "This property is in the countryside!" },
  { label: "Pools", icon: TbPool, description: "This property has a beautiful pool!" },
  { label: "Islands", icon: GiIsland, description: "This property is on an island!" },
  { label: "Lake", icon: GiBoatFishing, description: "This property is near a lake!" },
  { label: "Skiing", icon: FaSkiing, description: "This property has skiing activities!" },
  { label: "Castles", icon: GiCastle, description: "This property is an ancient castle!" },
  { label: "Caves", icon: GiCaveEntrance, description: "This property is in a spooky cave!" },
  { label: "Camping", icon: GiForestCamp, description: "This property offers camping activities!" },
  { label: "Arctic", icon: BsSnow, description: "This property is in an arctic environment!" },
  { label: "Desert", icon: GiCactus, description: "This property is in the desert!" },
  { label: "Barns", icon: GiBarn, description: "This property is in a barn!" },
  { label: "Lux", icon: IoDiamond, description: "This property is luxurious!" },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isMainPage) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.5; // Dynamic scroll based on container width
      console.log("Scrolling", direction, "by", scrollAmount); // Debugging
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <div className="relative">
        {/* ✅ Left Arrow */}
        <button
          onClick={(e) => {
            e.preventDefault();
            scroll("left");
          }}
          className="
            absolute left-0 top-1/2 transform -translate-y-1/2
            bg-white border border-gray-300 shadow-md
            rounded-full w-10 h-10 flex items-center justify-center
            z-50 hover:bg-gray-100 transition
          "
        >
          <FaChevronLeft size={20} className="text-gray-500" />
        </button>

        {/* ✅ Scrollable Category Container */}
        <div
          ref={scrollRef}
          className="
            flex items-center gap-6 overflow-x-scroll
            scroll-smooth scrollbar-hide
          "
        >
          {categories.map((item) => (
            <CategoryBox
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          ))}
        </div>

        {/* ✅ Right Arrow */}
        <button
          onClick={(e) => {
            e.preventDefault();
            scroll("right");
          }}
          className="
            absolute right-0 top-1/2 transform -translate-y-1/2
            bg-white border border-gray-300 shadow-md
            rounded-full w-10 h-10 flex items-center justify-center
            z-[100] hover:bg-gray-100 transition
          "
        >
          <FaChevronRight size={20} className="text-gray-500" />
        </button>
      </div>
    </Container>
  );
};

export default Categories;