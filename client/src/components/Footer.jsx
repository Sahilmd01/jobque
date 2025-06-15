import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <img width={160} src={assets.logo} alt="" />
      <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @InsiderJobs | All right reserved by <a href='https://www.linkedin.com/in/kaushal-rathod-dev/' target='_blank' className='text-base font-medium'>Kaushal Rathod</a> </p>
      <div className='flex items-center  mb-10 gap-2.5'>
        <a href="#">
        <img width={30} src={assets.facebook_icon} alt="" />
        </a>
        <a href="#">
        <img width={30} src={assets.twitter_icon} alt="" />
        </a>
        <a href="#">
        <img width={30} src={assets.instagram_icon} alt="" />
        </a>
        
        
      </div>
    </div>
  )
}

export default Footer
