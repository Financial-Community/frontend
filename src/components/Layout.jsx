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
    if(pathname.startsWith("/protected") && !user){
      navigate(ROOT);
    }
  }, [navigate, pathname  , user]);

  if(isLoading) return "Loading...";

  return (
    <>
      <Navbar/>
      <Outlet />
    </>
    )
}