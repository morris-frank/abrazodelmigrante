import type { APIRoute } from 'astro';

export const prerender = true;

const siteUrl = import.meta.env.PUBLIC_SITE_URL ?? 'https://abrazodelmigrante.com';
const displayUrl = import.meta.env.PUBLIC_DISPLAY_URL ?? siteUrl;
const githubRepo = import.meta.env.PUBLIC_GITHUB_REPO ?? 'your-github-user/abrazodelmigrante';
const githubBranch = import.meta.env.PUBLIC_GITHUB_BRANCH ?? 'main';
const oauthBaseUrl = import.meta.env.PUBLIC_DECAP_OAUTH_BASE_URL ?? siteUrl;
const siteDomain = new URL(siteUrl).hostname;

const config = {
	backend: {
		name: 'github',
		repo: githubRepo,
		branch: githubBranch,
		base_url: oauthBaseUrl,
		auth_endpoint: 'api/auth',
		use_graphql: true,
		site_domain: siteDomain,
	},
	site_url: siteUrl,
	display_url: displayUrl,
	logo_url: '/favicon.svg',
	local_backend: {
		url: 'http://127.0.0.1:8081/api/v1',
	},
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
							label: 'Hero',
							name: 'hero',
							widget: 'object',
							fields: [
								{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
								{ label: 'Title', name: 'title', widget: 'string' },
								{ label: 'Intro', name: 'intro', widget: 'text' },
								{ label: 'Primary button label', name: 'primaryCtaLabel', widget: 'string' },
								{ label: 'Primary button link', name: 'primaryCtaHref', widget: 'string' },
								{ label: 'Secondary button label', name: 'secondaryCtaLabel', widget: 'string' },
								{ label: 'Secondary button link', name: 'secondaryCtaHref', widget: 'string' },
								{ label: 'Hero image', name: 'image', widget: 'image' },
								{ label: 'Hero image alt text', name: 'imageAlt', widget: 'string' },
								{
									label: 'Highlights',
									name: 'highlights',
									widget: 'list',
									fields: [
										{ label: 'Label', name: 'label', widget: 'string' },
										{ label: 'Text', name: 'text', widget: 'string' },
									],
								},
							],
						},
						{
							label: 'Intro section',
							name: 'intro',
							widget: 'object',
							fields: [
								{ label: 'Title', name: 'title', widget: 'string' },
								{ label: 'Body', name: 'body', widget: 'text' },
								{
									label: 'Detail bullets',
									name: 'details',
									widget: 'list',
									field: { label: 'Detail', name: 'detail', widget: 'string' },
								},
							],
						},
						{
							label: 'About section',
							name: 'host',
							widget: 'object',
							fields: [
								{ label: 'Eyebrow', name: 'eyebrow', widget: 'string' },
								{ label: 'Title', name: 'title', widget: 'string' },
								{ label: 'Body', name: 'body', widget: 'text' },
								{ label: 'Image', name: 'image', widget: 'image' },
								{ label: 'Image alt text', name: 'imageAlt', widget: 'string' },
								{
									label: 'Notes',
									name: 'notes',
									widget: 'list',
									fields: [
										{ label: 'Title', name: 'title', widget: 'string' },
										{ label: 'Text', name: 'text', widget: 'text' },
									],
								},
							],
						},
						{
							label: 'Process section',
							name: 'process',
							widget: 'object',
							fields: [
								{ label: 'Title', name: 'title', widget: 'string' },
								{
									label: 'Steps',
									name: 'steps',
									widget: 'list',
									fields: [
										{ label: 'Title', name: 'title', widget: 'string' },
										{ label: 'Text', name: 'text', widget: 'text' },
									],
								},
							],
						},
						{
							label: 'Contact section',
							name: 'contact',
							widget: 'object',
							fields: [
								{ label: 'Title', name: 'title', widget: 'string' },
								{ label: 'Body', name: 'body', widget: 'text' },
								{ label: 'Note', name: 'note', widget: 'text' },
							],
						},
						{
							label: 'FAQ section',
							name: 'faq',
							widget: 'object',
							fields: [
								{ label: 'Title', name: 'title', widget: 'string' },
								{
									label: 'Items',
									name: 'items',
									widget: 'list',
									fields: [
										{ label: 'Question', name: 'question', widget: 'string' },
										{ label: 'Answer', name: 'answer', widget: 'text' },
									],
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
						{ label: 'Site tagline', name: 'siteTagline', widget: 'string' },
						{ label: 'Locale', name: 'locale', widget: 'string' },
						{
							label: 'Navigation',
							name: 'navigation',
							widget: 'list',
							fields: [
								{ label: 'Label', name: 'label', widget: 'string' },
								{ label: 'Link', name: 'href', widget: 'string' },
							],
						},
						{
							label: 'Contact details',
							name: 'contact',
							widget: 'object',
							fields: [
								{ label: 'Email label', name: 'emailLabel', widget: 'string' },
								{ label: 'Email', name: 'email', widget: 'string' },
								{ label: 'WhatsApp label', name: 'whatsappLabel', widget: 'string' },
								{ label: 'WhatsApp URL', name: 'whatsappUrl', widget: 'string' },
								{ label: 'WhatsApp button text', name: 'whatsappText', widget: 'string' },
								{ label: 'Instagram label', name: 'instagramLabel', widget: 'string' },
								{ label: 'Instagram URL', name: 'instagramUrl', widget: 'string' },
								{ label: 'Instagram handle', name: 'instagramHandle', widget: 'string' },
							],
						},
						{
							label: 'Footer',
							name: 'footer',
							widget: 'object',
							fields: [
								{ label: 'Footer note', name: 'note', widget: 'text' },
								{ label: 'Copyright', name: 'copyright', widget: 'string' },
							],
						},
					],
				},
			],
		},
		{
			name: 'experiences',
			label: 'Experiences',
			label_singular: 'Experience',
			folder: 'src/content/experiences',
			create: true,
			slug: '{{slug}}',
			extension: 'md',
			format: 'frontmatter',
			summary: '{{fields.order}} · {{fields.title}}',
			fields: [
				{ label: 'Title', name: 'title', widget: 'string' },
				{ label: 'Summary', name: 'summary', widget: 'text' },
				{ label: 'Display order', name: 'order', widget: 'number', value_type: 'int', min: 1 },
				{ label: 'Duration', name: 'duration', widget: 'string' },
				{ label: 'Group size', name: 'groupSize', widget: 'string' },
				{ label: 'Location', name: 'location', widget: 'string' },
				{ label: 'Image', name: 'image', widget: 'image' },
				{ label: 'Image alt text', name: 'imageAlt', widget: 'string' },
				{ label: 'Card label', name: 'anchorLabel', widget: 'string' },
				{ label: 'Card support text', name: 'anchorText', widget: 'text' },
				{
					label: 'What is included',
					name: 'includes',
					widget: 'list',
					field: { label: 'Included item', name: 'includedItem', widget: 'string' },
				},
				{
					label: 'Ideal for',
					name: 'idealFor',
					widget: 'list',
					field: { label: 'Ideal guest', name: 'idealGuest', widget: 'string' },
				},
				{ label: 'Full description', name: 'body', widget: 'markdown' },
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
