import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'

export default function PostPage({ frontMatter, slug, content }) {
  const { title, date, cover_image } = frontMatter
  const markedContent = marked(content)

  return (
    <>
      <Link href="/" passHref>
        <a className="btn btn-back">Go Back</a>
      </Link>

      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <Image
          src={cover_image}
          alt=""
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: markedContent }}></div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: { slug: filename.replace('.md', '') }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontMatter,
      slug,
      content
    }
  }
}
