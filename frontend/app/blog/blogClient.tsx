'use client'
// import {carouselSlidesQuery} from '@/sanity/lib/queries'
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard/BlogCard';
import Pagination from '../components/Pagination/Pagination';

type categoryQueryItem = {
    CategoryName: string;
}

type PostQueryItem = {
  title: string
  slug: { current: string }
  excerpt: string
  coverImage?: {
    asset?: {
      _ref?: string
    }
    hotspot?: {
      x: number
      y: number
      width: number
      height: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
    alt?: string
  } | null
}

type BlogPostsResponse = {
        posts: PostQueryItem[]
        totalCount: number
}

export default function BlogClient({categories}: {categories: categoryQueryItem[] | null}) {
    // const searchParams = useSearchParams();
    // const currentPage = parseInt(searchParams?.get('page') || '1', 10);

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [posts, setPosts] = useState<PostQueryItem[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const catOptions = Array.isArray(categories) ? (categories as categoryQueryItem[]) : [];
    const postLimit = 9;

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const categoryParam = encodeURIComponent(selectedCategory);
                const response = await fetch(`/api/blogPosts?category=${categoryParam}&limit=${postLimit}&page=${currentPage}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }

                const postsData = (await response.json()) as BlogPostsResponse;
                setPosts(postsData.posts);
                setTotalCount(postsData.totalCount);
            } catch (error) {
                console.error(error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    // }, [selectedCategory, currentPage])
    }, [selectedCategory, currentPage])

    return (
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold ">Blog Home</h1>
                    <p className="mt-4 text-md">{`Welcome to my blog! Here you'll find the latest posts and updates.`}</p>
                    <div className="my-8 flex items-center justify-center gap-2">
                        <label htmlFor="category" className="text-sm font-medium text-gray-700">Filter by Category:</label>
                        <select onChange={(e) => setSelectedCategory(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2" value={selectedCategory}>
                            <option value="all">All</option>
                            {catOptions.map((category: categoryQueryItem, index: number) => (
                                <option key={index} value={category.CategoryName}>{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>

                    {loading ? (
                        <p className="text-gray-600">Loading posts...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-gray-600">No posts found.</p>
                    ) : (
                        <>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
                                {posts.map((post: PostQueryItem) => (
                                    <BlogCard
                                        key={post.slug.current}
                                        title={post.title}
                                        slug={post.slug.current}
                                        excerpt={post.excerpt}
                                        coverImage={post.coverImage}
                                    />
                                ))}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(totalCount / postLimit)}
                                onPageChange={(page: number) => {
                                    setCurrentPage(page);
                                    console.log(`Change to page: ${page}`);
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
}