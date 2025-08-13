import React from "react";


function Badge({ variant = "default", children, className = "", ...props }) {
  return (
    <div
      className={`badge badge-${variant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Badge;
