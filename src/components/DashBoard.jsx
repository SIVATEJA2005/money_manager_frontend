import { Children, useContext } from "react";
import  AppContext  from "../Context/AppContext.jsx";
import Menubar from "./Menubar.jsx";
import SideBar from "./SideBar.jsx";

const Dashboard = ({children,activeMenu}) =>
{
    const { user } = useContext(AppContext);
    // console.log(user);
    return (
        <div>
            <Menubar activeMenu={activeMenu}/>

            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideBar activeMenu={activeMenu}/>
                    </div>

                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
