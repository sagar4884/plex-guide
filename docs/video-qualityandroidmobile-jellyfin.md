# Setting Video Quality (Android Mobile App)

To get the best video quality from the Jellyfin server on your Android phone or tablet, you should adjust the streaming quality settings within the official Jellyfin app.

1.  **Open Jellyfin App:** Launch the Jellyfin application on your Android device.
2.  **Open Sidebar Menu:** Tap the **Hamburger icon** (three horizontal lines ☰) typically located in the top-left corner.
3.  **Navigate to Settings:** In the menu that slides out, tap on **Settings** (usually represented by a **Gear icon** ⚙️).
4.  **Select Playback:** Within the Settings menu, find and tap on the **Playback** section.
5.  **Adjust Video Quality:** Look for the quality settings:
    * **Max Streaming Bitrate / Remote Bitrate:** This controls quality when streaming over mobile data or external Wi-Fi. Tap on it and select the **highest available bitrate** (e.g., 120 Mbps or higher) or an option labeled **Maximum**.
    * **Home Network Streaming Bitrate / Local Bitrate:** This controls quality when connected to your home Wi-Fi. Tap on it and select the **highest available bitrate** or **Maximum**.
6.  **Check Other Settings (Optional but Recommended):**
    * **Prefer fMP4-HLS container:** Enabling this can sometimes improve compatibility or performance.
    * **Video Player:** You might have options like "Integrated" or "Web player". The integrated player is often preferred.
7.  **Exit Settings:** Settings usually save automatically. Navigate back out of the settings menu.

Setting these to maximum ensures the app requests the original file quality, minimizing unnecessary transcoding by the server.
