import styles from "./page.module.css"

const page = () => {
    return (
        <div className={styles.errorcontainer}><div className={styles.errorimgcont}><img src="/notfound.png" alt="" /></div></div>
    );
}

export default page;