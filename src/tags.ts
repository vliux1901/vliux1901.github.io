// Keep one spelling per topic; the content schema catches unknown tags.
export const BLOG_TAGS = ['FAS 6004', 'Reviews', '10m Air Pistol', 'Maintenance', 'O-Rings', 'Trigger'] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export const TAG_DESCRIPTIONS: Record<BlogTag, string> = {
	'FAS 6004': 'My FAS 6004 ownership notes, from shooting impressions and chronograph results to seal wear and maintenance.',
	Reviews: 'Firsthand airgun reviews, with shooting impressions, original photos, and measured results where available.',
	'10m Air Pistol': 'Notes on air pistols for 10-meter target shooting, including grip comfort, sight pictures, and shooting experience.',
	Maintenance: 'Airgun maintenance experiences, wear observations, and parts references from looking after my own pistols.',
	'O-Rings': 'Airgun O-ring dimensions, replacement sources, and observations about seal wear and fit.',
	'Trigger': 'Airgun trigger',
};

export function tagSlug(tag: BlogTag): string {
	return tag.toLowerCase().replaceAll(' ', '-');
}

export function tagPath(tag: BlogTag): string {
	return `/tags/${tagSlug(tag)}/`;
}
