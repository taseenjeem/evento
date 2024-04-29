import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  const { authDetails, setAuthDetails } = useContext(AuthContext);
  return { authDetails, setAuthDetails };
};

export default useAuth;
