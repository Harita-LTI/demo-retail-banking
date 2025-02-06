import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { removeToken } from "../../../utils/token";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const SessionTimeout: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const resetTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  useEffect(() => {
    const events = ["click", "keypress"];
    const handleActivity = () => resetTimer();
    const sessionDuration =
      user?.role && user.role === "BF_ADMIN" ? 30 * 60 * 1000 : 30 * 60 * 1000;

    events.forEach((event) => window.addEventListener(event, handleActivity));

    const timer = setTimeout(async () => {
      if (!isActive) {
        alert("Session expired. Please login again.");
        await dispatch(logout());
        removeToken();
        navigate("/login");
      }
      setIsActive(false);
    }, sessionDuration); // 10 minutes

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      clearTimeout(timer);
    };
  }, [isActive, resetTimer, dispatch]);

  return null;
};

export default SessionTimeout;
