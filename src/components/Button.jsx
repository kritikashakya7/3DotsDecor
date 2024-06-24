import React from "react";

const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={
        className +
        " p-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded active:scale-[99%] animation disabled:bg-primary/50 disabled:cursor-not-allowed"
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
