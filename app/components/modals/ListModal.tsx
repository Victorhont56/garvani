"use client";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/libs/firebase"; // Adjust the path to your Firebase config
import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";
import useListModal from "@/app/hooks/useListModal";
import Button from "../Button";
import { useAuth } from '@/app/hooks/useAuth';


enum STEPS {
  MODE = 0,
  TYPE = 1,
  CATEGORY = 2,
  LOCATION = 3,
  FEATURES = 4,
  IMAGES = 5,
  DESCRIPTION = 6,
  PRICE = 7,
}

const ListModal = () => {
  const router = useRouter();
  const listModal = useListModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.MODE); // Start with MODE step


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      mode: "rent", // Default to "rent"
      type: "building", // Default to "building"
      category: "",
      location: null,
      guestCount: 0,
      livingroomCount: 0,
      bedroomCount: 0,
      bathroomCount: 0,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const mode = watch("mode");
  const type = watch("type");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const bedroomCount = watch("bedroomCount");
  const livingroomCount = watch("livingroomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    []
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext(); 
    }

    
  if (!data.category || !data.location || !data.imageSrc) {
    toast.error("Please fill all required fields.");
    return;
  }

    setIsLoading(true);

    try {
      // Save the listing to Firestore
      const listingsRef = collection(db, "listings");
      const newData = {
        ...data,
        location: {
          lat: data.location.latlng[0], // Ensure location is properly formatted
          lng: data.location.latlng[1],
        },
        price: Number(data.price), // Ensure price is a number
        createdAt: new Date().toISOString(),
      };
  
      await addDoc(listingsRef, newData);
      // Success
      toast.success("Listing created!");
      router.refresh();
      reset();
      setStep(STEPS.MODE);
      listModal.onClose();
    } catch (error) {
      // Handle errors
      console.error("Error creating listing:", error);
      toast.error("Error creating listing");
    } finally {
      setIsLoading(false);
    }
  };

  let actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.MODE) {
      return undefined; // No back button on the first step
    }

    return "Back"; // Show back button for all other steps
  }, [step]);

  let isNextDisabled = false; // Default to false

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.MODE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Is your property for rent or sale?"
          subtitle="Select an option"
        />
        <hr />
        <div className="flex flex-row gap-4">
          <Button
            label="Rent"
            onClick={() => setCustomValue("mode", "rent")}
            outline={mode !== "rent"} // Apply outline style if not selected
          />
          <Button
            label="Sale"
            onClick={() => setCustomValue("mode", "sale")}
            outline={mode !== "sale"} // Apply outline style if not selected
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.TYPE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Is your property a building or land?"
          subtitle="Select an option"
        />
        <hr />
        <div className="flex flex-row gap-4">
          <Button
            label="Building"
            onClick={() => setCustomValue("type", "building")}
            outline={type !== "building"} // Apply outline style if not selected
          />
          <Button
            label="Land"
            onClick={() => setCustomValue("type", "land")}
            outline={type !== "land"} // Apply outline style if not selected
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-3
            max-h-[50vh]
            overflow-y-auto
          "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );

    // Disable "Next" button if no category is selected
    isNextDisabled = !category;
    actionLabel = isNextDisabled ? "Select a category to continue" : "Next";
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );

    // Disable "Next" button if no location is selected
    isNextDisabled = !location;
    actionLabel = isNextDisabled ? "Select a location to continue" : "Next";
  }

  if (step === STEPS.FEATURES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("livingroomCount", value)}
          value={livingroomCount}
          title="Livingrooms"
          subtitle="How many Livingrooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bedroomCount", value)}
          value={bedroomCount}
          title="Bedrooms"
          subtitle="How many bedrooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a set of photos of your place"
          subtitle="Upload very clear images!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Additional information useful to customers"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your monthly price"
          subtitle="How much do you charge per month?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // Disable scrolling when modal is open
  useEffect(() => {
    if (listModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [listModal.isOpen]);

  return (
    <>
      {/* Backdrop */}
      {listModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[500]"
          onClick={listModal.onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-[1000] ${
          listModal.isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Modal
          disabled={isLoading} // Disables the entire modal if loading
          isNextDisabled={isNextDisabled} // Disables only the "Next" button
          isOpen={listModal.isOpen}
          title="Add a new Listing"
          actionLabel={actionLabel}
          onClose={listModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step === STEPS.MODE ? undefined : onBack}
        />
      </div>
    </>
  );
};

export default ListModal;