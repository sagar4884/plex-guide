# Privacy & Safety

Your privacy and the security of your connection are important. Here’s how these are handled when accessing the media server.

## Connection Security

Whether you are connecting via Jellyfin (*Parvati*) or Plex (*Mahadev* during the transition), your connection to the server is secured using **HTTPS**.

* **Encryption:** All data transferred between your device (phone, TV, browser) and the server is encrypted. This includes login credentials, what you browse, and what you watch, similar to online banking security.
* **Server Address:** The Jellyfin connection uses `https://jellyfin.bladelight.tech`. The `https://` indicates the secure, encrypted connection. Plex connections via `app.plex.tv` also use HTTPS.
* **Infrastructure:** The server utilizes secure infrastructure practices (like Cloudflare Tunnels) to protect the connection and enhance performance without exposing the server directly to the internet.

You can stream with confidence knowing the connection itself is secure.

## Data Privacy: Jellyfin vs. Plex

The two platforms handle your usage data differently:

### Jellyfin (*Parvati*)

* **Privacy Focused:** Jellyfin is open-source software designed with user privacy as a priority.
* **No Telemetry (Default):** Jellyfin **does not collect or report your viewing habits**, library contents, or personal usage data back to any central company.
* **Your Data Stays Here:** All interaction data (watch history, settings) stays between your client app and this specific server instance (`jellyfin.bladelight.tech`).
* **No External Account Required:** Jellyfin doesn't require linking to a mandatory external account for basic operation. Authentication happens directly with this server.

### Plex (*Mahadev*)

* **Centralized Account:** Plex requires an account with `plex.tv`.
* **Data Collection:** Plex **does collect usage data** ("Optional Playback Data") by default. They also have social features ("Discover Together") that can share your activity with Plex friends unless you opt out.
* **Opt-Out Recommended:** To maximize your privacy on Plex, you should manually **opt-out** of certain data collection and sharing features via your `plex.tv` account settings.

## Recommended Plex Privacy Settings (If Using Before July 1, 2025)

If you are still using Plex (*Mahadev*) during the transition, consider adjusting these settings in your Plex account for better privacy:

1.  **Disable Activity Sharing ("Discover Together"):**
    * Log into [app.plex.tv](https://app.plex.tv).
    * Go to **Account Settings** (via Profile Icon) -> **Privacy**.
    * Set **"Share my activity"** options (Watch History, Ratings) to **Private** or **Disabled**.

2.  **Disable Optional Playback Data Reporting:**
    * Log into [plex.tv](https://plex.tv).
    * Go to **Account Settings** -> **Privacy Preferences** (or direct link: [plex.tv/about/privacy-legal/privacy-preferences/#opd](https://www.plex.tv/about/privacy-legal/privacy-preferences/#opd)).
    * **Uncheck** the box for **"Send playback data to Plex"**.
    * Save changes.

3.  **Other Optional Plex Settings:**
    * **Email Preferences:** ([plex.tv/email-preferences/](https://www.plex.tv/email-preferences/)) Opt-out of marketing/activity emails.
    * **Online Media Sources:** (In `app.plex.tv` Settings -> Online Media Sources) Disable Plex's own streaming services if desired.
    * **Advertising Opt-Out (US):** ([plex.tv/vendors-us/](https://www.plex.tv/vendors-us/)) For users in specific US states.

---

Using Jellyfin (*Parvati*) as the primary platform significantly enhances your privacy regarding usage data. Adjusting Plex settings is recommended if you use it during the transition.
