// Button.jsx
import React from "react";

import { cn } from "../../lib/utils/cn"; // optional depending on usage

const Button = ({ children, className, ...props }) => {
  return (
    <button className={cn("btn", className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

