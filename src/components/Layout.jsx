import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {ROOT} from "../routes";
import {useAuth} from "../context/AuthContext";
import Navbar from "./Navbar";

export default function Layout(){
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const { user, isLoading} = useAuth();

  useEffect(() => {

    if(!isLoading && pathname.startsWith("/protected") && !user){
      navigate(ROOT);
    }
  }, [pathname, isLoading, user, navigate]);

  if(isLoading) return "Loading...";

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
    )
}