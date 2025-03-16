import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ListingClient from "./ListingClient";
import EmptyState from "@/app/components/EmptyState";


interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { listingId } = params;
  console.log("Listing ID from params:", listingId);

  // Early return if listingId is missing
  if (!listingId) {
    return (
      <EmptyState
        title="Invalid Listing ID"
        subtitle="Please provide a valid listing ID."
      />
    );
  }

  try {
    // Fetch data concurrently
    const [listing, reservations, currentUser] = await Promise.all([
      getListingById({ listingId }),
      getReservations({ listingId }),
      getCurrentUser(),
    ]);

    // Handle case where listing is not found
    if (!listing) {
      return (
        <EmptyState
          title="Listing Not Found"
          subtitle="The listing you are looking for does not exist."
        />
      );
    }

    // Render ListingClient with fetched data
    return (
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    );
  } catch (error) {
    console.error("Error in ListingPage:", error);
    return (
      <EmptyState
        title="Error"
        subtitle="An error occurred while fetching the listing details."
      />
    );
  }
};

export default ListingPage;