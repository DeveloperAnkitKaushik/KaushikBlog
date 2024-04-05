"use client"

import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import styles from "./index.module.css";

const query = `*[_type == "tag"] {
    _id,
    slug,
    name,
    "imageUrl": main_image.asset->url,
  }`;

const page = async () => {
    const tags = await client.fetch(query, {}, {cache: "no-store"});
    return (
        <div className={styles.container}>
            <div className={styles.innercontainer}>
                <div className={`${styles.heading} textgradient`}>Search By Tags</div>
                <div className={styles.contentcontainer}>
                    {tags?.map((tag: any) => (
                        <Link href={`/tags/${tag.slug.current}`} className={styles.box} key={tag._id}>
                            <div className={styles.boximg} style={{ backgroundImage: `url(${tag.imageUrl})` }}></div>
                            <div className={styles.boxtitle}>{tag.name}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default page;