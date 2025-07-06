import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'URL ist erforderlich' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    const baseUrl = new URL(normalizedUrl).origin;

    const checks = await Promise.allSettled([
      // robots.txt prüfen
      fetch(`${baseUrl}/robots.txt`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      }),
      // sitemap.xml prüfen
      fetch(`${baseUrl}/sitemap.xml`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      }),
      // Alternative sitemap-Pfade
      fetch(`${baseUrl}/sitemap_index.xml`, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      })
    ]);

    const robotsResult = checks[0];
    const sitemapResult = checks[1];
    const sitemapIndexResult = checks[2];

    const robotsExists = robotsResult.status === 'fulfilled' && robotsResult.value.ok;
    const sitemapExists = (sitemapResult.status === 'fulfilled' && sitemapResult.value.ok) ||
                         (sitemapIndexResult.status === 'fulfilled' && sitemapIndexResult.value.ok);

    const recommendations: string[] = [];
    
    if (robotsExists) {
      recommendations.push('✅ robots.txt gefunden');
    } else {
      recommendations.push('❌ robots.txt nicht gefunden');
      recommendations.push('💡 robots.txt erstellen und hochladen');
    }

    if (sitemapExists) {
      recommendations.push('✅ Sitemap gefunden');
    } else {
      recommendations.push('❌ Sitemap nicht gefunden');
      recommendations.push('💡 sitemap.xml erstellen und hochladen');
      recommendations.push('💡 Sitemap in Search Console einreichen');
    }

    return new Response(JSON.stringify({
      success: true,
      data: {
        baseUrl,
        robots: {
          exists: robotsExists,
          url: `${baseUrl}/robots.txt`
        },
        sitemap: {
          exists: sitemapExists,
          checkedUrls: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/sitemap_index.xml`
          ]
        },
        recommendations
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Server Fehler',
      details: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}; 