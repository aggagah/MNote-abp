import React from "react";
import loading from "../assets/loading.svg";

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center h-auto w-auto bg-lightWhite">
            <img src={loading} className="bg-transparent" />
        </div>
    );
}

export default LoadingSpinner;
