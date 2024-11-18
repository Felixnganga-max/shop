import React from 'react';
import {assets} from '../assets/assets'


const Hero = () => {
  return (
    <div className='flex mt-6 h-[60vh] flex-col sm:flex-row border border-gray-400'>
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-10">
        <div className="text-[#41414141]">
          <div className="flex items-center gap-2">
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-black text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-black text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className='font-semibold text-black text-sm md:text-base'>SHOP NOW</p>
            <div className='flex-1 h-[2px] bg-[#414141]'></div> {/* Line after the text */}
          </div>
        </div>
      </div>

      {/* HERO RIGHT SIDE */}
      <img className='w-full sm:w-1/2 object-cover' src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;
