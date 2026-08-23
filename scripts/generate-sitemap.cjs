const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

const domain = 'https://abhishekkumaryadav.in';

const staticRoutes = [
  '/',
  '/about',
  '/projects',
  '/cv',
  '/terminal',
  '/java-interview-question-answers',
  '/devtools',
  '/base64-tool',
  '/bitwise-visualizer',
  '/hash-generator',
  '/json-formatter',
  '/jwt-decoder',
  '/qr-generator',
  '/qr-scanner',
  '/code-complexity-analyzer',
  '/json-diff',
  '/regex-tester',
  '/git-cheatsheet',
  '/system-design',
  '/resources',
  '/skills',
  '/books',
  '/links',
  '/roadmap-for-product-based-company',
  '/clock',
  '/x',
];

const sitemap = new SitemapStream({ hostname: domain });

async function generate() {
  const filePath = path.resolve(__dirname, '../public/sitemap.xml');
  const writeStream = createWriteStream(filePath);

  streamToPromise(sitemap).then((sm) => {
    writeStream.write(sm.toString());
    console.log(`✅ Sitemap generated at ${filePath}`);
  });

  for (const route of staticRoutes) {
    sitemap.write({
      url: route,
      changefreq: 'monthly',
      priority: route === '/' ? 1.0 : 0.8,
      lastmod: new Date().toISOString(),
    });
  }

  sitemap.end();
}

generate().catch((err) => {
  console.error('❌ Failed to generate sitemap:', err);
});
