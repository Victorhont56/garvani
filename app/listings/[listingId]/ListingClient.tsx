"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/libs/firebase";
import useLoginModal from "@/app/hooks/useLoginModal";
import useListModal from "@/app/hooks/useListModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types/index";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import EmptyState from "@/app/components/EmptyState";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing?: SafeListing & { user: SafeUser }  |  null; 
  currentUser?: SafeUser | null;
  invalidListing?: boolean;
  listingNotFound?: boolean;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
  invalidListing,
  listingNotFound,
}) => {
  const loginModal = useLoginModal();
  const listModal = useListModal(); // Add useListModal
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return listing ? categories.find((item) => item.label === listing.category) : undefined;
  }, [listing?.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing?.price || 0);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    if (!dateRange.startDate || !dateRange.endDate) {
      return toast.error("Please select valid dates.");
    }

    setIsLoading(true);

    try {
      const reservationsRef = collection(db, "reservations");
      await addDoc(reservationsRef, {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
        userId: currentUser.id,
        createdAt: serverTimestamp(),
      });

      toast.success("Listing reserved!");
      setDateRange(initialDateRange);
      router.push("/trips");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error("Error creating reservation:", error);
    } finally {
      setIsLoading(false);
    }
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate && listing?.price) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      setTotalPrice(dayCount ? dayCount * listing.price : listing.price);
    }
  }, [dateRange, listing?.price]);

  // ✅ Handle invalid or missing listing
  if (invalidListing) {
    return (
      <div className="text-center mt-10">
        <div className="flex flex-row items-center gap-4 justify-center mt-4">
          <p className="text-lg font-semibold">Add a new listing</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={listModal.onOpen}
          >
            Add
          </button>
        </div>
        <EmptyState title="Invalid Listing" subtitle="Listing ID is missing." />
      </div>
    );
  }

  if (listingNotFound) {
    return (
      <div className="text-center mt-10">
        <div className="flex flex-row items-center gap-4 justify-center mt-4">
          <p className="text-lg font-semibold">Add a new listing</p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={listModal.onOpen}
          >
            Add
          </button>
        </div>
        <EmptyState title="Listing Not Found" subtitle="The listing you're looking for does not exist." />
      </div>
    );
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          {/* ✅ Listing Head */}
          {listing && (
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              locationValue={listing.locationValue}
              id={listing.id}
              currentUser={currentUser}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            {/* ✅ Listing Info */}
            {listing && (
              <ListingInfo
                user={listing.user}
                mode={listing.mode}
                type={listing.type}
                category={category}
                description={listing.description}
                livingroomCount={listing.livingroomCount}
                bedroomCount={listing.bedroomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
              />
            )}

            {/* ✅ Listing Reservation */}
            {listing && (
              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value: any) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
