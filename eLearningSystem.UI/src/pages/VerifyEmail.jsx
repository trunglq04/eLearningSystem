import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmEmail } from "../utils/APIServices";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleConfirmEmail = async () => {
      const paramUrl = new URLSearchParams(location.search);
      const emailParam = paramUrl.get("email");
      const tokenParam = paramUrl.get("token");
      try {
        const response = await confirmEmail(emailParam, tokenParam);
        if (response) {
          navigate("/email/verify/success");
        } else {
          navigate("/email/verify/failed");
        }
      } catch (error) {}
    };
    handleConfirmEmail();
  }, [location.search]);

  return <div>Verifying Email</div>;
};

export default VerifyEmail;
