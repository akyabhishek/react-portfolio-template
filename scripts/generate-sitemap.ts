import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import path from 'path';

const domain = 'https://akyabhishek.vercel.app';

const staticRoutes = [
  '/',
  '/stats',
  '/contact',
  '/resume',
  '/java-interview-question-answers',
  '/base64-tool',
  '/bitwise-visualizer',
  '/hash-generator',
];

const sitemap = new SitemapStream({ hostname: domain });

async function generate() {
  const writeStream = createWriteStream(path.resolve(__dirname, '../public/sitemap.xml'));

  streamToPromise(sitemap).then((sm) => {
    writeStream.write(sm.toString());
    console.log('✅ Sitemap generated at public/sitemap.xml');
  });

  for (const path of staticRoutes) {
    sitemap.write({
      url: path,
      changefreq: 'monthly',
      priority: path === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    });
  }

  sitemap.end();
}

generate().catch((err) => {
  console.error('❌ Failed to generate sitemap:', err);
});
