import SettingsNavBar from "./SettingsNavBar";
import SettingsContextProvider from "./SettingsContextProvider";

import SettingsTabController from "./SettingsTabController";
import Academics from "./tabs/Academics";
import Preferences from "./tabs/Preferences";


export interface tabsInterface{
    name: string,
    component: any
}

export default function SettingsComponent() {
    // **IMPORTANT** To add a tab add the name and component into this array
    const tabs: tabsInterface[] = [
        {
            name: 'Academics', //This name has to placed in the useState of SettingsContextProvider.tsx
            component: <><Academics/></>
        },
        {
            name: 'Preferences',
            component:  <><Preferences/></>
        },
    ]

    return (
        <div className="flex h-screen overflow-hidden">
        <div className="flex-grow flex flex-col border-r p-4">
            <header className="mb-4">
                <h1 className="text-2xl font-bold border-b pb-2">
                    Settings
                </h1> 
            </header>
            <div className=" flex flex-grow flex-col overflow-auto conten rounded-lg bg-white shadow p-4">
                <SettingsContextProvider>
                    <SettingsNavBar tabs={tabs} />
                    <SettingsTabController tabs={tabs}/>
                </SettingsContextProvider>
            </div>
        </div>
    </div>
    );
}
