import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const { stateChange } = useSelector((state) => state.auth);

  const routing = useRoute({ stateChange });
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
