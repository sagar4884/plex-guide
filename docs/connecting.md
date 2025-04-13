# Connecting to the Server

Welcome! This guide explains how to connect your devices to the media server. As we are transitioning from Plex to Jellyfin (see [Why Jellyfin?](why-jellyfin.md)), the primary connection method is now via Jellyfin.

## Connecting with Jellyfin (Primary Method)

Jellyfin doesn't use a central invite system like Plex. To connect any Jellyfin app (on your phone, TV, computer, etc.), you simply need to tell the app the server's address.

**Server Address:** `https://jellyfin.bladelight.tech`

**General Steps (May vary slightly by app):**

1.  **Install a Jellyfin Client App:**
    * Download the official Jellyfin app appropriate for your device. Common sources include:
        * Google Play Store (Android Phones/Tablets, Android TV/Google TV)
        * Apple App Store (iPhone, iPad, Apple TV - *Note: Consider using [Swiftfin](https://github.com/jellyfin/Swiftfin) for a more native experience*)
        * Amazon Appstore (Fire TV devices)
        * [Jellyfin Website](https://jellyfin.org/downloads/) (for Desktop apps like Jellyfin Media Player for Windows/macOS/Linux)
        * Roku Channel Store

2.  **Open the App:** Launch the Jellyfin app for the first time.

3.  **Add Server / Connect:** Look for an option like "Add Server," "Connect to Server," or similar prompts.

4.  **Enter Server Address:** When asked for the server address or URL, carefully type in:
    ```
    [https://jellyfin.bladelight.tech](https://jellyfin.bladelight.tech)
    ```
    !!! important "Address Details"
        * Ensure you include `https://` at the beginning.
        * Do **not** add anything after `.tech` (like port numbers or extra slashes).
        * Check carefully for typos.

5.  **Connect / Continue:** Proceed with the connection (e.g., tap "Connect", "Next", or "Save"). The app should find and confirm the server connection.

6.  **Login:** You will then be prompted to enter your **Jellyfin Username** and **Password**.
    * These are the credentials provided to you for accessing the server.
    * They are the *same* credentials you use to log into this guide website (`help.bladelight.tech`).

7.  **Done!** Once logged in, you should see the server's media libraries (Movies, TV Shows, etc.). Explore the app's settings (see [Client Settings](client-settings.md)) to ensure optimal video quality!

!!! failure "Connection Problems?"
    * **Check Server Address:** Double-check the address `https://jellyfin.bladelight.tech` for typos.
    * **Check Internet:** Ensure your device has an active internet connection.
    * **Check Credentials:** Verify your username and password are correct.
    * **Contact Admin:** If problems persist, please reach out for assistance.

## Connecting with Plex (During Transition / Phasing Out)

While Jellyfin is the primary way forward, Plex access remains available during the transition period until **July 1st, 2025**.

* **Invites:** Plex access required accepting an invite via email or your Plex account dashboard ([plex.tv](https://plex.tv)). If you previously had access, it should still work.
* **Pinning Libraries:** You might need to manually "pin" the shared libraries (Movies, TV Shows) to your Plex sidebar and potentially unpin Plex's own online sources to avoid confusion. *(Refer to archived Plex guides if needed during transition)*.

Remember to configure your Plex client video quality settings as well (see [Client Settings](client-settings.md)).
