'use client'
import PropertyLists from '../listings/PropertyLists'
import HeroOne from './HeroOne'
import HeroThree from './HeroThree'
import HeroTwo from './HeroTwo'

const Hero = () => {
    return (
        <>
           <HeroOne />
           <HeroTwo />
      {/** <HeroThree /> **/}
           <PropertyLists />
        </>
    )
}

export default Hero;