import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import PATHROUTES from "./helpers/PathRoutes.helper.js";
import Details from "./components/Details/Details.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./components/NotFound.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StoreItem from "./helpers/LocalStorage.js";
import Nav from "./components/Nav.jsx";
import Vender from "./components/Vender.jsx";
import Gestionar from "./components/Gestionar.jsx";
import Canasto from "./components/Canasto.jsx";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userLoggedInfo = useSelector(state => state.UserLogued);
  // console.log("usuario logueado", userLoggedInfo);

  // useEffect(() => {
  //   if(localStorage.getItem(StoreItem.idPeople)){
  //     dispatch(getUser(JSON.parse(localStorage.getItem(StoreItem.idPeople))))
  //   }
  //   },[dispatch])

    useEffect(() => {
      if (!userLoggedInfo) return;
  
      if (userLoggedInfo.typeAdmin  === true || userLoggedInfo.typeAdmin  === false) {
        if (pathname === PATHROUTES.LANDING || pathname === PATHROUTES.LANDING) {
          navigate(PATHROUTES.HOME);
        }
      } else if (userLoggedInfo.typeAdmin === false) {
        if (pathname === PATHROUTES.LANDING || pathname === PATHROUTES.LANDING) {
          navigate(PATHROUTES.HOME);
        }
      } 
    }, [userLoggedInfo]);
    localStorage.setItem(StoreItem.isAdmin, userLoggedInfo.typeAdmin);

  return (
    <div>
          <div>
            {/* <Nav></Nav> */}
            <Routes>
              <Route path={PATHROUTES.LANDING} element={<Home />}/>
              <Route path={PATHROUTES.VENDER} element={<Vender />} />
              <Route path={PATHROUTES.GESTIONAR} element={<Gestionar />} />
              <Route path={PATHROUTES.CANASTO} element={<Canasto />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
    </div>
  )
};


export default App
