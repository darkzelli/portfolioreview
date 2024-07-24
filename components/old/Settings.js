"use client"
import { useState } from 'react';
import styles from '../../css/settings.module.css'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';




export default function Settings(){
    const {data: session} = useSession()
    const [tab, setTab] = useState("Portfolio")
    const [tabOpen, setTabOpen] = useState(false)
    const [tabContent, setTabContent] = useState()

    function handleChange(tab){
        switch(tab){
            case "Portfolio": 
                setTab("Portfolio")
                setTabOpen(!tabOpen)
                break;
            case "Description":
                setTab("Description")
                setTabOpen(!tabOpen)
                break;
            case "Favorites":
                setTab("Favorites")
                setTabOpen(!tabOpen)
                break;
            case "Notifications":
                setTab("Notifications")
                setTabOpen(!tabOpen)
                break;
            case "What's New":
                setTab("What's New")
                setTabOpen(!tabOpen)
                break;
            case "Panel":
                setTab("Panel")
                setTabOpen(!tabOpen)
                break;
            default:
                setTab("Portfolio")
                setTabOpen(!tabOpen)
        }
    }
    return(
        <span className={styles.settingsContainer}>
            <span className={styles.Head}>Settings</span>
          <span onClick={() => setTabOpen(!tabOpen)} className={styles.selector}>{tab} <ArrowDropDownIcon/></span>
          <span className={tabOpen ? styles.dropdownMemu : styles.none}>
            <span onClick={() => handleChange("Portfolio")} className={styles.dropdownTab}>Portfolio</span>
            <span onClick={() => handleChange("Description")} className={styles.dropdownTab}>Description</span>
            <span onClick={() => handleChange("Favorites")} className={styles.dropdownTab}>Favorites</span>
            <span onClick={() => handleChange("Notifications")} className={styles.dropdownTab}>Notifications</span>
            <span onClick={() => handleChange("What's New")} className={styles.dropdownTab}>What's New</span>
            <span onClick={() => handleChange("Panel")} className={styles.dropdownTab}>Panel</span>
          </span>
          <span className={styles.tabContent}>
            <span className={styles.descLabel}>Name</span>
            <input type='email' name='email' placeholder={session ? session?.user?.name : "name"} className={styles.input}/>
            <span className={styles.descLabel}>Role</span>
            <input type='email' name='email' placeholder='role' className={styles.input}/>
            <span className={styles.descLabel}>Description</span>
            <textarea className={styles.textarea} />
            <span className={styles.descLabel}>URL</span>
            <input type='email' name='email' placeholder='url' className={styles.input}/>
            <span className={styles.descLabel}>Portfolio</span>
            <input type='email' name='email' placeholder='portfolio' className={styles.input}/>
            <span className={styles.saveSettings}>Save Settings</span>
          </span>
        </span>
    );
}