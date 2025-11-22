import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from 'react-hot-toast';

// only set axios baseURL if provided
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
if (BACKEND_URL) {
    axios.defaults.baseURL=BACKEND_URL;
}

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency=import.meta.env.VITE_CURRENCY || '$';
    // call hook at top level (must be inside a Router in your app)
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [ShowHotelReg, setShowHotelReg] = useState(false);
    const [recentSearchedCities, setRecentSearchedCities] = useState([]); // renamed
    const [rooms, setRooms] = useState([]); 


    const fetchRooms = async()=>{
        try {
            const {data} = await axios.get('/api/rooms')
            if(data.success){
                setRooms(data.rooms)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // fetch user data from backend
    const fetchUser = async() => {
        try {
           const {data} = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})
            if (data && data.success) {
                setIsOwner(data.role === 'hotel-owner');
                // ensure recent cities are unique and limited to 3
                const uniqueCities = Array.from(new Set(data.recentSearchCities || []));
                setRecentSearchedCities(uniqueCities.slice(-3));
            } else {
                // retry fetching user details after 5 seconds
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }
        } catch (error) {
            toast.error(error?.message || 'Error fetching user');
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    },[user]);

    useEffect(()=>{
        fetchRooms();
    },[])

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        ShowHotelReg,
        setShowHotelReg,
        axios,
        recentSearchedCities,
        setRecentSearchedCities,
        rooms,
        setRooms
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
