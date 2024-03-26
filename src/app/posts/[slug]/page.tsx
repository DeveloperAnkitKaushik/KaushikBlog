import { Post } from "@/utils/interface";
import { client } from "../../../../sanity/lib/client";
import styles from "./index.module.css";
import Link from "next/link";
import { formatDate, slugify } from "@/utils/helpers";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "../../../../sanity/lib/image";
import Head from "next/head";

interface Params {
    params: {
        slug: string;
    };
}

async function getPost(slug: string) {
    const query = `
        *[_type == "post" && slug.current == "${slug}"][0] {
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
        }
    `;

    const post = await client.fetch(query);
    return post;
}

const myPortableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <Image
                src={urlForImage(value)}
                alt="Post"
                width={400}
                height={400}
                className={styles.bodyimg}
            />
        ),
    },
    block: {
        h2: ({ value }: any) => (
            <h2
                id={slugify(value.children[0].text)}
                className={styles.body_headings}
            >
                {value.children[0].text}
            </h2>
        ),
        h3: ({ value }: any) => (
            <h3
                id={slugify(value.children[0].text)}
                className={styles.body_headings}
            >
                {value.children[0].text}
            </h3>
        ),
        h4: ({ value }: any) => (
            <h4
                id={slugify(value.children[0].text)}
                className={styles.body_headings}
            >
                {value.children[0].text}
            </h4>
        ),
        h5: ({ value }: any) => (
            <h5
                id={slugify(value.children[0].text)}
                className={styles.body_headings}
            >
                {value.children[0].text}
            </h5>
        ),
        h6: ({ value }: any) => (
            <h6
                id={slugify(value.children[0].text)}
                className={styles.body_headings}
            >
                {value.children[0].text}
            </h6>
        ),
    },
};

const page = async ({ params }: Params) => {
    const post: Post = await getPost(params?.slug);
    return (
        <div className={styles.container}>
            <div className="maincontainer">
                <div className={styles.innercontainer}>
                    <div className={`${styles.heading} textgradient`}>{post.title}</div>
                    <div className={styles.time}>{formatDate(post.publishedAt)} - <span>By Ankit Kauhsik</span></div>
                    {post?.tags?.map((tag) => (
                        <Link key={tag?._id} href={`/tags/${tag.slug.current}`} className="btngradient">
                            #{tag.name}
                        </Link>
                    ))}
                    <div className={styles.imagecontainer}><img src={post.imageUrl} alt="" /></div>
                    <div className={styles.body}>
                        <PortableText
                            value={post?.body}
                            components={myPortableTextComponents}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;