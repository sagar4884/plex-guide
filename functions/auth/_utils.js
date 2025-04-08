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

// Authentication logging helper
export const logAuthentication = async (env, token, isNewLogin = false) => {
  try {
    const userResponse = await fetch("https://plex.tv/api/v2/user", {
      headers: {
        "Accept": "application/json",
        "X-Plex-Token": token,
      },
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      const username = userData.username || userData.email || 'Unknown user';
      if (isNewLogin) {
        console.log(`New login: ${username}`);
      } else if (isDebugEnabled(env)) {
        console.log(`Authenticated request from ${username}`);
      }
    }
  } catch (error) {
    debugLog(env, "Error fetching user data:", error);
  }
};

// Resource access logging helper
export const logResourceAccess = (env, url) => {
  if (isDebugEnabled(env)) {
    console.log(`Resource accessed: ${url.pathname}`);
  }
};

// Check server access
export const checkServerAccess = (resources, env) => {
  return resources.some((resource) => {
    const isMatch = resource.clientIdentifier === env.PLEX_SERVER_ID;
    const isOwned = resource.owned === true;
    const isShared = resource.shared === true || Boolean(resource.accessToken);
    const hasOwnership = isOwned || isShared;

    debugLog(env, "Checking resource:", {
      resourceId: resource.clientIdentifier,
      resourceName: resource.name,
      isMatch,
      owned: isOwned,
      shared: isShared,
      accessToken: Boolean(resource.accessToken),
      hasAccess: isMatch && hasOwnership
    });

    return isMatch && hasOwnership;
  });
};
