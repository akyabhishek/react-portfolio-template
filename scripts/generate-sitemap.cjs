const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

const domain = 'https://abhishekkumaryadav.in';

const staticRoutes = [
  '/',
  '/terminal',
  '/t',
  '/home',
  '/about',
  '/stats',
  '/resume',
  '/java-interview-question-answers',
  '/base64-tool',
  '/bitwise-visualizer',
  '/hash-generator',
  '/devtools',
  '/json-formatter',
  '/jwt-decoder',
  '/qr-generator',
  '/qr-scanner',
  '/code-complexity-analyzer',
  '/json-diff',
  '/regex-tester',
  '/topup',
  '/git-cheatsheet',
  '/system-design',
  '/cv',
  '/links',
  '/roadmap-for-product-based-company',
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
