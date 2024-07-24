import { useState } from 'react';
import styles from '../../css/suggestions.module.css'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



export default function Suggestions(props) {

    return (
        <span className={styles.Suggestions}>
            <span className={styles.details}> 
                <span>{props.content?.user} </span>
                <span>{props.content?.upvotes ?? 0} <ArrowDropUpIcon/></span>
                <span>{props.content?.downvotes ?? 0}<ArrowDropDownIcon/></span>
            </span>
            <span>{props.content.suggestion}</span>
        </span>
    );

 }