import styles from '../../css/waitlist.module.css'
import { Waitlist } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className={styles.container}>
      <Waitlist />
    </div>
  );

}
