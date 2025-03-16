import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import HomeClient from "./HomeClient";
import EmptyState from "@/app/components/EmptyState";
import { getAuth } from "firebase/auth";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const auth = getAuth();
  console.log("Current user:", auth.currentUser);

  try {
    const listings = await getListings({ ...searchParams, userId: currentUser?.id });

    if (listings.length === 0) {
      return <EmptyState showReset />;
    }

    return (
      <HomeClient listings={listings} currentUser={currentUser} />
    );
  } catch (error) {
    console.error("Error in Home component:", error);
    return <EmptyState showReset />;
  }
};

export default Home;