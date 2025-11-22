import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
// import { roomsDummyData } from '../assets/assets'
import Title from './Title'
import { useNavigate, useViewTransitionState } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'


const RecommendedHotels = () => {
     const {rooms , searchedCities} = useAppContext();
     const [recommended , setRecommended] = useState([]);

     const filterHotels = () =>{
        const filteredHotels =  rooms.slice().filter( room => searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);
     }

     useEffect(()=>{
        filterHotels();
     },[rooms , searchedCities])
    
  return recommended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 '>

        <Title title='Recommended Hotels' subTitle='Discover our handpicked selection of exceptional properties around the wrold, offering unparalleled luxury and unforgettable experiences.'/>
       <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
         {recommended.slice(0,6).map((room,index)=>(
            <HotelCard key={room._id} room={room} index={index}/>
         ))}
       </div>
       <button  onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-12 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>View all Destinations</button>
    </div>
  ) 
}

export default RecommendedHotels;
