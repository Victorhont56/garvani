"use client";

import { toast } from "react-hot-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, deleteDoc } from "firebase/firestore";

import { SafeListing, SafeUser } from "@/app/types";
import { db } from "@/app/libs/firebase"; // Adjust the path to your Firebase config

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        // Delete the listing from Firestore
        await deleteDoc(doc(db, "listings", id));

        toast.success("Listing deleted");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;