import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import { sortByDate } from '../utils'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>

      <div className="posts">
        {posts.map((post, index) =>
          <Post post={post} key={index} />
        )}
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(join('posts'))

  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const filePath = join('posts', filename)
    const markdownWithMeta = fs.readFileSync(filePath, 'utf-8')

    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      slug,
      frontMatter
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  }
}