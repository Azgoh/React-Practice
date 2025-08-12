import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuth2RedirectHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      sessionStorage.setItem("jwt", token);
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate, searchParams]);

  return null;
}
