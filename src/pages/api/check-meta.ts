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

    try {
      const response = await fetch(normalizedUrl, {
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      
      // Meta-Tags extrahieren
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      const descriptionMatch = html.match(/<meta[^>]*name=['"]description['"][^>]*content=['"]([^'"]*)['"]/i);
      const faviconMatch = html.match(/<link[^>]*rel=['"](?:icon|shortcut icon)['"][^>]*href=['"]([^'"]*)['"]/i);
      const keywordsMatch = html.match(/<meta[^>]*name=['"]keywords['"][^>]*content=['"]([^'"]*)['"]/i);
      const ogTitleMatch = html.match(/<meta[^>]*property=['"]og:title['"][^>]*content=['"]([^'"]*)['"]/i);
      const ogDescMatch = html.match(/<meta[^>]*property=['"]og:description['"][^>]*content=['"]([^'"]*)['"]/i);

      const title = titleMatch?.[1]?.trim() || '';
      const description = descriptionMatch?.[1]?.trim() || '';
      const favicon = faviconMatch?.[1]?.trim() || '';
      const keywords = keywordsMatch?.[1]?.trim() || '';
      const ogTitle = ogTitleMatch?.[1]?.trim() || '';
      const ogDescription = ogDescMatch?.[1]?.trim() || '';

      const recommendations: string[] = [];

      // Title-Analyse
      if (title) {
        if (title.length >= 50 && title.length <= 60) {
          recommendations.push('✅ Title-Länge optimal (50-60 Zeichen)');
        } else if (title.length < 50) {
          recommendations.push('⚠️ Title zu kurz (unter 50 Zeichen)');
          recommendations.push('💡 Title erweitern für bessere SEO');
        } else {
          recommendations.push('⚠️ Title zu lang (über 60 Zeichen)');
          recommendations.push('💡 Title kürzen, wird in SERPs abgeschnitten');
        }
      } else {
        recommendations.push('❌ Kein Title-Tag gefunden');
        recommendations.push('💡 Title-Tag hinzufügen');
      }

      // Description-Analyse
      if (description) {
        if (description.length >= 150 && description.length <= 160) {
          recommendations.push('✅ Meta-Description optimal (150-160 Zeichen)');
        } else if (description.length < 150) {
          recommendations.push('⚠️ Meta-Description zu kurz');
          recommendations.push('💡 Description erweitern für bessere CTR');
        } else {
          recommendations.push('⚠️ Meta-Description zu lang');
          recommendations.push('💡 Description kürzen');
        }
      } else {
        recommendations.push('❌ Keine Meta-Description gefunden');
        recommendations.push('💡 Meta-Description hinzufügen');
      }

      // Favicon-Check
      if (favicon) {
        recommendations.push('✅ Favicon gefunden');
      } else {
        recommendations.push('❌ Kein Favicon gefunden');
        recommendations.push('💡 Favicon hinzufügen für Branding');
      }

      // Open Graph Check
      if (ogTitle && ogDescription) {
        recommendations.push('✅ Open Graph Tags vorhanden');
      } else {
        recommendations.push('⚠️ Open Graph Tags unvollständig');
        recommendations.push('💡 OG-Tags für Social Media hinzufügen');
      }

      return new Response(JSON.stringify({
        success: true,
        data: {
          url: normalizedUrl,
          meta: {
            title: {
              content: title,
              length: title.length,
              optimal: title.length >= 50 && title.length <= 60
            },
            description: {
              content: description,
              length: description.length,
              optimal: description.length >= 150 && description.length <= 160
            },
            favicon: {
              exists: !!favicon,
              url: favicon
            },
            keywords: keywords,
            openGraph: {
              title: ogTitle,
              description: ogDescription,
              complete: !!(ogTitle && ogDescription)
            }
          },
          recommendations
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (fetchError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Website nicht erreichbar oder HTML nicht parsebar',
        details: fetchError instanceof Error ? fetchError.message : 'Unbekannter Fehler'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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