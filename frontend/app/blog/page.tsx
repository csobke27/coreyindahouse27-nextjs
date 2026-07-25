import BlogClient from './blogClient';
import { sanityFetch } from '@/sanity/lib/live';
type categoryQueryItem = {
    CategoryName: string;
}
export default async function BlogPage() {
    const {data: categories} = await sanityFetch({
        query: `*[_type == "category"]{CategoryName}`,
    })
    return <BlogClient categories={categories as categoryQueryItem[]} />;
}