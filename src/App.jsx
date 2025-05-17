import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './Components/Footer';
import AllRoom from './pages/AllRoom';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './Components/HotelReg';
import Layout from './pages/HotelOwner/Layout';
import Dashboard from './pages/HotelOwner/Dashboard';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';

const App = () => {

  const isOwnerPath = useLocation().pathname.includes("owner");
 
  return (
    <div>
      {!isOwnerPath && <Navbar/> }
       {false && <HotelReg/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/rooms' element={<AllRoom/>} />
          <Route path='/rooms/:id' element={<RoomDetails/>} />
          <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path='/owner' element={<Layout/>}>
             <Route index element={<Dashboard/>}/>
             <Route path='add-room' element={<AddRoom/>}/>
             <Route path='list-room' element={<ListRoom/>}/>
            
          </Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  )
}

export default App
