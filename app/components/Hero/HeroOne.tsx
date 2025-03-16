import React from 'react';

const HeroOne = () => {
    return (
    <>
        <div className='mt-[200px]'>
                <div className='flex flex-col gap-8 '>
                    <div className='rounded-xl bg-white border border-[#ededed] shadow-lg mx-[20px]'>
                        <div className='m-[25px]'>   
                            <p className="text-text text-[12px] mb-2 font-satoshi leading-normal">
                            Simple and Transparent Real Estate Platform
                            </p>
                            <h1 className="text-[48px] font-sans md:text-5xl font-bold text-text-900 leading-normal">
                            Find and List <br />
                            Properties with <br />
                            no <span className="italic text-primary font-dmSerif">hassle</span>
                            </h1>
                        </div> 
                    </div>
                    <div className='rounded-xl bg-white shadow-sm mx-[20px]'>
                        <div  className='m-[25px]'>
                            <p className="text-text-300 text-[16px] font-satoshi mt-4 max-w-lg leading-normal">
                            We bring you the perfect way to find residential 
                            and commercial properties effortlessly—seamless, 
                            reliable and stress-free.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center my-10">
                        <button className="bg-primary font-sans text-text-700 px-6 py-3 rounded-full font-bold hover:bg-hover transition shadow-[0px_20px_30px_#64e465]">
                        Get Started
                        </button>
                    </div>
                    <div className='rounded-xl bg-white border border-[#ededed] shadow-lg mx-[20px]'>
                        <div  className='m-[25px]'>
                            <h1  className="text-[28px] mb-8 font-sans md:text-5xl font-bold text-text-900 leading-normal">
                            An Innovative Platform to Real Estate
                            </h1>
                            <p>Find, rent, or buy homes and offices easily. Property owners can list hassle-free. Seamless real estate, all in one place!</p>
                        </div>
                    </div>
                </div>
        </div>    
    </>
)} 

    export default HeroOne
