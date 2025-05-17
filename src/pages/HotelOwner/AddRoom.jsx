import React, { useState } from 'react'
import Title from '../../Components/Title'
import { assets } from '../../assets/assets'

const AddRoom = () => {
  const [images,setImages] = useState({1:null,
    2:null,
    3:null,
    4:null
  })
  const [inputs, setInputs] = useState({
    roomType:'',
    pricePerNight:0,
    amenities:{
      'Free Wifi' : false,      
      'Free Breakfast' : false,      
      'Room Services' : false,      
      'Mountain View' : false,      
      'Pool Access' : false     

    }
  })
  return (
    <div>
      <form>
        <Title align='left' font='outfit' title='Add Room' subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.'/>

        {/* upload area for images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key)=>(
          <label htmlFor={`roomImage${key}`} key={key}>
            <img  className='max-h-13 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input type="file" accept='image/*' id={`roomImage${key}`}  hidden onChange={e=>setImages({...images, [key]: e.target.files[0]})}/>
          </label>
        ))}
      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
         <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select value={inputs.roomType} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full' onChange={e=> setInputs({...inputs,RoomType: e.target.value})}>
            <option value="">Select Room type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Duble Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suits">Family Suits</option>
          </select>
         </div>

         <div>
           <p className='mt-4 text-gray-800'>Price <span className='text-sm'>/night</span></p>
           <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' />
         </div>
      </div>
      </form>
    </div>
  )
}

export default AddRoom
