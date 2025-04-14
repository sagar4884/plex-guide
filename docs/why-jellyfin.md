# Why Jellyfin? Advantages for Your Viewing Experience

You might notice we're encouraging the use of Jellyfin (*Parvati*) alongside, and eventually replacing, Plex (*Mahadev*). While both let you watch the media library, Jellyfin offers several key advantages *for you* as a user connecting to this server:

## 1. Better Performance Potential (Free Hardware Transcoding)

* **Smoother Streams:** Jellyfin allows the server to use its powerful GPU (RTX 2080 Super) for video transcoding *without* requiring an extra subscription (like Plex Pass).
* **Why This Matters To You:** When a file needs to be converted for your device (transcoded), using the GPU is much faster and more efficient than using the CPU alone. This means potentially less buffering, faster start times, and a smoother experience, especially with high-quality files or when many people are streaming simultaneously. See [Understanding Transcoding](transcoding-explained.md) for more info.

## 2. Enhanced Privacy

* **No Usage Tracking (by Jellyfin):** Jellyfin is designed with privacy first. The core software doesn't collect or send your viewing habits or personal data back to a central company. What you watch stays between you and this server.
* **Less Corporate Ecosystem:** Jellyfin focuses purely on serving the media hosted here. Unlike Plex, it doesn't require a mandatory external account (`plex.tv`) for basic login and doesn't integrate third-party ads or streaming services into the interface you see. See [Privacy & Safety](privacy.md) for details.

## 3. Potentially More Reliable Access

* **Less Reliance on External Servers:** Jellyfin authenticates you directly against this server (`jellyfin.bladelight.tech`). This means if external services (like `plex.tv`) were having issues, your Jellyfin access should generally remain unaffected (as long as the server itself and your internet are up).
* **Works Offline (Locally):** If your *home* internet goes down but the server is still running on your local network, you could potentially still access Jellyfin from devices within your home network (this depends on your specific home network setup).

## 4. Cleaner, Focused Interface

* **Your Media First:** Jellyfin's interface is generally focused solely on the libraries shared from this server (Movies, TV Shows, etc.). It doesn't mix in external, ad-supported content or other services by default, leading to a potentially less cluttered experience compared to Plex's recent changes.

## 5. Full Access to Features

* **No Paywalled Features:** All playback features available through Jellyfin are accessible to you without needing any kind of premium subscription on the server side.

---

While Plex (*Mahadev*) has been reliable, Jellyfin's (*Parvati*) open-source, privacy-respecting nature, and its ability to fully utilize the server's hardware for potentially smoother playback offer compelling benefits for your viewing experience as we move forward. Give the Jellyfin apps a try by following the [Connecting to the Server](connecting.md) guide!
