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

    // Normalisiere URL
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(normalizedUrl);

    try {
      // Prüfe HTTPS
      const response = await fetch(urlObj.toString(), {
        method: 'HEAD',
        signal: AbortSignal.timeout(10000) // 10 Sekunden Timeout
      });

      const isHttps = urlObj.protocol === 'https:';
      const isAccessible = response.ok;
      const certificate = response.headers.get('strict-transport-security') ? 'HSTS enabled' : 'Basic SSL';

      return new Response(JSON.stringify({
        success: true,
        data: {
          url: urlObj.toString(),
          https: isHttps,
          accessible: isAccessible,
          certificate: certificate,
          statusCode: response.status,
          recommendations: isHttps 
            ? ['✅ HTTPS ist aktiv']
            : ['❌ HTTPS nicht aktiv', '💡 SSL-Zertifikat einrichten', '💡 HTTP zu HTTPS weiterleiten']
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (fetchError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Website nicht erreichbar',
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