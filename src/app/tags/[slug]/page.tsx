"use client"

import { Post } from "@/utils/interface";
import { client } from "../../../../sanity/lib/client";
import styles from "./index.module.css";
import { formatDate, shortenExcerpt, shortenTitle } from "@/utils/helpers";
import Link from "next/link";


async function getPostsByTag(tag: string) {
    const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
      title,
      slug,
      publishedAt,
      excerpt,
      "imageUrl": main_image.asset->url,
      tags[]-> {
        _id,
        slug,
        name
      }
    }
    `;

    const posts = await client.fetch(query);
    return posts;
}

const page = async ({ params }: any) => {
    const posts: Array<Post> = await getPostsByTag(params.slug);
    return (
        <div className={styles.container}>
            <div className="maincontainer">
                <div className={styles.innercontainer}>
                    <Link href={`/tags/${params.slug}`} className={`${styles.heading} btngradient`}>{`#${params.slug}`}</Link>
                    <div className={styles.boxoutercontainer}>
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
            </div>
        </div>
    );
}

export default page;