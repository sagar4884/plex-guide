# Selecting Audio Tracks & Subtitles

Many movies and shows include multiple audio tracks (e.g., different languages, commentary tracks) or subtitle options. Here's how to select them during playback in common Jellyfin clients.

!!! note "Availability Varies"
    The specific audio tracks and subtitles available depend entirely on the source file for the media item. Not all content will have multiple options.

## During Playback Controls

The most common way to change tracks is using the **playback overlay menu** that appears when you pause the video or interact with the screen/remote during playback.

### Jellyfin Web Player / Desktop App (JMP)

1.  **Start Playback:** Begin watching your movie or episode.
2.  **Access Controls:** Move your mouse over the video player area or tap the screen. Playback controls should appear (Play/Pause, Volume, Timeline, etc.).
3.  **Find Settings/Cog Icon:** Look for a **Gear icon** (⚙️) or sometimes a **speech bubble icon** within the playback controls, often near the bottom right.
4.  **Select Tracks:** Clicking this icon should open a menu where you can select:
    * **Audio:** Choose from available audio tracks (e.g., "English DTS", "English AAC Stereo", "Spanish AC3", "Commentary").
    * **Subtitles:** Choose from available subtitle tracks (e.g., "English SRT", "English PGS", "Spanish SRT") or select "None" to turn them off. You might also find options here to adjust subtitle appearance (size, color, offset) if supported by the client.
5.  **Changes Apply Immediately:** Your selection should take effect right away.

### TV Apps (Android TV / Fire TV / Roku / etc.)

1.  **Start Playback:** Begin watching your media.
2.  **Access Playback Menu:** Press the **Down** arrow, **OK/Select**, or sometimes an **Options/Menu** button on your physical remote control. This usually brings up the on-screen playback controls and timeline.
3.  **Navigate to Settings/Options:** Look for an on-screen **Gear icon** (⚙️), **Subtitles icon**, or **Audio icon**. Navigate to it using your remote's directional buttons.
4.  **Select Tracks:** Press **OK/Select** on the appropriate icon. You should see lists of available **Audio Tracks** and **Subtitle Tracks**.
5.  **Choose Desired Track:** Highlight the track you want and press **OK/Select**.
6.  **Exit Menu:** Navigate back to the main playback screen. The change should apply.

### Mobile Apps (Android / iOS / Swiftfin)

1.  **Start Playback:** Begin watching your media.
2.  **Tap Screen:** Tap the screen once to bring up the playback controls overlay.
3.  **Find Settings/Options Icon:** Look for a **Gear icon** (⚙️) or sometimes separate icons for **Audio** and **Subtitles** (like a speech bubble) within the overlay, often in the top or bottom corner.
4.  **Select Tracks:** Tap the relevant icon to open the selection menu for Audio or Subtitles.
5.  **Choose Track:** Tap the desired audio language or subtitle track (or "None").
6.  **Close Menu:** Tap outside the menu or on a close button. The selection should take effect.

!!! tip "Text vs. Image Subtitles"
    As mentioned in [Understanding Transcoding](transcoding-explained.md#why-does-transcoding-happen), text-based subtitles (like **SRT** or **ASS**) are generally preferred as they are less likely to cause video transcoding than image-based subtitles (like **PGS** or **VOBSUB**). If both types are available, try the text-based ones first for potentially smoother playback.

By using these controls, you can easily switch languages or enable subtitles to enhance your viewing experience.
