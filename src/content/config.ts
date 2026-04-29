import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.enum(['Market data', 'Regulatory', 'Methodology']),
    date: z.coerce.date(),
    readTime: z.string(), // e.g. "7 min read"
    featured: z.boolean().default(false),
    author: z.string().default('AestheticIQ'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights };
