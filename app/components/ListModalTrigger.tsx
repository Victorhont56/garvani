"use client";

import useListModal from "@/app/hooks/useListModal";

const ListModalTrigger = () => {
  const listModal = useListModal();

  return (
    <div className="flex gap-4">
      <span>
        <p>Add a new listing</p>
      </span>
      <span
        onClick={listModal.onOpen}
        className="bg-green-500 cursor-pointer px-3 py-1 text-white rounded-md"
      >
        Add
      </span>
    </div>
  );
};

export default ListModalTrigger;
