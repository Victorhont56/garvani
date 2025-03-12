'use client'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../libs/firebase';
import useCurrentUser from './useCurrentUser'

const useAuthSync = () => {
  const { setCurrentUser } = useCurrentUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          id: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          emailVerified: user.emailVerified || false,
          favoriteIds: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [setCurrentUser]);
};

export default useAuthSync;
