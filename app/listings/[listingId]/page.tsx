import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ListingClient from "./ListingClient";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!params.listingId) {
    return (
      <ListingClient
        listing={null}
        reservations={reservations}
        currentUser={currentUser}
        invalidListing
      />
    );
  }

  if (!listing) {
    return (
      <ListingClient
        listing={null}
        reservations={reservations}
        currentUser={currentUser}
        listingNotFound
      />
    );
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
