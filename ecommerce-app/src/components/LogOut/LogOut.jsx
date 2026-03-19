import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../authSlice";
import './LogOut.css'

const LogOut = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  
  return (
    <div className='logout-container'>
      <div className='logout-content'>
        <h1>Your are successfully logout</h1>
      </div>
    </div>
  )
}

export default LogOut