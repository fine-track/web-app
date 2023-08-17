import React from "react";
import { BsPerson } from "react-icons/bs";

const AppBar: React.FC = () => {
    return (
        <nav className="fixed top-0 right-0 left-0 h-[60px] bg-white border-b px-6 flex flex-row justify-between items-center">
            <h4 className="font-black">FT</h4>
            <button className="text-textPrimary w-[2rem] h-[2rem] text-[1.6rem]">
                <BsPerson />
            </button>
        </nav>
    );
};

export default AppBar;
