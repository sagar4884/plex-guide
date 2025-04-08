export async function onRequest({ env }) {
    const js = `
      const PLEX_CLIENT_ID = "${env.PLEX_CLIENT_ID}";

      async function startPlexAuth() {
        const width = 600;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        // First open popup to our domain
        const popup = window.open(
          '/auth/auth-popup',
          'PlexAuth',
          \`width=\${width},height=\${height},left=\${left},top=\${top}\`
        );

        if (!popup) {
          alert('Please enable popups to login with Plex');
          return;
        }

        try {
          const pinResponse = await fetch("https://plex.tv/api/v2/pins?strong=true", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "X-Plex-Client-Identifier": PLEX_CLIENT_ID,
              "X-Plex-Product": "Plex Server Guide",
              "X-Plex-Platform": navigator.platform,
              "X-Plex-Device": "Web Browser",
              "X-Plex-Device-Name": "Plex Server Guide"
            }
          });

          const { code, id: pinId } = await pinResponse.json();

          const params = new URLSearchParams({
            clientID: PLEX_CLIENT_ID,
            'context[device][product]': 'Plex Server Guide',
            'context[device][platform]': navigator.platform,
            'context[device][device]': 'Web Browser',
            'context[device][deviceName]': 'Plex Server Guide',
            'context[device][model]': 'Web Application',
            code: code,
            forwardUrl: \`\${window.location.origin}/auth/callback?pinId=\${pinId}\`
          });

          popup.location.href = \`https://app.plex.tv/auth#?\${params}\`;

          const checkInterval = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkInterval);
              window.location.reload();
            }
          }, 1000);
        } catch (error) {
          console.error("Error in auth process:", error);
          popup.close();
          window.location.href = '/auth/error?message=' + encodeURIComponent(error.message);
        }
      }
    `;

    return new Response(js, {
      headers: {
        "Content-Type": "application/javascript"
      }
    });
  }
