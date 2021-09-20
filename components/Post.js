import Link from 'next/link'
import Image from 'next/image'

export default function Post({ post }) {
  return (
    <div className="card">
      <Image
        src={post.frontMatter.cover_image}
        alt={post.frontMatter.title}
        width="100%"
        height="100%"
        layout="responsive"
        objectFit="contain"
      />

      <div className="post-date">
        Posted on {post.frontMatter.date}
      </div>

      <h3>{post.frontMatter.title}</h3>

      <p>{post.frontMatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a className="btn">Read more</a>
      </Link>
    </div>
  )
}