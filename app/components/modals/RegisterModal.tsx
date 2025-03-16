"use client";

import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { auth } from "@/app/libs/firebase";
import { addUserToDatabase } from "@/app/libs/UserService";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useCurrentUser from "@/app/hooks/useCurrentUser";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (registerModal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [registerModal.isOpen]);

  // ✅ Modified registration function to store user in Firestore
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
     
     
      const user = userCredential.user;
      console.log("✅ User registered with Firebase Auth:", user);
      

      // ✅ Save user to Firestore
      console.log("📢 Saving user to Firestore...");
      await addUserToDatabase({
        id: user.uid,
        name: data.name,
        email: data.email,
      });

        // ✅ Set the user in global state after registration
        setCurrentUser({
          id: user.uid,
          name: data.name,
          email: data.email,
          emailVerified: false, // Default value
          favoriteIds: [], // Default value
          createdAt: new Date().toISOString(), // Use the current time
          updatedAt: new Date().toISOString(), // Use the current time
        });

      toast.success("Account created!");
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error during registration:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Open login modal instead of register modal
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  // Form inputs and content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Garvani" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // Footer with Google Auth and login toggle
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() =>
          signInWithPopup(auth, new GoogleAuthProvider())
            .then((result) => {
              console.log("Google Sign-In successful:", result.user);
              toast.success("Signed in with Google!");
              registerModal.onClose();
            })
            .catch((error) => {
              console.error("Google Sign-In error:", error);
              toast.error(error.message);
            })
        }
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {registerModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[500]"
          onClick={registerModal.onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-[1000] ${
          registerModal.isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Modal
          disabled={isLoading}
          isOpen={registerModal.isOpen}
          title="Register"
          actionLabel="Continue"
          onClose={registerModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
      </div>
    </>
  );
};

export default RegisterModal;
