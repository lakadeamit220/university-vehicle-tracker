import { forwardRef } from "react";

const Card = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-surface rounded-xl shadow-sm border border-border-color p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
