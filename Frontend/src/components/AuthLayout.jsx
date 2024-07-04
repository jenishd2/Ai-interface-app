import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const authStatus = JSON.parse(localStorage.getItem("status"));
  
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authentication, authStatus, navigate]);
  return Loading ? (
    <div>
      <h1>Login</h1>
    </div>
  ) : (
    <>{children}</>
  );
}
