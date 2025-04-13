# Privacy & Safety

Ensuring your connection is secure and your viewing habits remain private is important. Here’s how privacy and safety are handled on this server.

## Connection Security

Whether you are connecting via Jellyfin or Plex (during the transition), your connection to the server is secured using **HTTPS**.

* **Encryption:** All data transferred between your device (phone, TV, browser) and the server is encrypted. This includes login credentials, what you browse, and what you watch. This is similar to the security used for online banking.
* **Server Address:** The Jellyfin connection uses `https://jellyfin.bladelight.tech`. The `https://` indicates the secure, encrypted connection.
* **Infrastructure:** The server utilizes secure infrastructure practices (like Cloudflare Tunnels) to protect the connection and enhance performance without exposing the server directly to the internet.

You can stream with confidence knowing the connection itself is secure.

## Data Privacy: Jellyfin vs. Plex

The two platforms handle user data and privacy quite differently:

### Jellyfin (Primary Platform)

* **Privacy by Design:** Jellyfin is open-source software designed with privacy as a core principle.
* **No Telemetry:** By default, Jellyfin **does not collect or report your viewing habits**, library contents, or any personal usage data back to any central company or server.
* **Your Data Stays Local:** All interaction data (watch history, settings) stays between your client app and this specific server instance (`jellyfin.bladelight.tech`).
* **No External Account Required (for core function):** While you log into this server, Jellyfin itself doesn't require linking to a mandatory external account like `jellyfin.org` for basic operation.

### Plex (During Transition until July 1, 2025)

* **Centralized Account:** Plex requires an account with `plex.tv` for authentication and operation.
* **Data Collection:** Plex **does collect usage data** ("Optional Playback Data") by default to improve its services. They also have social features ("Discover Together") that can share your activity with Plex friends.
* **Opt-Out Required:** To enhance privacy on Plex, you need to manually **opt-out** of certain data collection and sharing features through your account settings on their website.

## Recommended Plex Privacy Settings (During Transition)

If you are still using Plex before the decommissioning date (**July 1st, 2025**), it is highly recommended to review and adjust the following privacy settings in your Plex account:

### 1. Disable Activity Sharing ("Discover Together")

This prevents Plex from potentially sharing summaries of your watch activity with your Plex friends.

1.  Log into the Plex Web App at [app.plex.tv](https://app.plex.tv).
2.  Click your **Profile Icon** (top-right) and select **Account Settings**.
3.  In the left menu, under your account name, click **Privacy**.
4.  Find the section "Activity Sharing" or similar.
5.  Set **"Share my activity"** (or similar options like Watch History, Ratings) to **Private** or **Disabled**. Adjust granularly based on your comfort level.

### 2. Disable Optional Playback Data Reporting

This stops your Plex account from sending detailed playback usage statistics back to Plex Inc.

1.  Log into your account settings directly at [plex.tv](https://plex.tv).
2.  Navigate to your **Account Settings** (usually via your profile icon).
3.  Find the **Privacy Preferences** section (or navigate directly: [https://www.plex.tv/about/privacy-legal/privacy-preferences/#opd](https://www.plex.tv/about/privacy-legal/privacy-preferences/#opd)).
4.  Under "Optional Playback Data," **uncheck** the box for **"Send playback data to Plex"**.
5.  Save the changes if required.

### 3. Other Optional Plex Settings

Consider reviewing these in your Plex account settings as well:

* **Email Preferences:** ([https://www.plex.tv/email-preferences/](https://www.plex.tv/email-preferences/)) Opt-out of marketing emails or activity digests.
* **Online Media Sources:** ([https://app.plex.tv/desktop/#!/settings/online-media-sources](https://app.plex.tv/desktop/#!/settings/online-media-sources)) You can disable Plex's own streaming services here if you only want to see content from this server.
* **Sync Watch State & Ratings:** (Under Account Settings) Disabling this stops syncing progress across different Plex servers but enhances privacy if you use multiple servers. For accessing only this server, leaving it enabled is usually fine.
* **Advertising Opt-Out (US):** ([https://www.plex.tv/vendors-us/](https://www.plex.tv/vendors-us/)) Relevant for users in specific US states.

---

By using Jellyfin as the primary platform moving forward, many of these privacy concerns related to Plex's data collection are alleviated. However, during the transition, adjusting your Plex settings is recommended for enhanced privacy.
