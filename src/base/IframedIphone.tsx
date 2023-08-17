import React from "react";

const IframedIphone: React.FC = () => {
    return (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
            Dashboard
            <div className="border-[8px] border-textPrimary rounded-[60px] overflow-hidden relative scale-95">
                <div className="z-[1000] absolute top-[0.5rem] bg-black rounded-full w-[8rem] h-[2rem] left-1/2 -translate-x-1/2"></div>
                <div className="z-[1000] absolute bottom-1 bg-black rounded-full w-[12rem] h-1 left-1/2 -translate-x-1/2"></div>
                <div className="w-full sticky top-0 h-[3rem] bg-gray-200"></div>

                <iframe
                    src="https://sifatul.com"
                    height="800px"
                    width="410px"
                ></iframe>
            </div>
        </div>
    );
};

export default IframedIphone;
