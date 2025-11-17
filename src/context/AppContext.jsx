import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    let navigate;
    try {
        navigate = useNavigate();
    } catch (error) {
        navigate = null;
    }
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [ShowHotelReg, setShowHotelReg] = useState(false);
    const [recentSearchedCities, setRecentSearchedCities] = useState([]); // renamed

    // fetch user data from backend
    const fetchUser = async () => {
        try {
            const token = await getToken(); // get auth token
            const BASE = import.meta.env.VITE_BACKEND_URL;

            const { data } = await axios.get(`${BASE}/api/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
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
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

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
        setRecentSearchedCities
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
