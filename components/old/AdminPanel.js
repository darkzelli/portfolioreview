"use client"
import { useEffect, useState } from 'react';
import styles from '../../css/adminpanel.module.css'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export function AdminPanel(){
    const [reports, setReports] = useState([])

    return (
        <span className={styles.adminpanel}>
            <span className={styles.reportsContainer}>
                <span className={styles.label}>Reports</span>
                <span className={styles.reports}>
                    <Accordion type="single" collapsible>
                        {reports.map((item, key) => (
                            <AccordionItem value="item-1">
                                <AccordionTrigger key={key}>{item?.subject}</AccordionTrigger>
                                <AccordionContent key={key}>

                                    <span className={styles.reportContent}>
                                        <span>{item?.report}</span>
                                        <span className={styles.date}>{item?.user}</span>
                                        <span className={styles.date}>{ new Date(item?.created_at).toDateString()}</span>
                                    </span>
                                </AccordionContent>
                            </AccordionItem>

                        ))}
                    </Accordion>
                </span>
            </span>
        </span>
    );

 }
