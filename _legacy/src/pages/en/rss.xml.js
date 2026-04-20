import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE } from '../../consts';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter(post => post.id.startsWith('en/'));
	return rss({
		title: `${SITE_TITLE} (EN)`,
		description: 'Exploring how to create what truly matters with fewer resources.',
		site: context.site,
		items: posts.map((post) => {
			const slug = post.id.split('/')[1].replace(/\.mdx?$/, '');
			return {
				...post.data,
				link: `/en/blog/${slug}/`,
			}
		}),
	});
}
