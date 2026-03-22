import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.yaml' }),
	schema: z.object({
		seo: z.object({
			title: z.string(),
			description: z.string(),
		}),
		hero: z.object({
			eyebrow: z.string(),
			title: z.string(),
			intro: z.string(),
			primaryCtaLabel: z.string(),
			primaryCtaHref: z.string(),
			secondaryCtaLabel: z.string(),
			secondaryCtaHref: z.string(),
			image: z.string(),
			imageAlt: z.string(),
			highlights: z.array(
				z.object({
					label: z.string(),
					text: z.string(),
				}),
			),
		}),
		intro: z.object({
			title: z.string(),
			body: z.string(),
			details: z.array(z.string()),
		}),
		host: z.object({
			eyebrow: z.string(),
			title: z.string(),
			body: z.string(),
			image: z.string(),
			imageAlt: z.string(),
			notes: z.array(
				z.object({
					title: z.string(),
					text: z.string(),
				}),
			),
		}),
		process: z.object({
			title: z.string(),
			steps: z.array(
				z.object({
					title: z.string(),
					text: z.string(),
				}),
			),
		}),
		contact: z.object({
			title: z.string(),
			body: z.string(),
			note: z.string(),
		}),
		faq: z.object({
			title: z.string(),
			items: z.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			),
		}),
	}),
});

const settings = defineCollection({
	loader: glob({ base: './src/content/settings', pattern: '**/*.yaml' }),
	schema: z.object({
		siteName: z.string(),
		siteTagline: z.string(),
		locale: z.string(),
		domain: z.string().optional(),
		languages: z
			.array(
				z.object({
					code: z.string(),
					label: z.string(),
					name: z.string(),
				}),
			)
			.optional(),
		navigation: z.array(
			z.object({
				label: z.string(),
				href: z.string(),
			}),
		),
		contact: z.object({
			emailLabel: z.string(),
			email: z.string(),
			whatsappLabel: z.string(),
			whatsappUrl: z.string(),
			whatsappText: z.string(),
			instagramLabel: z.string(),
			instagramUrl: z.string(),
			instagramHandle: z.string(),
		}),
		footer: z.object({
			note: z.string(),
			copyright: z.string(),
		}),
		translations: z
			.record(
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
					navigation: z.array(
						z.object({
							label: z.string(),
							href: z.string(),
						}),
					),
				}),
			)
			.optional(),
	}),
});

const experiences = defineCollection({
	loader: glob({ base: './src/content/experiences', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		order: z.number(),
		duration: z.string(),
		groupSize: z.string(),
		location: z.string(),
		image: z.string(),
		imageAlt: z.string(),
		anchorLabel: z.string(),
		anchorText: z.string(),
		includes: z.array(z.string()),
		idealFor: z.array(z.string()),
	}),
});

export const collections = {
	experiences,
	pages,
	settings,
};
