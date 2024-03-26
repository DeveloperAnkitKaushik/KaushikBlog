"use client"

import styles from "./index.module.css";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { Post } from "@/utils/interface";
import { formatDate, shortenExcerpt, shortenTitle } from "@/utils/helpers";

async function getPosts() {
    const query = `
    *[_type=='post'] {
        _id,
        title,
        slug,
        "imageUrl": main_image.asset->url,
        publishedAt,
        excerpt,
        tags[]->{
            _id,
            slug,
            name,
        }
      }
    `;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    const data = await client.fetch(query);
    return data;
}

const page = async () => {
    const posts = await getPosts();
    return (
        <div className={styles.container}>
            <div className={`${styles.heading} textgradient`}>All Blogs</div>
            <div className={styles.innercontainer}>
                {posts.map((post: Post) => (
                    <Link href={`/posts/${post.slug.current}`} className={styles.box} key={post._id}>
                        <div className={styles.imgcontainer} style={{ backgroundImage: `url(${post.imageUrl})` }}></div>
                        <div className={styles.innerbox}>
                            <h3>{formatDate(post.publishedAt)}</h3>
                            <h1>{shortenTitle(post.title)}</h1>
                            <p>{shortenExcerpt(post.excerpt)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default page;