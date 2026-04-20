import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter(post => post.id.startsWith('pt/'));
	return rss({
		title: `${SITE_TITLE} (PT)`,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const slug = post.id.split('/')[1].replace(/\.mdx?$/, '');
			return {
				...post.data,
				link: `/pt/blog/${slug}/`,
			}
		}),
	});
}
