import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Navbar/>
      <div className="min-h-screen">
        <Hero/>
        <JobListing/>
        <AppDownload/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home