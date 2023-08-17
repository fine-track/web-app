import React from "react";
import {
    BsListUl,
    BsWindowStack,
    BsToggles,
    BsPlus,
    BsLightbulb,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const BottomBar: React.FC = () => {
    return (
        <nav className="fixed bottom-0 right-0 left-0 h-[60px] bg-white border-t px-6 flex flex-row justify-between items-center text-textSecondary md:px-[20vw] lg:px-[30vw]">
            <Link
                to={{ pathname: "/journals" }}
                className="w-[2rem] h-[2rem] text-[1.6rem] flex justify-center items-center"
            >
                <BsListUl />
            </Link>
            <Link
                to={{ pathname: "/ledgers" }}
                className="w-[2rem] h-[2rem] text-[1.6rem] flex justify-center items-center"
            >
                <BsWindowStack />
            </Link>
            <button className="w-[2rem] h-[2rem] text-[1.6rem] flex justify-center items-center rounded-full bg-textSecondary text-white">
                <BsPlus />
            </button>
            <Link
                to={{ pathname: "/plans" }}
                className="w-[2rem] h-[2rem] text-[1.6rem] flex justify-center items-center"
            >
                <BsLightbulb />
            </Link>
            <Link
                to={{ pathname: "/preferences" }}
                className="w-[2rem] h-[2rem] text-[1.6rem] flex justify-center items-center"
            >
                <BsToggles />
            </Link>
        </nav>
    );
};

export default BottomBar;
