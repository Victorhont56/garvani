import React from 'react';
import Carousel from './Carousel';
const HeroTwo = () => {
return (
    <>
         <div className='mt-20 md:mt-0 lg:mt-0 px-4'>
            <div className='flex flex-col gap-4 '>
                <div className='font-dmSerrif text-text-900 font-bold text-[28px] leading-medium '>
                    <p >An Innovative Platform to Real Estate</p>
                </div>
                <div className='font-satoshi leading-normal text-text-500 text-[16px]'>
                    <p>Find, rent, or buy homes and offices easily. Property owners can list hassle-free. Seamless real estate, all in one place!</p>
                </div>
            </div>
            <div>
                <Carousel />
            </div>
        </div>
    </>
)

}

export default HeroTwo