import { getCollection } from 'astro:content';

// Use this query for routes, listings, and feeds so drafts stay local to dev.
export async function getBlogPosts() {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	// Sort newest first using the later of the publication and optional update dates.
	return posts.sort(
		(a, b) => Math.max(b.data.pubDate.valueOf(), (b.data.updatedDate ?? b.data.pubDate).valueOf())
			- Math.max(a.data.pubDate.valueOf(), (a.data.updatedDate ?? a.data.pubDate).valueOf()),
	);
}
