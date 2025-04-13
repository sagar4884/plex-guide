export async function onRequest({ env }) {
    // This function serves the combined JavaScript for the login page
    // It injects necessary environment variables like PLEX_CLIENT_ID if needed by the frontend JS.
    // Currently, only PLEX_CLIENT_ID is injected for the Plex part.

    // Note: We are not injecting JELLYFIN_URL or other Jellyfin secrets here,
    // as the frontend only needs to send credentials to our *own* backend function.
    const PLEX_CLIENT_ID_VALUE = env.PLEX_CLIENT_ID || "YOUR_PLEX_CLIENT_ID_MISSING"; // Fallback just in case

    const js = `
      // --- Existing Plex Authentication Logic ---
      const PLEX_CLIENT_ID = "${PLEX_CLIENT_ID_VALUE}";

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
          // Get Plex PIN
          const pinResponse = await fetch("https://plex.tv/api/v2/pins?strong=true", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "X-Plex-Client-Identifier": PLEX_CLIENT_ID,
              "X-Plex-Product": "Plex Server Guide", // Consider making this dynamic via env var?
              "X-Plex-Platform": navigator.platform || 'Unknown Platform',
              "X-Plex-Device": "Web Browser",
              "X-Plex-Device-Name": "Plex Server Guide Auth" // Slightly different name?
            }
          });

          if (!pinResponse.ok) {
            throw new Error(\`Plex PIN request failed: \${pinResponse.statusText}\`);
          }

          const { code, id: pinId } = await pinResponse.json();

          // Construct Plex Auth URL
          const params = new URLSearchParams({
            clientID: PLEX_CLIENT_ID,
            'context[device][product]': 'Plex Server Guide',
            'context[device][platform]': navigator.platform || 'Unknown Platform',
            'context[device][device]': 'Web Browser',
            'context[device][deviceName]': 'Plex Server Guide Auth',
            'context[device][model]': 'Web Application',
            code: code,
            forwardUrl: \`\${window.location.origin}/auth/callback?pinId=\${pinId}\`
          });

          // Redirect popup to Plex Auth
          popup.location.href = \`https://app.plex.tv/auth#?\${params}\`;

          // Check if popup closed (user finished or cancelled)
          const checkInterval = setInterval(() => {
            if (popup.closed) {
              clearInterval(checkInterval);
              // Reload the main page to check auth status via middleware/[[route]]
              window.location.reload();
            }
          }, 1000);

        } catch (error) {
          console.error("Error in Plex auth process:", error);
          if (popup) popup.close();
          // Display error to user (optional)
          const statusDiv = document.getElementById('loginStatus');
          if (statusDiv) statusDiv.textContent = 'Plex login failed. Please try again.';
          // Optionally redirect to a generic error page:
          // window.location.href = '/auth/error?message=' + encodeURIComponent(error.message);
        }
      }
      // --- End Existing Plex Authentication Logic ---


      // --- New Jellyfin Authentication Logic ---
      const jellyfinForm = document.getElementById('jellyfinLoginForm');
      const loginStatusDiv = document.getElementById('loginStatus');

      if (jellyfinForm) {
        jellyfinForm.addEventListener('submit', handleJellyfinLogin);
      }

      async function handleJellyfinLogin(event) {
        event.preventDefault(); // Prevent default HTML form submission

        if (loginStatusDiv) loginStatusDiv.textContent = 'Logging in...'; // Provide feedback

        const usernameInput = document.getElementById('jellyfinUsername');
        const passwordInput = document.getElementById('jellyfinPassword');

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (!username || !password) {
           if (loginStatusDiv) loginStatusDiv.textContent = 'Please enter both username and password.';
           return;
        }

        try {
          const response = await fetch('/auth/jellyfin-login', { // Our new backend endpoint
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          if (response.ok) {
            // Success! Backend presumably set the cookie. Reload to access content.
            if (loginStatusDiv) loginStatusDiv.textContent = 'Login successful! Reloading...';
            window.location.reload();
          } else {
            // Handle login failure (e.g., wrong credentials, server error)
            let errorMessage = 'Login failed. Please check your username and password.';
            if (response.status === 401) {
                 errorMessage = 'Invalid username or password.';
            } else {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) { /* Ignore if response body is not JSON */ }
            }
            if (loginStatusDiv) loginStatusDiv.textContent = errorMessage;
            // Clear password field on failure
             if (passwordInput) passwordInput.value = '';
          }
        } catch (error) {
          console.error('Error during Jellyfin login fetch:', error);
          if (loginStatusDiv) loginStatusDiv.textContent = 'An error occurred during login. Please try again.';
           // Clear password field on error
           if (passwordInput) passwordInput.value = '';
        }
      }
      // --- End New Jellyfin Authentication Logic ---
    `; // End of the main 'js' template literal

    // Return the combined JavaScript code
    return new Response(js, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-cache" // Good practice for dynamic JS during development
      }
    });
}
