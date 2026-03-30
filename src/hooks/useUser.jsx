import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext.jsx";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/ApiEndPoints.js";



export const useUser = () => {
    const navigate = useNavigate();
    const { user, setUser, clearUser } = useContext(AppContext);
 

    useEffect(() => {
        if (user) {
            return;
        }

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

                if (isMounted && response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.log("Failed to fetch the user info", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();

        return () => {
            isMounted = false;
        };
    }, [user]);
}; 