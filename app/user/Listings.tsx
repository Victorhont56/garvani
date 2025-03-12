"use client";

import { useState } from "react";
import Button from "@/app/components/Button";

const Listing = () => {
  const [listingType, setListingType] = useState<"buy" | "rent">("buy");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
        <Button
          label="+ Add New Listing"
          onClick={() => {}}
          outline={false}
          small={false}
        />
      </div>

      {/* Toggle Button */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex bg-gray-200 rounded-full p-1">
          <Button
            label="Buy"
            onClick={() => setListingType("buy")}
            outline={listingType !== "buy"}
            small
          />
          <Button
            label="Rent"
            onClick={() => setListingType("rent")}
            outline={listingType !== "rent"}
            small
          />
        </div>
      </div>

      {/* Listings Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Modern Apartment
              </h2>
              <p className="text-gray-600 text-sm">
                Lagos, Nigeria • $500,000
              </p>
              <Button
                label="View Details"
                onClick={() => {}}
                outline={false}
                small
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listing;
