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
    const urlObj = new URL(normalizedUrl);
    
    const recommendations: string[] = [];
    const redirectChain: string[] = [];
    let currentUrl = normalizedUrl;
    let redirectCount = 0;
    const maxRedirects = 10;

    try {
      // HTTP zu HTTPS Test
      const httpUrl = normalizedUrl.replace('https://', 'http://');
      
      while (redirectCount < maxRedirects) {
        const response = await fetch(currentUrl, {
          method: 'HEAD',
          redirect: 'manual',
          signal: AbortSignal.timeout(5000)
        });

        redirectChain.push(`${response.status} - ${currentUrl}`);

        if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get('location');
          if (location) {
            // Relative URLs zu absoluten machen
            currentUrl = location.startsWith('http') 
              ? location 
              : new URL(location, currentUrl).toString();
            redirectCount++;
          } else {
            break;
          }
        } else {
          break;
        }
      }

      // Analyse der Redirects
      if (redirectCount === 0) {
        recommendations.push('✅ Keine Weiterleitungen - direkter Zugriff');
      } else if (redirectCount === 1) {
        recommendations.push('✅ Saubere Weiterleitung (1 Redirect)');
      } else if (redirectCount <= 3) {
        recommendations.push('⚠️ Mehrere Weiterleitungen vorhanden');
        recommendations.push('💡 Redirect-Kette optimieren für bessere Performance');
      } else {
        recommendations.push('❌ Zu viele Weiterleitungen');
        recommendations.push('💡 Redirect-Kette stark verkürzen');
      }

      // HTTP zu HTTPS Test
      try {
        const httpResponse = await fetch(httpUrl, {
          method: 'HEAD',
          redirect: 'manual',
          signal: AbortSignal.timeout(5000)
        });

        if (httpResponse.status >= 300 && httpResponse.status < 400) {
          const httpsRedirect = httpResponse.headers.get('location');
          if (httpsRedirect && httpsRedirect.startsWith('https://')) {
            recommendations.push('✅ HTTP zu HTTPS Weiterleitung aktiv');
          } else {
            recommendations.push('⚠️ HTTP Weiterleitung führt nicht zu HTTPS');
          }
        } else {
          recommendations.push('❌ Keine HTTP zu HTTPS Weiterleitung');
          recommendations.push('💡 HTTP zu HTTPS Redirect einrichten');
        }
      } catch {
        recommendations.push('⚠️ HTTP-Version nicht erreichbar');
      }

      // WWW vs. non-WWW Test
      const wwwUrl = normalizedUrl.replace('://', '://www.');
      const nonWwwUrl = normalizedUrl.replace('://www.', '://');
      
      if (wwwUrl !== normalizedUrl) {
        try {
          const wwwResponse = await fetch(wwwUrl, {
            method: 'HEAD',
            redirect: 'manual',
            signal: AbortSignal.timeout(5000)
          });
          
          if (wwwResponse.status >= 300 && wwwResponse.status < 400) {
            recommendations.push('✅ WWW-Weiterleitung konfiguriert');
          }
        } catch {
          // WWW-Version existiert nicht
        }
      }

      return new Response(JSON.stringify({
        success: true,
        data: {
          originalUrl: normalizedUrl,
          finalUrl: currentUrl,
          redirectCount,
          redirectChain,
          httpToHttps: recommendations.some(r => r.includes('HTTP zu HTTPS')),
          recommendations
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (fetchError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Fehler beim Testen der Weiterleitungen',
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