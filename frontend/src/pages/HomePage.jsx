import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import Navbar from '../components/Home/Navbar'
import Cards from '../components/Home/Cards'
import RightImage from '../components/Home/RightImage'
import LeftImage from '../components/Home/LeftImage'
import Footer from '../components/Home/Footer'

const Landing = () => {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <Cards />
        <RightImage />
        <LeftImage />
        <Footer />
    </div>
  )
}

export default Landing