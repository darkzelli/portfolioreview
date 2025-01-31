import { useContext } from "react";
import { SettingsTabContext } from "./SettingsContextProvider";

interface NavBarItemProps{
    name: string;

}


export default function SettingsNavBarItem({name}: NavBarItemProps) {
    const {currentTab, setCurrentTab} = useContext(SettingsTabContext)

    return (
        <div className="flex flex-row  items-start space-x-5 ">
            <div  onClick={() => setCurrentTab(name)} className={currentTab === name ? 'flex justify-center items-center  text-black w-36 h-10 bg-gray-400 bg-opacity-10 cursor-pointer rounded	' : 'flex justify-center items-center w-36 h-10 cursor-pointer text-stone-500 '}>{name}</div>
        </div>
    );
}
