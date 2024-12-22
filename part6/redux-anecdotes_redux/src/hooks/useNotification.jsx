import { useState, useRef } from "react";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const useNotification = () => {
  const timeoutRef = useRef(null);

  const notify = (content, dispatch) => {
    dispatch(setNotification(content));
    // clear timeout if there is one
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return notify;
};

export default useNotification;
