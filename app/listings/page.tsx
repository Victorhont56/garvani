'use client'

import useListModal from "../hooks/useListModal";
import ProtectedRoute from "@/app/components/ProtectedRoute";




const ListingPage = () => {
  const listModal = useListModal();

    return (
        <>
             <ProtectedRoute>
                <div >
                <div className="flex gap-4">
                        <span><p >Add a new listing</p></span> <span onClick={listModal.onOpen} className="bg-green-500 cursor-pointer">Add</span>
                </div>
                </div>
            </ProtectedRoute>    
       </>
    )
}

export default ListingPage