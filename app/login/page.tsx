// app/login/page.tsx
"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Button from "@/app/components/Button";

const LoginPage = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    
    <div className='mt-[20px]'>
        <div className='flex flex-col gap-8 justify-center '>
            <div className='rounded-xl bg-white shadow-md mx-[20px]'>
                <div className='m-[25px]'>   
                    
                    <h1 className="text-[20px] font-sans text-text-900 leading-normal">
                   Oops!!! It seems that you are not logged in or don't have an account.</h1>
                </div> 
            </div>
            <div onClick={loginModal.onOpen} 
                className='rounded-xl bg-white cursor-pointer hover:bg-primary hover:text-white shadow-md mx-[20px]'>
                <div className='m-[25px] text-center'>   
                    
                    <h1 className="text-[20px] font-sans md:text-2xl  font-bold text-text-900 leading-normal">
                  Log In</h1>
                </div> 
            </div>
            <div  onClick={registerModal.onOpen}
                  className='rounded-xl bg-white cursor-pointer hover:bg-primary hover:text-white shadow-md mx-[20px]'>
                <div className='m-[25px] text-center'>   
                    
                    <h1 className="text-[20px] font-sans md:text-2xl font-bold text-text-900 leading-normal">
                  Sign Up</h1>
                </div> 
            </div>
        </div> 
        
    </div> 

       
  );
};

export default LoginPage;