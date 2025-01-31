import SettingsNavBarItem from "./SettingsNavBarItem";
import { tabsInterface } from "./SettingsComponent";

interface NavBarProps{
    tabs: tabsInterface[];
}

export default function SettingsNavBar({tabs} : NavBarProps) {

    return (
        <div className="flex flex-row space-x-5">
            {tabs.map((item: tabsInterface , key: number) => (
                 <SettingsNavBarItem name={item.name}  key={key}/>
            ))}
        </div>
    );
}
