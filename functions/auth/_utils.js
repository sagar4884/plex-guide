// Helper to parse DEBUG environment variable
const isDebugEnabled = (env) => {
  // Simple string comparison is all we need
  return env.DEBUG === "true";
};

// Debug logging helper
export const debugLog = (env, message, data = null) => {
  if (isDebugEnabled(env)) {
    if (data) {
      console.log(`[DEBUG] ${message}:`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
};

// --- Plex Specific Helpers ---

// Authentication logging helper (Plex)
export const logAuthentication = async (env, token, isNewLogin = false) => {
  try {
    // Check if it's a Plex token before attempting to log (basic check)
    if (!token || token.length < 20) return; // Basic heuristic: Jellyfin tokens are GUIDs, Plex tokens are shorter

    const userResponse = await fetch("https://plex.tv/api/v2/user", {
      headers: {
        "Accept": "application/json",
        "X-Plex-Token": token,
        "X-Plex-Client-Identifier": env.PLEX_CLIENT_ID || 'UNKNOWN_CLIENT' // Add fallback
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      const username = userData.username || userData.email || 'Unknown user';
      if (isNewLogin) {
        console.log(`New Plex login: ${username}`);
      } else if (isDebugEnabled(env)) {
        console.log(`Authenticated Plex request from ${username}`);
      }
    } else {
       debugLog(env, `Plex user fetch failed for token: ${userResponse.status}`);
    }
  } catch (error) {
    debugLog(env, "Error fetching Plex user data:", error);
  }
};

// Resource access logging helper (Generic)
export const logResourceAccess = (env, url) => {
  if (isDebugEnabled(env)) {
    console.log(`Resource accessed: ${url.pathname}`);
  }
};

// Check server access (Plex specific)
export const checkServerAccess = (resources, env) => {
   if (!env.PLEX_SERVER_ID) {
       console.error("PLEX_SERVER_ID environment variable is not set. Cannot check Plex server access.");
       return false;
   }
   if (!Array.isArray(resources)) {
       debugLog(env, "Invalid resources data received for Plex checkServerAccess", resources);
       return false;
   }
  return resources.some((resource) => {
    // Added check for resource structure
    if (!resource || typeof resource.clientIdentifier === 'undefined') {
        debugLog(env, "Skipping invalid resource entry in checkServerAccess", resource);
        return false;
    }
    const isMatch = resource.clientIdentifier === env.PLEX_SERVER_ID;
    // Ensure boolean interpretation is strict
    const isOwned = resource.owned === true;
    // Check accessToken presence for shared status robustly
    const isShared = resource.accessToken ? true : (resource.shared === true);
    const hasOwnership = isOwned || isShared;

    debugLog(env, "Checking Plex resource:", {
      resourceId: resource.clientIdentifier,
      resourceName: resource.name || 'N/A',
      targetServerId: env.PLEX_SERVER_ID,
      isMatch,
      owned: isOwned,
      shared: isShared,
      hasAccessToken: Boolean(resource.accessToken),
      hasAccess: isMatch && hasOwnership
    });

    return isMatch && hasOwnership;
  });
};


// --- Jellyfin Specific Helper ---

// Validate Jellyfin Token by calling /Users/Me
export const validateJellyfinToken = async (token, env) => {
  if (!token) return false;
  if (!env.JELLYFIN_URL || !env.JELLYFIN_APP_NAME) {
      console.error("Missing JELLYFIN_URL or JELLYFIN_APP_NAME for validation.");
      return false; // Cannot validate without config
  }

  // Heuristic: Check if token looks like a GUID (Jellyfin tokens often do)
  // Basic check: 32 hex chars typically, often with hyphens but AccessToken usually doesn't have them.
  // Plex tokens are usually shorter and different format.
   if (token.length !== 32 || !/^[a-f0-9]+$/i.test(token)) {
     debugLog(env, "Token does not look like a Jellyfin AccessToken (GUID format expected)");
     return false;
   }


  const jellyfinUsersMeUrl = `${env.JELLYFIN_URL.replace(/\/$/, '')}/Users/Me`;
  // Use the same DeviceId etc as in jellyfin-login.js for consistency
  const authHeader = `MediaBrowser Client="${env.JELLYFIN_APP_NAME}", Device="Cloudflare Function", DeviceId="cloudflare-jellyfin-auth-v1", Version="1.0.0", Token="${token}"`;

  debugLog(env, `Validating Jellyfin token via ${jellyfinUsersMeUrl}`);

  try {
    const response = await fetch(jellyfinUsersMeUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Emby-Authorization': authHeader
      }
    });

    if (response.ok) {
      // Successfully called /Users/Me, token is valid
      const userData = await response.json(); // Optional: log username if needed
      debugLog(env, `Jellyfin token validated successfully for user: ${userData?.Name || 'Unknown'}`);
      return true;
    } else if (response.status === 401) {
      // Unauthorized - token is invalid or expired
      debugLog(env, "Jellyfin token validation failed: 401 Unauthorized");
      return false;
    } else {
      // Other error (e.g., server down, network issue)
      debugLog(env, `Jellyfin token validation failed: Status ${response.status}`, await response.text());
      return false;
    }
  } catch (error) {
    console.error("Error during Jellyfin token validation fetch:", error);
    debugLog(env, "Error during Jellyfin token validation fetch:", error.message);
    return false; // Treat fetch errors as invalid token
  }
};
