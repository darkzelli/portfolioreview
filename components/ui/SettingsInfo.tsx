import React from "react";

interface InfoProps {
  title: string;
  data?: any;
}

//Info displayed in a box that looks disabled
function SettingsInfo({ title, data="N/A" }: InfoProps){
  
  
    return (
        <div className=" flex flex-col w-full">
            <div className="py-3 font-medium">{title}</div>
            <div className="w-72 text-wrap bg-gray-100 text-gray-500 px-4 py-2 ">
                {data}
            </div>
        </div>
    );
};
  
  export default SettingsInfo;