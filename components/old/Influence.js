import styles from '../../css/influence.module.css'
import Avatar from '@mui/joy/Avatar';


import { useRef } from 'react';
import { AnimatedBeam } from './magicui/animated-beam';
export default function Influence() {
    const containerRef = useRef();
    const pfptRef = useRef();
    const pfp2Ref = useRef();
    const pfp3Ref = useRef();
    const pfp4Ref = useRef();
    const pfp5Ref = useRef();
    const pfp6Ref = useRef();
    const pfp7Ref = useRef();
    

    const pfp = "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const pfp2 = "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const pfp3 = "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const pfp4 = "https://images.pexels.com/photos/3777570/pexels-photo-3777570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const pfp5 = "https://images.pexels.com/photos/8370868/pexels-photo-8370868.jpeg?auto=compress&cs=tinysrgb&w=600"
    const pfp6 = "https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const pfp7 = "https://images.pexels.com/photos/596156/pexels-photo-596156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    return (
        <span className={styles.influence} ref={containerRef}>
            <AnimatedBeam containerRef={containerRef} fromRef={pfptRef} toRef={pfp7Ref} pathWidth={5} pathColor='blue' curvature={-90} endYOffset={-10} delay={1} duration={10}/>
            <AnimatedBeam containerRef={containerRef} fromRef={pfp2Ref} toRef={pfp7Ref} pathWidth={5} pathColor='blue' delay={2} duration={10}/>
            <AnimatedBeam containerRef={containerRef} fromRef={pfp3Ref} toRef={pfp7Ref} pathWidth={5} pathColor='blue' curvature={90} endYOffset={10} delay={3} duration={10}/>
            <AnimatedBeam containerRef={containerRef} fromRef={pfp4Ref} toRef={pfp7Ref} pathWidth={5} pathColor='blue' curvature={-90} endYOffset={-10} delay={4} duration={10} reverse={true}/>
            <AnimatedBeam containerRef={containerRef} fromRef={pfp5Ref} toRef={pfp7Ref} pathWidth={5} pathColor='blue' delay={5} duration={10} reverse={true}/>
            <AnimatedBeam containerRef={containerRef} fromRef={pfp6Ref} toRef={pfp7Ref} pathWidth={5} pathColor='blue' curvature={90} endYOffset={10} delay={6} duration={10} reverse={true}/>
            <span className={styles.pfpGroup}>
                <span><Avatar className={styles.pfp} alt="pfp" ref={pfptRef} src={pfp}/></span>
                <span><Avatar className={styles.pfp} alt="pfp" ref={pfp2Ref} src={pfp2}/></span>
                <span><Avatar className={styles.pfp} alt="pfp" ref={pfp3Ref} src={pfp3}/></span>
            </span>
            <span className={styles.mainpfp}>
                <Avatar className={styles.pfp} alt="pfp" ref={pfp7Ref} src={pfp7} size='lg'/>
            </span>
            <span className={styles.pfpGroup1}>
                <span><Avatar className={styles.pfp} alt="pfp" ref={pfp4Ref} src={pfp4}/></span>
                <Avatar className={styles.pfp} alt="pfp" ref={pfp5Ref} src={pfp5}/>
                <Avatar className={styles.pfp} alt="pfp" ref={pfp6Ref} src={pfp6}/>
            </span>
            
        </span>
    );

 }