import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { SafeUser } from "@/app/types";
import { db } from "@/app/libs/firebase"; // Adjust the path to your Firebase config
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        const userRef = doc(db, "users", currentUser.id);

        if (hasFavorited) {
          // Remove the listing from favorites
          await updateDoc(userRef, {
            favoriteIds: arrayRemove(listingId),
          });
        } else {
          // Add the listing to favorites
          await updateDoc(userRef, {
            favoriteIds: arrayUnion(listingId),
          });
        }

        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;