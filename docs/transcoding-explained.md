# Understanding Transcoding

You'll often see references in this guide to "avoiding unnecessary transcoding" or setting quality to "Maximum" or "Original". But what does transcoding actually mean, and why is it important?

## What is Transcoding?

Think of transcoding like **real-time translation** for media files. When you hit play on a movie or TV show, the server (Plex or Jellyfin running on the Unraid machine) checks if the original file can be understood directly by your playback device (your TV, phone, browser, etc.).

If the original file *is* compatible, the server sends it directly – this is called **Direct Play** or **Direct Stream**. This is the ideal scenario.

If the original file is *not* fully compatible, the server needs to convert parts of it (or the whole thing) on-the-fly into a format your device *can* understand. This real-time conversion process is called **Transcoding**. It happens on the server using its CPU (the powerful Threadripper 2950X) or GPU (the RTX 2080 Super) before the data is sent to your device.

## Why Does Transcoding Happen?

Transcoding isn't inherently bad – it's a necessary feature for ensuring compatibility across a wide range of devices. It typically occurs for one or more of these reasons:

1.  **Video Codec Incompatibility:** Your device might not support the original video format (e.g., playing a modern HEVC/H.265 file on an older device that only understands H.264).
2.  **Audio Codec Incompatibility:** Your device or sound system might not support the original audio format (e.g., complex surround sound formats like DTS-HD MA or TrueHD might be transcoded to simpler formats like AAC or AC3).
3.  **Container Incompatibility:** Sometimes the file container (like MKV) isn't supported, even if the video/audio inside it are. The server might repackage it into a different container (like MP4) – this is often called "Direct Streaming" and uses fewer resources than full video transcoding.
4.  **Bandwidth Limitations:** Your internet connection speed (especially when streaming remotely) might be lower than the bitrate (data rate) of the original file. The server transcodes the video to a lower bitrate/quality to prevent buffering.
5.  **Subtitle Burn-in:** Image-based subtitles (like PGS found on Blu-rays, or VOBSUB from DVDs) usually cannot be displayed directly by clients. The server often has to "burn" them into the video picture, which requires transcoding the video stream. Text-based subtitles (like SRT or ASS) are usually preferred as they rarely require transcoding.
6.  **Client Quality Settings:** If your client app is manually set to request a lower quality than the original file (e.g., set to "720p" when the file is 1080p), the server *will* transcode to meet that request, even if Direct Play was possible. **This is the main reason we ask you to set quality settings to Maximum/Original.**

## Why Avoid Unnecessary Transcoding?

While the server is powerful enough to handle necessary transcoding, avoiding *unnecessary* transcoding (especially the kind caused by incorrect client settings) is better for several reasons:

* **Best Quality:** Direct Play/Stream sends the original, untouched file, giving you the absolute best video and audio quality the file has to offer. Transcoding always involves some degree of quality loss, particularly for video.
* **Faster Performance:** Starting playback and seeking (fast-forwarding/rewinding) are generally much faster with Direct Play/Stream because the server doesn't need to perform complex conversions first.
* **Lower Server Load:** Transcoding is computationally intensive, using significant CPU or GPU resources. While your server hardware is robust, reducing unnecessary load ensures smoother performance for all simultaneous users.
* **Better Subtitle Compatibility:** Using text-based subtitles (SRT, ASS) often allows the video and audio to Direct Play/Stream.

## What You Can Do

Your primary action is simple:

* **Set Client Quality to Maximum:** Follow the instructions in the [Client Playback Settings](client-settings.md) guide for all your devices. This tells the apps *not* to request a lower quality unnecessarily.

Other things that help (but are less critical than the quality setting):

* **Use Capable Clients:** Devices like the Nvidia Shield Pro, modern Apple TVs, or the official desktop apps (Jellyfin Media Player, Plex Desktop) generally have excellent codec support and are more likely to Direct Play files than web browsers or older/cheaper streaming sticks.
* **Choose Text Subtitles:** When you have a choice, select SRT or ASS subtitles instead of PGS or VOBSUB if you want to minimize the chance of transcoding being triggered by subtitles.
* **Understand Bandwidth Needs:** For high-bitrate 4K HDR files, a fast and stable internet connection (both server-side upload and client-side download) is needed for smooth remote Direct Play. If your connection is limited, transcoding might be unavoidable (and necessary) for a buffer-free experience.

By setting your clients correctly, you allow the server to intelligently decide when transcoding is truly needed, giving you the best possible experience most of the time.
