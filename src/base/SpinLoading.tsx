import React from "react";

type Props = {
    className?: string;
    size?: "sm" | "base" | "lg";
    color?: "primary" | "secondary" | "text" | "alternative";
};

const SpinLoading: React.FC<Props> = ({
    className = "",
    size = "base",
    color = "text",
}) => {
    // TODO: add other colors and sizes
    return (
        <div
            className={`rounded-full animate-spin 
            ${
                size === "sm"
                    ? "w-4 h-4 border-2"
                    : size === "lg"
                    ? "w-8 h-8 border-4"
                    : "w-5 h-5 border-4"
            } 
            ${
                color === "primary"
                    ? ""
                    : color === "secondary"
                    ? ""
                    : color === "alternative"
                    ? ""
                    : "border-t-textSecondary"
            } 
            ${className}`}
        ></div>
    );
};

export default SpinLoading;
