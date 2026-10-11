import { getCollection } from 'astro:content';

// Use this query for routes, listings, and feeds so drafts stay local to dev.
export function getBlogPosts() {
	return getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
}
