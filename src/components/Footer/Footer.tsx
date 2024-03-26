import Link from "next/link";
import styles from "./index.module.css";

const page = () => {
    return(
        <div className={styles.container}>
            <div className="maincontainer">
                <div className={styles.innercontainer}>
                    <div className={styles.heading}>Made with 💖 by <Link href="" className={styles.link}>Ankit Kaushik</Link></div>
                </div>
            </div>
        </div>
    );
}

export default page;