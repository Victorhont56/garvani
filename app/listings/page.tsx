'use client'

import useListModal from "../hooks/useListModal";





const ListingPage = () => {
  const listModal = useListModal();

    return (
       <>
           <div >
           <div className="flex gap-4">
                 <span><p >Add a new listing</p></span> <span onClick={listModal.onOpen} className="bg-green-500 cursor-pointer">Add</span>
           </div>
           </div>
       </>
    )
}

export default ListingPage