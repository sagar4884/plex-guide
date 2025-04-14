# Client Playback Settings

Setting the correct video quality settings in your client app (the app you use to watch media on your device) is **crucial** for the best viewing experience and helps the server run efficiently for everyone.

**The Goal:** Set **Remote/Internet** and **Local/Home Network** streaming quality to **Maximum** or **Original**.

**Why?** This tells the app to request the highest quality file directly from the server (*Parvati* for Jellyfin, *Mahadev* for Plex). The server will then only **transcode** the video (convert it on-the-fly) if absolutely necessary for compatibility with your device, rather than transcoding just because of a low default quality setting. Avoiding unnecessary transcoding means:

* **Better Quality:** Best possible picture and sound.
* **Faster Performance:** Quicker start times and seeking (fast-forward/rewind).
* **Smoother Streams:** Less processing load on the server, especially important when multiple people are streaming.

For more details on transcoding, see [Understanding Transcoding](transcoding-explained.md).

!!! warning "Settings are Per-Client, Per-Platform"
    These quality settings are specific to **each individual app and device**. You need to check and adjust them the first time you use a new app or device. Settings do **not** sync automatically between Jellyfin and Plex apps, nor between different apps on the same device (e.g., settings on your phone app don't affect your TV app).

[TOC]

---

## TV Apps (Android TV / Google TV / Fire TV / Apple TV / Roku / LG)

Instructions for apps running on smart TVs or dedicated streaming devices.

### Android TV / Google TV / Amazon Fire TV

*(Devices like Nvidia Shield, Chromecast w/ Google TV, Fire TV Sticks)*

#### Jellyfin Settings (Android TV / Fire TV)

1.  **Open Jellyfin App:** Launch the application.
2.  **Settings:** Use your remote to navigate to **Settings** (Gear icon ⚙️, usually in sidebar or under user profile).
3.  **Playback:** Select **Playback** or **Client Settings > Playback**.
4.  **Video Quality:**
    * **Maximum Streaming Bitrate / Remote Bitrate:** Set to **Maximum** or highest value (e.g., 120 Mbps+). *"Auto"* is acceptable if Maximum isn't available.
    * **Home Network Streaming Bitrate / Local Bitrate:** Set to **Maximum** or highest value.
5.  **Direct Play:** Ensure "Allow Direct Play" is **enabled**.
6.  **Exit Settings.**

#### Plex Settings (Android TV / Fire TV)

1.  **Open Plex App:** Launch the application.
2.  **Settings:** Navigate to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Video Quality:** Find the **Video Quality** section.
4.  **Adjust Quality:**
    * **Adjust automatically:** Set to **OFF**.
    * **Home streaming / Local Quality:** Set to **Maximum** or **Original**.
    * **Remote streaming / Internet Quality:** Set to **Maximum** or **Original**.
    * **Play Smaller Videos:** Set to **Original Quality**.
    * *(Optional)* **Quality Suggestions:** Set to **OFF**.
5.  **Exit Settings.**

### Apple TV

*(Use official apps or Swiftfin for Jellyfin)*

#### Jellyfin / Swiftfin Settings (Apple TV)

1.  **Open App:** Launch Jellyfin or Swiftfin.
2.  **Settings:** Find **Settings** (Gear icon ⚙️, often via sidebar or user profile).
3.  **Playback:** Choose **Playback**.
4.  **Video Quality:**
    * **Remote Quality:** Set to **Maximum** or the highest bitrate.
    * **Local Quality:** Set to **Maximum** or the highest bitrate.
5.  **Exit Settings.**

#### Plex Settings (Apple TV)

1.  **Open Plex App:** Launch the application.
2.  **Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Video Quality:** Find **Video Quality**.
4.  **Adjust Quality:**
    * **Auto Adjust Quality:** Set to **OFF**.
    * **Home Streaming / Local Quality:** Set to **Maximum**.
    * **Remote Streaming / Internet Quality:** Set to **Maximum**.
5.  **Exit Settings.**

### Roku

*(Use official channels from Roku Channel Store)*

#### Jellyfin Settings (Roku)

1.  **Open Jellyfin Channel:** Launch the channel.
2.  **Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Playback:** Choose **Playback**.
4.  **Video Quality:**
    * **Internet Quality / Remote Quality:** Set to the **highest available option** ("Maximum", "Original", or highest Mbps).
    * **Home Network Quality / Local Quality:** Set to the **highest available option**.
5.  **Direct Play/Stream:** Ensure "Allow Direct Stream" is enabled. "Direct Play" set to Auto is usually fine.
6.  **Exit Settings.**

#### Plex Settings (Roku)

1.  **Open Plex Channel:** Launch the channel.
2.  **Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Video Quality:** Find **Video Quality**.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original**.
    * **Remote Quality:** Set to **Original**.
    * **Direct Play:** Set to **Auto**.
    * **Allow Direct Stream:** Ensure **Enabled** (Checked).
5.  **Exit Settings.**

### LG webOS TVs

*(Use official apps from LG Content Store)*

#### Jellyfin Settings (LG webOS)

1.  **Open Jellyfin App:** Launch the application.
2.  **Settings:** Find **Settings** (Gear icon ⚙️).
3.  **Playback / Video:** Look for **Playback** or **Video** settings.
4.  **Adjust Quality:** Set **Remote Quality** and **Local Quality** to **Maximum** or highest bitrate.
5.  **Enable Direct Play:** Ensure Direct Play options are enabled.
6.  **Exit Settings.**

#### Plex Settings (LG webOS)

1.  **Open Plex App:** Launch the application.
2.  **Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Video:** Find the **Video** settings section.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original**.
    * **Remote Quality:** Set to **Original**.
    * **Allow Direct Play:** Ensure **Enabled** (Checked).
    * **Allow Direct Stream:** Ensure **Enabled** (Checked).
5.  **Exit Settings.**

---

## Mobile Apps (Android / iOS)

Instructions for phones and tablets.

### Android Mobile

*(Use official apps from Google Play Store)*

#### Jellyfin Settings (Android Mobile)

1.  **Open Jellyfin App:** Launch the application.
2.  **Menu:** Tap the **Hamburger icon** (☰) (top-left).
3.  **Settings:** Tap **Settings** (Gear icon ⚙️).
4.  **Playback:** Tap **Playback**.
5.  **Video Quality:**
    * **Max Streaming Bitrate / Remote Bitrate:** Tap and select **Maximum** or highest bitrate.
    * **Home Network Streaming Bitrate / Local Bitrate:** Tap and select **Maximum** or highest bitrate.
6.  **Exit Settings.**

#### Plex Settings (Android Mobile)

1.  **Open Plex App:** Launch the application.
2.  **Menu:** Tap the **Hamburger icon** (☰) or your **Profile icon**.
3.  **Settings:** Tap **Settings** (Gear icon ⚙️).
4.  **Quality:** Find and tap **Quality**.
5.  **Video Quality:**
    * **Remote Streaming:** Tap, select **Show All**, then choose **Maximum**.
    * **Home Streaming:** Tap and select **Maximum** (or Recommended).
    * **Automatically Adjust Quality:** Ensure this is **OFF** (Unchecked).
6.  **Exit Settings.**

### iOS Mobile (iPhone / iPad)

*(Use official Jellyfin app, Swiftfin, or Plex app)*

#### Jellyfin / Swiftfin Settings (iOS Mobile)

1.  **Open App:** Launch Jellyfin or Swiftfin.
2.  **Settings:** Tap the **Settings** tab/icon (Gear icon ⚙️, sometimes under "More").
3.  **Playback:** Tap **Playback**.
4.  **Video Quality:**
    * **Remote Quality:** Set to **Maximum** or highest bitrate.
    * **Local Quality:** Set to **Maximum** or highest bitrate.
5.  **Exit Settings.**

#### Plex Settings (iOS Mobile)

1.  **Open Plex App:** Launch the application.
2.  **Menu:** Tap your **Profile icon**.
3.  **Settings:** Tap **Settings** (Gear icon ⚙️).
4.  **Quality:** Find and tap **Quality**.
5.  **Video Quality:**
    * **Remote Streaming:** Tap, select **Show All**, then choose **Maximum**.
    * **Home Streaming:** Tap and select **Maximum** (or Recommended).
    * **Automatically Adjust Quality:** Ensure this is **OFF** (Toggled off).
6.  **Exit Settings.**

---

## Web Browsers (Computer)

*(Accessing via `https://jellyfin.bladelight.tech` or `app.plex.tv`)*

### Jellyfin Settings (Web Browser)

1.  **Login:** Access `https://jellyfin.bladelight.tech` and log in.
2.  **User Settings:** Click your **User Icon** (top-right) -> **Settings**.
3.  **Playback:** Click **Playback** in the left menu.
4.  **Video Quality:**
    * **Internet Streaming Quality / Remote Quality:** Set to **Maximum** or highest bitrate.
    * **Home Network Quality / Local Quality:** Set to **Maximum** or highest bitrate.
5.  **Save Changes:** Scroll down and click **Save**.

### Plex Settings (Web Browser - app.plex.tv)

1.  **Login:** Access `https://app.plex.tv` and log in.
2.  **Settings:** Click the **Wrench/Spanner icon** (top-right).
3.  **Quality:** Under "Plex Web" (left menu), click **Quality**.
4.  **Video Quality:**
    * **Video quality:** Select **Maximum** from the dropdown.
    * **Automatically adjust quality:** Ensure **Unchecked**.
5.  **Save Changes:** Click **Save Changes**.

---

## Desktop Apps (Windows / macOS / Linux)

*(Dedicated applications often offer the best performance)*

### Jellyfin Media Player (JMP)

*(Recommended official Jellyfin desktop client)*

1.  **Open JMP:** Launch the application.
2.  **Settings:** Click your **User Icon** (top-right) -> **Settings**.
3.  **Playback:** Click **Playback** (left menu).
4.  **Video Quality:**
    * **Internet Streaming Quality / Remote Quality:** Set to **Maximum**.
    * **Home Network Quality / Local Quality:** Set to **Maximum**.
5.  **Player Settings:** Ensure **Hardware Decoding** is **Enabled** or **Auto**.
6.  **Save Changes** (if needed).

### Plex Desktop App / Plex HTPC

*(Official Plex apps from plex.tv)*

1.  **Open Plex App:** Launch the application.
2.  **Settings:** Click your **User Icon** or **Settings icon** (wrench/spanner).
3.  **Quality:** Find **Quality** settings (might be under Player).
4.  **Video Quality:** Set **Video quality** to **Maximum** or **Original**. *(Adjust separate Remote/Local if available)*.
5.  **Save Changes** (if applicable).

---

## Other Clients (Kodi, Game Consoles)

### Kodi

*(Using Jellyfin or Plex add-ons within Kodi)*

#### Jellyfin for Kodi Add-on Settings

1.  **Add-ons:** Go to Kodi's Add-ons section.
2.  **Configure Add-on:** Find Jellyfin add-on -> Context Menu -> **Settings**.
3.  **Playback Settings:** Look for quality/bitrate options -> Set to **Maximum/Original**. Enable **Direct Paths**.
4.  **Save.**

#### Plex for Kodi Add-on Settings

1.  **Add-ons:** Go to Kodi's Add-ons section.
2.  **Configure Add-on:** Find Plex add-on -> Context Menu -> **Settings**.
3.  **Video:** Go to **Video** settings.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original**.
    * **Remote Quality:** Set to **Original**.
    * **Online Quality:** Set to **Original**.
    * **Allow Direct Play/Stream/HEVC:** Enable all (Checked).
5.  **Save.**

### Game Consoles (Xbox / PlayStation)

!!! warning "Limited Jellyfin Support"
    Official Jellyfin client apps for modern Xbox and PlayStation consoles are limited or non-existent currently. You might use the console's web browser (follow Web Browser instructions, but expect limited format support) or potentially DLNA.

#### Plex Settings (Xbox / PlayStation)

1.  **Open Plex App:** Launch the application.
2.  **Settings:** Go to your **User Profile icon** -> **Settings** (Gear icon ⚙️).
3.  **Video Quality / Video:** Find **Video** or **Video Quality**.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original** or **Maximum**.
    * **Remote Quality:** Set to **Original** or **Maximum**.
    * **Allow Direct Play/Stream:** Enable (Checked).
5.  **Exit Settings.**

