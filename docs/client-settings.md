# Client Playback Settings

Setting the correct video quality settings in your client app (the app you use to watch media on your device) is crucial for the best viewing experience and helps the server run efficiently.

**The Goal:** Set **Remote/Internet** and **Local/Home Network** streaming quality to **Maximum** or **Original**.

**Why?** This tells the app to request the highest quality file directly from the server. The server will then only transcode the video (convert it on-the-fly) if absolutely necessary for compatibility with your device, rather than transcoding just because of a low default quality setting. Avoiding unnecessary transcoding means:

* Better picture and sound quality for you.
* Faster start times and seeking (fast-forward/rewind).
* Less processing load on the server, ensuring smoother streams for everyone.

For more details on transcoding, see [Understanding Transcoding](transcoding-explained.md).

!!! warning "Settings are Per-Client"
    These quality settings are specific to **each individual app and device**. You need to check and adjust them the first time you use a new app or device to connect to the server. Settings do not sync automatically between different apps (e.g., settings on your phone app don't affect your TV app).

Find your device or app type below for specific instructions for both Jellyfin and Plex (during the transition).

---

## TV Apps (Android TV / Google TV / Fire TV / Apple TV / Roku / LG)

These instructions cover apps running directly on smart TVs or dedicated streaming devices.

### Android TV / Google TV / Amazon Fire TV

These devices typically use the official Jellyfin or Plex apps available from the Google Play Store or Amazon Appstore.

#### Jellyfin Settings (Android TV / Fire TV)

1.  **Open Jellyfin App:** Launch the Jellyfin application.
2.  **Navigate to Settings:** Use your remote to navigate to the **Settings** menu (often a **Gear icon** ⚙️, typically in the sidebar or under your user profile).
3.  **Select Playback:** Within Settings, find and select the **Playback** or **Client Settings** > **Playback** section.
4.  **Adjust Video Quality:**
    * **Maximum Streaming Bitrate / Remote Bitrate:** Set to the **highest possible value** or **Maximum** / **Auto**. (Prefer "Maximum" if available).
    * **Home Network Streaming Bitrate / Local Bitrate:** Set to the **highest possible value** or **Maximum** / **Auto**. (Prefer "Maximum" if available).
5.  **Check Direct Play:** Ensure settings like "Allow Direct Play" are **enabled**.
6.  **Exit Settings:** Settings usually save automatically.

#### Plex Settings (Android TV / Fire TV)

1.  **Open Plex App:** Launch the Plex application.
2.  **Navigate to Settings:** Use your remote to navigate to your **User Profile icon** (usually top left or right) and select **Settings** (Gear icon ⚙️).
3.  **Select Video Quality:** Find the **Video Quality** section.
4.  **Adjust Quality:**
    * **Adjust automatically:** Set to **OFF**.
    * **Home streaming / Local Quality:** Set to **Maximum** or **Original**.
    * **Remote streaming / Internet Quality:** Set to **Maximum** or **Original**.
    * **Quality Suggestions:** Set to **OFF** (if option exists).
5.  **Exit Settings:** Settings are usually saved automatically.

### Apple TV

Use the official Jellyfin or Plex apps from the Apple TV App Store. (For Jellyfin, consider also [Swiftfin](https://github.com/jellyfin/Swiftfin) if available).

#### Jellyfin Settings (Apple TV)

1.  **Open Jellyfin/Swiftfin App:** Launch the application.
2.  **Navigate to Settings:** Find the **Settings** menu (usually a **Gear icon** ⚙️, often accessible via a sidebar or user profile).
3.  **Select Playback:** Choose the **Playback** settings section.
4.  **Adjust Video Quality:**
    * **Remote Quality:** Set to **Maximum** or the highest bitrate.
    * **Local Quality:** Set to **Maximum** or the highest bitrate.
5.  **Exit Settings.**

#### Plex Settings (Apple TV)

1.  **Open Plex App:** Launch the application.
2.  **Navigate to Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Select Video Quality:** Find the **Video Quality** section.
4.  **Adjust Quality:**
    * **Auto Adjust Quality:** Set to **OFF**.
    * **Home Streaming / Local Quality:** Set to **Maximum**.
    * **Remote Streaming / Internet Quality:** Set to **Maximum**.
5.  **Exit Settings.**

### Roku

Use the official Jellyfin or Plex channels from the Roku Channel Store.

#### Jellyfin Settings (Roku)

1.  **Open Jellyfin Channel:** Launch the Jellyfin channel.
2.  **Navigate to Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Select Playback:** Choose the **Playback** section.
4.  **Adjust Video Quality:**
    * **Internet Quality / Remote Quality:** Set to the **highest available option** ("Maximum", "Original", or highest Mbps).
    * **Home Network Quality / Local Quality:** Set to the **highest available option**.
5.  **Check Direct Play/Stream:** Ensure "Allow Direct Stream" is enabled or "Direct Play" is set to Auto/Forced if needed (Roku can be particular). Start with just quality settings first.
6.  **Exit Settings.**

#### Plex Settings (Roku)

1.  **Open Plex Channel:** Launch the Plex channel.
2.  **Navigate to Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Select Video Quality:** Find the **Video Quality** section.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original**.
    * **Remote Quality:** Set to **Original**.
    * **Direct Play:** Set to **Auto** (usually best) or **Forced** if you understand the implications.
    * **Allow Direct Stream:** Ensure **Enabled** (Checked).
5.  **Exit Settings.**

### LG webOS TVs

Use the official Jellyfin or Plex apps from the LG Content Store.

#### Jellyfin Settings (LG webOS)

*(Note: The Jellyfin LG app might have slightly different menu layouts)*
1.  **Open Jellyfin App:** Launch the application.
2.  **Navigate to Settings:** Find the **Settings** menu (Gear icon ⚙️), likely under your user profile or in a main menu.
3.  **Select Playback / Video:** Look for **Playback** or **Video** settings.
4.  **Adjust Quality:** Set **Remote Quality** and **Local Quality** (or similar terms) to **Maximum** or the highest available bitrate.
5.  **Enable Direct Play:** Ensure any Direct Play options are enabled.
6.  **Exit Settings.**

#### Plex Settings (LG webOS)

1.  **Open Plex App:** Launch the application.
2.  **Navigate to Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Select Video:** Find the **Video** settings section.
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

Use the official Jellyfin or Plex apps from the Google Play Store.

#### Jellyfin Settings (Android Mobile)

1.  **Open Jellyfin App:** Launch the application.
2.  **Open Menu:** Tap the **Hamburger icon** (☰) in the top-left.
3.  **Navigate to Settings:** Tap **Settings** (Gear icon ⚙️).
4.  **Select Playback:** Tap **Playback**.
5.  **Adjust Quality:**
    * **Max Streaming Bitrate / Remote Bitrate:** Tap and select **Maximum** or the highest bitrate.
    * **Home Network Streaming Bitrate / Local Bitrate:** Tap and select **Maximum** or the highest bitrate.
6.  **Exit Settings.**

#### Plex Settings (Android Mobile)

1.  **Open Plex App:** Launch the application.
2.  **Open Menu:** Tap the **Hamburger icon** (☰) or your **Profile icon**.
3.  **Navigate to Settings:** Tap **Settings** (Gear icon ⚙️).
4.  **Select Quality:** Find and tap **Quality**.
5.  **Adjust Video Quality:**
    * **Remote Streaming:** Tap, select **Show All**, then choose **Maximum**.
    * **Home Streaming:** Tap and select **Maximum** (or Recommended if Maximum isn't shown directly).
    * **Automatically Adjust Quality:** Ensure this is **OFF** (Unchecked).
6.  **Adjust Music Quality (Optional):** Set Remote/Home streaming for music to Maximum if desired.
7.  **Exit Settings.**

### iOS Mobile (iPhone / iPad)

Use the official Jellyfin app, Swiftfin (recommended alternative), or Plex app from the Apple App Store.

#### Jellyfin / Swiftfin Settings (iOS Mobile)

*(Steps are similar for both apps)*
1.  **Open App:** Launch Jellyfin or Swiftfin.
2.  **Navigate to Settings:** Tap the **Settings** tab or icon (often a **Gear icon** ⚙️, sometimes under "More").
3.  **Select Playback:** Tap **Playback**.
4.  **Adjust Quality:**
    * **Remote Quality:** Set to **Maximum** or highest bitrate.
    * **Local Quality:** Set to **Maximum** or highest bitrate.
5.  **Exit Settings.**

#### Plex Settings (iOS Mobile)

1.  **Open Plex App:** Launch the application.
2.  **Open Menu:** Tap your **Profile icon**.
3.  **Navigate to Settings:** Tap **Settings** (Gear icon ⚙️).
4.  **Select Quality:** Find and tap **Quality**.
5.  **Adjust Video Quality:**
    * **Remote Streaming:** Tap, select **Show All**, then choose **Maximum**.
    * **Home Streaming:** Tap and select **Maximum** (or Recommended).
    * **Automatically Adjust Quality:** Ensure this is **OFF** (Toggled off).
6.  **Exit Settings.**

---

## Web Browsers (Chrome, Firefox, Edge, Safari)

When accessing the server directly via `https://jellyfin.bladelight.tech` or the Plex web app (`app.plex.tv`).

### Jellyfin Settings (Web Browser)

1.  **Login:** Access `https://jellyfin.bladelight.tech` and log in.
2.  **Open User Settings:** Click your **User Icon** (top-right).
3.  **Select Settings:** Choose **Settings** from the dropdown.
4.  **Select Playback:** Click **Playback** in the left menu.
5.  **Adjust Quality:**
    * **Internet Streaming Quality / Remote Quality:** Set to **Maximum** or highest bitrate.
    * **Home Network Quality / Local Quality:** Set to **Maximum** or highest bitrate.
6.  **Save Changes:** Scroll down and click **Save**.

### Plex Settings (Web Browser - app.plex.tv)

1.  **Login:** Access `https://app.plex.tv` and log in.
2.  **Open Settings:** Click the **Wrench/Spanner icon** (top-right).
3.  **Select Quality:** Under the "Plex Web" section in the left menu, click **Quality**.
4.  **Adjust Video Quality:**
    * **Video quality:** Select **Maximum** from the dropdown.
    * **Automatically adjust quality:** Ensure this is **Unchecked**.
5.  **Save Changes:** Click **Save Changes** at the bottom.

---

## Desktop Apps (Windows / macOS / Linux)

Using dedicated desktop applications often provides the best performance and codec support.

### Jellyfin Media Player (JMP)

The recommended official Jellyfin desktop client.

1.  **Open JMP:** Launch the application.
2.  **Open Settings:** Click your **User Icon** (top-right).
3.  **Select Settings:** Choose **Settings**.
4.  **Select Playback:** Click **Playback** in the left menu.
5.  **Adjust Quality:**
    * **Internet Streaming Quality / Remote Quality:** Set to **Maximum**.
    * **Home Network Quality / Local Quality:** Set to **Maximum**.
6.  **Check Player Settings:**
    * **Hardware Decoding:** Ensure **Enabled** or **Auto**.
7.  **Save Changes:** Click **Save** if needed.

### Plex Desktop App / Plex HTPC (Windows / macOS)

Use the official Plex apps downloaded from plex.tv.

1.  **Open Plex App:** Launch the application.
2.  **Open Settings:** Click your **User Icon** (top-right) OR the **Settings icon** (wrench/spanner).
3.  **Select Quality:** Find the **Quality** settings section (might be under Player or General).
4.  **Adjust Video Quality:**
    * **Video quality:** Set to **Maximum** or **Original**.
    * *(Look for separate Remote/Local settings if available and set both to Maximum/Original)*.
5.  **Save Changes** (if applicable).

---

## Other Clients (Kodi, Game Consoles)

### Kodi

If using Kodi with Jellyfin or Plex add-ons.

#### Jellyfin for Kodi Add-on Settings

1.  **Navigate to Add-ons:** Go to the Add-ons section in Kodi.
2.  **Configure Jellyfin Add-on:** Find the Jellyfin add-on, open its context menu (long-press or 'C' key) and select **Settings**.
3.  **Adjust Playback Settings:** Look for Playback or Streaming quality options within the add-on settings. Set options related to bitrate or quality to **Maximum** or **Original**. Enable **Direct Paths** if available.
4.  **Save Settings.**

#### Plex for Kodi Add-on Settings

1.  **Navigate to Add-ons:** Go to the Add-ons section in Kodi.
2.  **Configure Plex Add-on:** Find the Plex add-on, open its context menu and select **Settings**.
3.  **Select Video:** Go to the **Video** settings section within the add-on.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original**.
    * **Remote Quality:** Set to **Original**.
    * **Online Quality:** Set to **Original**.
    * **Allow Direct Play:** Enable (Checked).
    * **Allow Direct Stream:** Enable (Checked).
    * **Allow HEVC (h265):** Enable (Checked).
5.  **Save Settings.**

### Game Consoles (Xbox / PlayStation)

Official Jellyfin clients for modern Xbox and PlayStation consoles are currently limited or non-existent. Access is typically via the built-in web browser (follow Web Browser instructions) which may have limited codec support, or potentially via unofficial methods or DLNA (which doesn't use these app settings).

#### Plex Settings (Xbox / PlayStation)

1.  **Open Plex App:** Launch the application.
2.  **Navigate to Settings:** Go to your **User Profile icon** and select **Settings** (Gear icon ⚙️).
3.  **Select Video Quality / Video:** Find the **Video** or **Video Quality** settings.
4.  **Adjust Quality:**
    * **Local Quality:** Set to **Original** or **Maximum**.
    * **Remote Quality:** Set to **Original** or **Maximum**.
    * **Allow Direct Play:** Enable (Checked).
    * **Allow Direct Stream:** Enable (Checked).
5.  **Exit Settings.**

---

By ensuring these settings are configured correctly across your devices, you'll get the best possible streaming experience from the server.
