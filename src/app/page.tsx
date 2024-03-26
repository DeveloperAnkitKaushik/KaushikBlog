"use client"

import styles from "./page.module.css";
import { client } from "../../sanity/lib/client";
import DisplayBlog from "@/components/DisplayBlog/DisplayBlog";
import Link from "next/link";
import TagsDisplay from "../components/TagsDisplay/TagsDisplay";

const query = `*[_type == "post"] | order(publishedAt desc) [0] {
    title,
    slug,
    publishedAt,
    excerpt,
    "imageUrl": main_image.asset->url,
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    tags[]-> {
      _id,
      slug,
      name
    }
  }`;

const Home = async () => {
    const latestPost = await client.fetch(query);
    return (
        <>
            <div className={styles.heroimg}></div>
            <div className={styles.container}>
                <div className="maincontainer">
                    <div className={styles.innercontainer}>
                        <div className={`${styles.heading} textgradient`}>My Latest Post</div>
                        <Link href={`/posts/${latestPost.slug.current}`} className={styles.postcontainer}>
                            <div className={styles.postimg} style={{ backgroundImage: `url(${latestPost.imageUrl})` }}></div>
                            <div className={styles.postcontentcontainer}>
                                <div className={styles.postcontentheading}>{latestPost.title}</div>
                                <div className={styles.postcontentdesc}>{latestPost.excerpt}</div>
                                <div className={styles.postcontentbtns}>
                                    {latestPost?.tags?.map((tag: any) => (
                                        <div key={tag._id} className={`btngradient ${styles.postcontentbtn}`}>
                                            #{tag.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        <TagsDisplay />
                        <DisplayBlog />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;