import styles from '../../css/gallerycard.module.css'

import NotesIcon from '@mui/icons-material/Notes';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function GalleryCard({content}) {
    return (
        <span className={styles.GalleryCard}>
            <span className={styles.thumbnail}></span>
            <span className={styles.details}>
                <span className={styles.user}>
                    <span className={styles.detail}>{content?.name}</span>
                    <span className={styles.detail}><FiberManualRecordIcon fontSize='inherit'/></span>
                    <span className={styles.detail}>{content?.role}</span>
                </span>
                <span className={styles.info}>
                    <span className={styles.detail}><NotesIcon fontSize='inherit'/></span>
                    <span className={styles.detail}>40</span>
                </span>
            </span>
    
        </span>
    );

 }