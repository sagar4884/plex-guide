# Frequently Asked Questions (FAQ)

Here are answers to some common questions you might have while using the Jellyfin (*Parvati*) media server.

[TOC]

## Playback Issues

### Why is my video buffering or stopping?

Buffering usually means your device isn't receiving data fast enough. Common causes include:

1.  **Internet Speed:** Your download speed might be too slow for the quality of the video you're trying to watch, especially when streaming remotely (outside your home). Run a speed test on the device you're using. High-quality 1080p might need 10-20 Mbps+, while 4K HDR can require 50-100 Mbps or more.
2.  **Client Quality Settings:** Ensure your app's quality settings are set to **Maximum**. Paradoxically, setting it *lower* can sometimes *cause* buffering if it forces the server to transcode unnecessarily, straining server resources. See [Client Playback Settings](client-settings.md).
3.  **Device Performance:** Older or less powerful devices (some smart TVs, older phones/tablets, low-end streaming sticks) might struggle to decode high-quality video smoothly, even if the network is fast.
4.  **Server Load:** While the server is powerful, if many users are transcoding simultaneously, it might impact performance. This is less likely if clients are set correctly.
5.  **Transcoding:** Sometimes transcoding *is* necessary due to compatibility, but it uses server resources. See [Understanding Transcoding](transcoding-explained.md).

**What to Try:** Check your internet speed, verify client quality settings are Maximum, try a lower quality stream temporarily to see if it helps (via playback settings overlay), restart your device/app, or try a different client device if available. If the issue persists on a specific file, please report it via [Requests & Issues](requests-and-issues.md).

### Why is the video stuttering or choppy (but not buffering)?

This usually points to the *client device* struggling to decode the video smoothly.

* **Check Hardware Decoding:** In clients like Jellyfin Media Player (Desktop) or some Android apps, ensure "Hardware Decoding" is enabled in the settings.
* **Device Power:** Your device might simply not be powerful enough for the video format (especially 4K HDR or high-bitrate HEVC).
* **Try a Different Client:** Some apps/devices handle certain formats better than others.
* **Check for Updates:** Ensure your Jellyfin client app and device operating system are up-to-date.

### Why is there no sound, or the wrong audio language?

This is usually due to the wrong audio track being selected.

* **Select Audio Track:** During playback, use the playback controls (often a Gear icon ⚙️ or Audio icon) to see available audio tracks and select the one you want (e.g., "English", "Stereo", "Surround 5.1"). See [Selecting Audio & Subtitles](audio-subtitle-selection.md).
* **Device Compatibility:** Your device/sound system might not support the selected audio format (e.g., DTS-HD MA, TrueHD). Choosing a different compatible track (like AC3 5.1 or AAC Stereo) might be necessary, which the server may transcode automatically if needed.

### Why aren't subtitles showing, or they look wrong/out of sync?

* **Select Subtitle Track:** During playback, use the playback controls (Gear icon ⚙️ or Subtitle icon) to select the desired subtitle track or turn them off ("None"). See [Selecting Audio & Subtitles](audio-subtitle-selection.md).
* **Client Settings:** Check the Jellyfin app's main settings under Playback or Subtitles for options related to subtitle appearance (size, color, position) or offset timing adjustments.
* **Subtitle Type:** Image-based subtitles (PGS, VOBSUB) can sometimes cause issues or trigger transcoding. If available, try selecting a text-based subtitle track (SRT, ASS).
* **Report Issue:** If subtitles seem genuinely incorrect or badly timed for a specific file, please report it via [Requests & Issues](requests-and-issues.md).

### Why does playback stop unexpectedly or the app crash?

* **App Update:** Check if there's an update available for your Jellyfin client app.
* **Device Restart:** Try restarting the device you are using.
* **File Issue:** Occasionally, a specific media file might have an error causing issues. Try playing something else to check. If only one file has problems, please report it.
* **Try Different Client:** See if the issue occurs on a different device or app (e.g., web browser vs. TV app).

## Connection & Access

### I can't connect to the server ("Server Unavailable", "Connection Failed").

1.  **Check URL:** Ensure you are using the correct address: `https://jellyfin.bladelight.tech` (no typos, includes `https://`). See [Connecting to the Server](connecting.md).
2.  **Check Internet:** Make sure your device has a working internet connection. Try opening a regular website in a browser.
3.  **Check Server Status:** Contact the admin (using methods on [Requests & Issues](requests-and-issues.md#contacting-the-admin)) to see if the server itself might be temporarily down for maintenance.
4.  **Firewall/VPN:** If you are using a VPN or have a strict firewall on your network/device, ensure it's not blocking the connection to the server address.

### I forgot my password. How do I reset it?

Password resets need to be handled by the server administrator. Please contact me directly via one of the methods listed on the [Requests & Issues](requests-and-issues.md#contacting-the-admin) page to get your password reset.

## Interface & Usage

### How do I find specific movies/shows?

* **Search:** Use the Search function (Magnifying Glass icon 🔍) - it's usually the fastest way.
* **Browse Libraries:** Select a specific library (e.g., Movies, TV Shows, Anime) from the main menu/sidebar to browse its contents. You can often sort or filter within libraries.
* **Collections:** Check the "Collections" library for curated sets of related movies/shows.
* See [Basic Navigation & Libraries](basic-navigation.md) for more details.

### Can I customize the home screen?

Yes, most Jellyfin clients allow some customization of the home screen sections (like "Continue Watching", "Next Up", "Latest Movies", etc.). Look for options like "Home Screen Sections" or "Manage Home Screen" within the app's main **Settings**, often under **Display** or **Home Screen**. You can usually reorder or hide sections you don't use.

## Quality & Transcoding

### What do "Remote Quality" and "Local Quality" mean?

These settings in your client app determine the maximum quality the app *requests* from the server.
* **Remote/Internet Quality:** Applies when you are streaming from *outside* your home network (e.g., using mobile data, at a friend's house).
* **Local/Home Network Quality:** Applies when you are connected to the *same* home network as the server.

Setting both to **Maximum** is recommended. See [Client Playback Settings](client-settings.md).

### Why does it sometimes say "Transcoding" or show a lower quality?

This means the server is converting the file on-the-fly. It happens when Direct Play/Stream isn't possible due to compatibility, bandwidth limits, or subtitle burn-in. While the server can handle it, ensuring your client settings are correct minimizes *unnecessary* transcoding. See [Understanding Transcoding](transcoding-explained.md).

## Other

### Can I download media for offline viewing?

Yes, the official Jellyfin mobile apps (Android/iOS) typically support downloading movies and episodes for offline playback, provided the feature is enabled server-side. See [Offline Viewing (Downloads/Sync)](offline-viewing.md).

### Is using Jellyfin free?

Yes. Access to this server (*Parvati*) is provided to you, and the Jellyfin software itself is free and open source. There are no costs or subscriptions required from you to use it.

---

If your question isn't answered here, please check the other pages in this guide or feel free to contact the administrator directly via the methods listed on the [Requests & Issues](requests-and-issues.md#contacting-the-admin) page.
