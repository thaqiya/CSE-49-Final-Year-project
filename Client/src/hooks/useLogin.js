import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { API } from "../../api";
import {cors} from 'cors';



export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();


  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${API}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

// {isLoading && <Loading />}
