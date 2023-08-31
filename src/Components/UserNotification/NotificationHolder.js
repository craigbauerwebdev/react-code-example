import React, { useEffect, useRef } from "react";

/**
 *
 * @param {object} props
 * @param {boolean} props.notification
 * @param {Function} props.callBack
 * @param {Node} props.children
 * @param {any} props.attrs
 *
 * @returns {JSX.Element}
 */
const NotificationHolder = ({ notification, callBack, children, ...attrs }) => {
  const timer = useRef(null);

  const hoverOn = () => {
    timer.current = setTimeout(() => {
      markAsRead();
    }, 2000);
  };

  const hoverOff = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const markAsRead = () => {
    callBack();
  };

  useEffect(() => {
    // Avoid memory leak for component unmount.
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div {...attrs} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
      {children}
    </div>
  );
};

export default NotificationHolder;
