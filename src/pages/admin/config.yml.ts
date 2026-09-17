import type { APIRoute } from 'astro';

export const prerender = true;

const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://abrazodelmigrante.com';
const displayUrl = import.meta.env.PUBLIC_DISPLAY_URL ?? siteUrl;
const githubRepo = import.meta.env.PUBLIC_GITHUB_REPO ?? 'your-github-user/abrazodelmigrante';
const githubBranch = import.meta.env.PUBLIC_GITHUB_BRANCH ?? 'main';
const oauthBaseUrl = import.meta.env.PUBLIC_DECAP_OAUTH_BASE_URL ?? siteUrl;

const navigationFields = [
	{ label: 'Label', name: 'label', widget: 'string' },
	{ label: 'Link', name: 'href', widget: 'string' },
];

const languageFields = [
	{ label: 'Code', name: 'code', widget: 'string' },
	{ label: 'Short label', name: 'label', widget: 'string' },
	{ label: 'Language name', name: 'name', widget: 'string' },
];

const highlightFields = [
	{ label: 'Label', name: 'label', widget: 'string' },
	{ label: 'Text', name: 'text', widget: 'string' },
];

const audienceFields = [
	{ label: 'Title', name: 'title', widget: 'string' },
	{ label: 'Text', name: 'text', widget: 'text' },
];

const faqFields = [
	{ label: 'Question', name: 'question', widget: 'string' },
	{ label: 'Answer', name: 'answer', widget: 'text' },
];

const homepageTranslationFields = [
	{
		label: 'Hero',
		name: 'hero',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Intro', name: 'intro', widget: 'text' },
			{ label: 'Primary CTA label', name: 'primaryCtaLabel', widget: 'string' },
			{ label: 'Secondary CTA label', name: 'secondaryCtaLabel', widget: 'string' },
			{ label: 'Floating note title', name: 'noteTitle', widget: 'string' },
			{ label: 'Floating note body', name: 'noteBody', widget: 'text' },
			{
				label: 'Highlights',
				name: 'highlights',
				widget: 'list',
				fields: highlightFields,
			},
		],
	},
	{
		label: 'Philosophy section',
		name: 'philosophy',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{
				label: 'Paragraphs',
				name: 'paragraphs',
				widget: 'list',
				field: { label: 'Paragraph', name: 'paragraph', widget: 'text' },
			},
			{ label: 'Quote', name: 'quote', widget: 'text' },
			{ label: 'Image caption', name: 'caption', widget: 'text' },
		],
	},
	{
		label: 'Experience section',
		name: 'experience',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Intro', name: 'intro', widget: 'text' },
			{
				label: 'Items',
				name: 'items',
				widget: 'list',
				field: { label: 'Item', name: 'item', widget: 'text' },
			},
			{ label: 'Audience card title', name: 'asideTitle', widget: 'string' },
			{
				label: 'Audience groups',
				name: 'audience',
				widget: 'list',
				fields: audienceFields,
			},
			{ label: 'Audience note', name: 'note', widget: 'text' },
		],
	},
	{
		label: 'Format section',
		name: 'format',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{
				label: 'Format items',
				name: 'items',
				widget: 'list',
				field: { label: 'Item', name: 'item', widget: 'text' },
			},
			{ label: 'Aside caption', name: 'caption', widget: 'text' },
		],
	},
	{
		label: 'Proposal section',
		name: 'proposal',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{
				label: 'Proposal items',
				name: 'items',
				widget: 'list',
				field: { label: 'Item', name: 'item', widget: 'text' },
			},
			{ label: 'Closing line', name: 'closing', widget: 'text' },
		],
	},
	{
		label: 'FAQ section',
		name: 'faq',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{
				label: 'Items',
				name: 'items',
				widget: 'list',
				fields: faqFields,
			},
		],
	},
	{
		label: 'Contact section',
		name: 'contact',
		widget: 'object',
		fields: [
			{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
			{ label: 'Title', name: 'title', widget: 'string' },
			{ label: 'Body', name: 'body', widget: 'text' },
			{ label: 'Note', name: 'note', widget: 'text' },
			{ label: 'Email CTA label', name: 'emailCta', widget: 'string' },
			{ label: 'WhatsApp CTA label', name: 'whatsappCta', widget: 'string' },
			{ label: 'Instagram CTA label', name: 'instagramCta', widget: 'string' },
		],
	},
];

