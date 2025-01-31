import { useContext, useEffect, useState } from "react";
import { SettingsTabContext } from "./SettingsContextProvider";
import { tabsInterface } from "./SettingsComponent";


interface ControllerProps{
    tabs: tabsInterface[];
}


export default function SettingsTabController({tabs} : ControllerProps ) {
    const {currentTab} = useContext(SettingsTabContext)
    const [content, setContent] = useState(tabs[0].component)

    useEffect(() => {
        const selectedTab = tabs.find((tab) => tab.name === currentTab)
        setContent(selectedTab?.component)
    }, [currentTab, tabs])
    return (
        <div className="flex flex-row items-center content-center space-x-5">
            {content}
        </div>
    );
}