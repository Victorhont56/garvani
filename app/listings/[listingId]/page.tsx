import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ListingClient from "./ListingClient";
import EmptyState from "@/app/components/EmptyState";
import ProtectedRoute from "@/app/components/ProtectedRoute";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;

  // ✅ Ensure listingId is a valid string
  if (!listingId || Array.isArray(listingId)) {
    console.error("Invalid Listing ID:", listingId);
    return (
      <ProtectedRoute>
      <EmptyState
        title="Invalid Listing ID"
        subtitle="Please provide a valid listing ID."
      />
      </ProtectedRoute>
    );
  }

  try {
    console.log("Listing ID from params:", listingId);

    // ✅ Fetch data concurrently using Promise.all
    const [listing, reservations, currentUser] = await Promise.all([
      getListingById({ listingId }),
      getReservations({ listingId }),
      getCurrentUser(),
    ]);

    // ✅ Handle missing listing
    if (!listing) {
      return (
        <ProtectedRoute>
        <EmptyState
          title="Listing Not Found"
          subtitle="The listing you are looking for does not exist."
        />
        </ProtectedRoute>
      );
    }

    // ✅ Render the listing client with the fetched data
    return (
      <ProtectedRoute>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
      </ProtectedRoute>
    );
  } catch (error) {
    console.error("Error in ListingPage:", error);
    return (
      <ProtectedRoute>
      <EmptyState
        title="Error"
        subtitle="An error occurred while fetching the listing details."
      />
      </ProtectedRoute>
    );
  }
};

export default ListingPage;