const siteTranslationFields = [
	{ label: 'Site tagline', name: 'siteTagline', widget: 'string' },
	{ label: 'Header CTA label', name: 'headerCtaLabel', widget: 'string' },
	{ label: 'Footer contact label', name: 'footerContactLabel', widget: 'string' },
	{ label: 'Email label', name: 'emailLabel', widget: 'string' },
	{ label: 'WhatsApp label', name: 'whatsappLabel', widget: 'string' },
	{ label: 'Instagram label', name: 'instagramLabel', widget: 'string' },
	{ label: 'Footer note', name: 'footerNote', widget: 'text' },
	{ label: 'Copyright', name: 'copyright', widget: 'string' },
	{
		label: 'Navigation',
		name: 'navigation',
		widget: 'list',
		fields: navigationFields,
	},
];

const config = {
	backend: {
		name: 'github',
		repo: githubRepo,
		branch: githubBranch,
		base_url: oauthBaseUrl,
		auth_endpoint: 'api/auth',
	},
	site_url: siteUrl,
	display_url: displayUrl,
	logo_url: '/favicon.svg',
	media_folder: 'public/images/uploads',
	public_folder: '/images/uploads',
	slug: {
		encoding: 'ascii',
		clean_accents: true,
	},
	collections: [
		{
			name: 'pages',
			label: 'Pages',
			files: [
				{
					label: 'Homepage',
					name: 'home',
					file: 'src/content/pages/home.yaml',
					format: 'yaml',
					fields: [
						{
							label: 'SEO',
							name: 'seo',
							widget: 'object',
							fields: [
								{ label: 'Meta title', name: 'title', widget: 'string' },
								{ label: 'Meta description', name: 'description', widget: 'text' },
							],
						},
						{
							label: 'Media',
							name: 'media',
							widget: 'object',
							fields: [
								{ label: 'Hero image', name: 'heroImage', widget: 'image' },
								{ label: 'Hero image alt text', name: 'heroImageAlt', widget: 'string' },
								{ label: 'Philosophy image', name: 'philosophyImage', widget: 'image' },
								{ label: 'Philosophy image alt text', name: 'philosophyImageAlt', widget: 'string' },
								{ label: 'Experience image', name: 'experienceImage', widget: 'image' },
								{ label: 'Experience image alt text', name: 'experienceImageAlt', widget: 'string' },
							],
						},
						{
							label: 'Translations',
							name: 'translations',
							widget: 'object',
							fields: [
								{
									label: 'Spanish content',
									name: 'es',
									widget: 'object',
									fields: homepageTranslationFields,
								},
								{
									label: 'English content',
									name: 'en',
									widget: 'object',
									fields: homepageTranslationFields,
								},
								{
									label: 'German content',
									name: 'de',
									widget: 'object',
									fields: homepageTranslationFields,
								},
							],
						},
					],
				},
			],
		},
		{
			name: 'siteSettings',
			label: 'Site Settings',
			files: [
				{
					label: 'Global settings',
					name: 'site',
					file: 'src/content/settings/site.yaml',
					format: 'yaml',
					fields: [
						{ label: 'Site name', name: 'siteName', widget: 'string' },
						{ label: 'Default locale', name: 'locale', widget: 'string' },
						{ label: 'Domain', name: 'domain', widget: 'string', required: false },
						{
							label: 'Languages',
							name: 'languages',
							widget: 'list',
							fields: languageFields,
						},
						{
							label: 'Contact details',
							name: 'contact',
							widget: 'object',
							fields: [
								{ label: 'Email', name: 'email', widget: 'string' },
								{ label: 'WhatsApp URL', name: 'whatsappUrl', widget: 'string' },
								{ label: 'WhatsApp text', name: 'whatsappText', widget: 'string' },
								{ label: 'Instagram URL', name: 'instagramUrl', widget: 'string' },
								{ label: 'Instagram handle', name: 'instagramHandle', widget: 'string' },
							],
						},
						{
							label: 'Translations',
							name: 'translations',
							widget: 'object',
							fields: [
								{
									label: 'Spanish site copy',
									name: 'es',
									widget: 'object',
									fields: siteTranslationFields,
								},
								{
									label: 'English site copy',
									name: 'en',
									widget: 'object',
									fields: siteTranslationFields,
								},
								{
									label: 'German site copy',
									name: 'de',
									widget: 'object',
									fields: siteTranslationFields,
								},
							],
						},
					],
				},
			],
		},
	],
};

export const GET: APIRoute = () =>
	new Response(JSON.stringify(config, null, 2), {
		headers: {
			'Content-Type': 'text/yaml; charset=utf-8',
		},
	});
