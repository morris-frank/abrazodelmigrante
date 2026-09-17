import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const navigationItemSchema = z.object({
	label: z.string(),
	href: z.string(),
});

const languageSchema = z.object({
	code: z.string(),
	label: z.string(),
	name: z.string(),
});

const homeLocaleSchema = z.object({
	hero: z.object({
		eyebrow: z.string(),
		title: z.string(),
		intro: z.string(),
		primaryCtaLabel: z.string(),
		secondaryCtaLabel: z.string(),
		noteTitle: z.string(),
		noteBody: z.string(),
		highlights: z.array(
			z.object({
				label: z.string(),
				text: z.string(),
			}),
		),
	}),
	philosophy: z.object({
		eyebrow: z.string(),
		title: z.string(),
		paragraphs: z.array(z.string()),
		quote: z.string(),
		caption: z.string(),
	}),
	experience: z.object({
		eyebrow: z.string(),
		title: z.string(),
		intro: z.string(),
		items: z.array(z.string()),
		asideTitle: z.string(),
		audience: z.array(
			z.object({
				title: z.string(),
				text: z.string(),
			}),
		),
		note: z.string(),
	}),
	format: z.object({
		eyebrow: z.string(),
		title: z.string(),
		items: z.array(z.string()),
		caption: z.string(),
	}),
	proposal: z.object({
		eyebrow: z.string(),
		title: z.string(),
		items: z.array(z.string()),
		closing: z.string(),
	}),
	faq: z.object({
		eyebrow: z.string(),
		title: z.string(),
		items: z.array(
			z.object({
				question: z.string(),
				answer: z.string(),
			}),
		),
	}),
	contact: z.object({
		eyebrow: z.string(),
		title: z.string(),
		body: z.string(),
		note: z.string(),
		emailCta: z.string(),
		whatsappCta: z.string(),
		instagramCta: z.string(),
	}),
});

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.yaml' }),
	schema: z.object({
		seo: z.object({
			title: z.string(),
			description: z.string(),
		}),
		media: z.object({
			heroImage: z.string(),
			heroImageAlt: z.string(),
			philosophyImage: z.string(),
			philosophyImageAlt: z.string(),
			experienceImage: z.string(),
			experienceImageAlt: z.string(),
		}),
		translations: z.record(z.string(), homeLocaleSchema),
	}),
});

const settings = defineCollection({
	loader: glob({ base: './src/content/settings', pattern: '**/*.yaml' }),
	schema: z.object({
		siteName: z.string(),
		locale: z.string(),
		domain: z.string().optional(),
		languages: z.array(languageSchema),
		contact: z.object({
			email: z.string(),
			whatsappUrl: z.string(),
			whatsappText: z.string(),
			instagramUrl: z.string(),
			instagramHandle: z.string(),
		}),
		translations: z.record(
			z.string(),
			z.object({
				siteTagline: z.string(),
				headerCtaLabel: z.string(),
				footerContactLabel: z.string(),
				emailLabel: z.string(),
				whatsappLabel: z.string(),
				instagramLabel: z.string(),
				footerNote: z.string(),
				copyright: z.string(),
				navigation: z.array(navigationItemSchema),
			}),
		),
	}),
});

export const collections = {
	pages,
	settings,
};
