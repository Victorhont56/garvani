'use client';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface HomeClientProps {
  listings: any[];
  currentUser: any;
}

const HomeClient: React.FC<HomeClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <div className="
        pt-24
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default HomeClient;
