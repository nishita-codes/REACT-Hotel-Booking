import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, roomsDummyData } from '../assets/assets';
import StarRating from '../Components/StarRating';

const RoomDetails = () => {
    const {id} = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
     
    console.log("hey" , roomsDummyData)
    
    useEffect(() => {
    const foundRoom = roomsDummyData.find(room => room._id.toString() === id);
    console.log("foundroom →", foundRoom);

    if (foundRoom) {
        setRoom(foundRoom);
        setMainImage(foundRoom.images[0]);
    } else {
        console.warn("No room found for id:", id);
    }
}, []);
   


    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* room details */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{room?.hotel?.name}  <span className='font-inter text-sm '>({room.roomType})</span>
                </h1>
                <p className='text-sm font-inter py-1.5 px-3 text-white bg-orange-500'>20% OFF</p>
            </div>

            {/* room rating */}
             <div className='flex item-center gap-1 mt-2'>
                <StarRating/>
                <p className='ml-2'>200+ reviews</p>
             </div>

             {/* room address */}
             <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <img src={assets.locationIcon} alt="location-Icon" />
                <span>{room.hotel.address}</span>
             </div>

             {/* room images */}
             <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                <div className='lg:w-1/2 w-full'>
                    <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
                </div>
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                    {room?.images.length > 1 && room.images.map((image,index)=>(
                        <img  onClick={()=>setMainImage(image)}  key={index} src={image} alt='Room Image' 
                        className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
                    ))}
                </div>
             </div>
        </div>

    )
}

export default RoomDetails
