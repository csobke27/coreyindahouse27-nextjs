import {NextResponse} from 'next/server'
import {sanityFetch} from '@/sanity/lib/live'

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const category = (searchParams.get('category') || 'all').trim()
  const limit = parseInt(searchParams.get('limit') || '1', 10)
  const page = parseInt(searchParams.get('page') || '1', 10)

  const postsQuery =
    category === 'all'
      ? '*[_type == "post"]{title, excerpt, slug, coverImage, date, "author": author->{name}} | order(date desc, _createdAt desc)[$offset...$offset + $limit]'
      : '*[_type == "post" && $category in categories[]->CategoryName]{title, excerpt, slug, coverImage, date, "author": author->{name}} | order(date desc, _createdAt desc)[$offset...$offset + $limit]'

  const countQuery =
    category === 'all'
      ? 'count(*[_type == "post"])'
      : 'count(*[_type == "post" && $category in categories[]->CategoryName])'

  try {
    const [{data: posts}, {data: totalCount}] = await Promise.all([
      sanityFetch({query: postsQuery, params: category === 'all' ? {limit, offset: (page - 1) * limit} : {category, limit, offset: (page - 1) * limit}}),
      sanityFetch({query: countQuery, params: category === 'all' ? undefined : {category}}),
    ])

    return NextResponse.json({posts, totalCount})
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: 'Failed to fetch blog posts'}, {status: 500})
  }
}
