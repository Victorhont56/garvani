// components/modals/LoginModal.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { auth } from "@/app/libs/firebase"; // Adjust the path to your Firebase config

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (loginModal.isOpen) {
      // Disable scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [loginModal.isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Firebase email/password login
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Logged in");
        router.push("/listings"); // Redirect to the listings page after login
        router.refresh(); // Refresh the page to update the UI
        loginModal.onClose(); // Close the login modal
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          First time using Garvani?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {loginModal.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[500]"
          onClick={loginModal.onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-[1000] ${
          loginModal.isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <Modal
          disabled={isLoading}
          isOpen={loginModal.isOpen}
          title="Login"
          actionLabel="Continue"
          onClose={loginModal.onClose}
          onSubmit={handleSubmit(onSubmit)}
          body={bodyContent}
          footer={footerContent}
        />
      </div>
    </>
  );
};

export default LoginModal;