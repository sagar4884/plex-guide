# Understanding Transcoding

You'll often see references in this guide to "avoiding unnecessary transcoding" or setting quality to "Maximum" or "Original". But what does transcoding actually mean, and why is it important for your streaming experience?

[TOC]

## What is Transcoding?

Think of transcoding like **real-time translation** for media files. When you hit play on a movie or TV show, the server (Jellyfin *Parvati* or Plex *Mahadev*) checks if the original file can be understood directly by your playback device (your TV, phone, browser, etc.).

If the original file *is* compatible, the server sends it directly – this is called **Direct Play** or **Direct Stream**. This is the ideal scenario for the best quality and performance.

If the original file is *not* fully compatible, the server needs to convert parts of it (or the whole thing) on-the-fly into a format your device *can* understand. This real-time conversion process is called **Transcoding**. It happens on the server using its powerful CPU (Threadripper 2950X) and/or GPU (RTX 2080 Super) before the data is sent to your device.

## Why Does Transcoding Happen?

Transcoding is a necessary feature for compatibility, but it's good to know why it might occur:

1.  **Video Codec Incompatibility:** Your device might not support the original video format (e.g., playing a modern HEVC/H.265 file on an older device that only understands H.264).
2.  **Audio Codec Incompatibility:** Your device or sound system might not support the original audio format (e.g., complex surround sound like DTS-HD MA might be converted to stereo AAC).
3.  **Container Incompatibility:** Sometimes the file container (like MKV) isn't supported, even if the video/audio inside it are. The server might repackage it ("remux") into a different container (like MP4) – this is often called **Direct Streaming** and uses fewer resources than full video transcoding.
4.  **Bandwidth Limitations:** Your internet connection speed (especially when streaming remotely from outside your home) might be lower than the bitrate (data rate) of the original file. The server transcodes the video to a lower bitrate/quality to prevent buffering.
5.  **Subtitle Burn-in:** Image-based subtitles (like PGS found on Blu-rays) often require "burning" into the video picture, which forces a video transcode. Text-based subtitles (like SRT) are usually preferred as they rarely require transcoding.
6.  **Client Quality Settings:** If your client app is manually set to request a lower quality/bitrate than the original file, the server **will** transcode to meet that request, even if Direct Play was possible. **This is the main reason we ask you to set quality settings to Maximum/Original in the [Client Playback Settings](client-settings.md) guide.**

## Why Avoid Unnecessary Transcoding?

While the server is built to handle transcoding when needed, **Direct Play** or **Direct Stream** is always better if possible:

* **Best Quality:** You get the original, untouched video and audio exactly as intended. Transcoding always involves some quality loss (like making a copy of a copy).
* **Faster Performance:** Playback starts faster, and seeking (fast-forward/rewind) is much smoother.
* **Lower Server Load:** Direct Play uses minimal server resources. Transcoding uses significant CPU/GPU power; reducing unnecessary transcoding keeps the server responsive for everyone.
* **Better Subtitle Compatibility:** Using text-based subtitles (SRT) often allows the video and audio to Direct Play.

## What You Can Do

Your primary action is simple:

* **Set Client Quality to Maximum:** Follow the instructions in the [Client Playback Settings](client-settings.md) guide for all your devices. This prevents the *client* from unnecessarily requesting a transcode.

Other helpful factors:

* **Use Capable Clients:** Modern streaming devices (Nvidia Shield, Apple TV 4K, Fire TV Cube) and dedicated desktop apps (Jellyfin Media Player) generally support more formats (codecs/containers) than web browsers or older devices, leading to more Direct Play.
* **Choose Text Subtitles:** When available, select SRT (or ASS) subtitles instead of PGS or VOBSUB to reduce the chance of subtitle burn-in causing a transcode.
* **Understand Bandwidth:** For smooth remote streaming of high-quality files (especially 4K), you need sufficient download speed at your end. If your connection is slow, transcoding to a lower bitrate might be unavoidable (and necessary) for a buffer-free experience.

By setting your clients correctly, you help ensure you get the best quality stream possible most of the time!

---

## Glossary of Terms

* **Bitrate:** The amount of data used per second to represent the video or audio. Higher bitrate generally means higher quality but requires more bandwidth. Measured in Mbps (Megabits per second) or kbps (kilobits per second).
* **Client:** The app or device you use to watch media (e.g., Jellyfin app on your Fire TV, Plex app on your phone, a web browser).
* **Codec (Coder-Decoder):** The specific format used to compress and decompress video (e.g., H.264/AVC, H.265/HEVC, AV1, VP9) or audio (e.g., AAC, AC3, DTS, Opus, FLAC). Your client needs to support the codec to Direct Play.
* **Container:** The file format that holds the video, audio, and subtitle streams together (e.g., MKV, MP4, AVI). Sometimes the container itself isn't compatible, even if the streams inside are.
* **Direct Play:** The ideal scenario. The server sends the original file directly to your client without any modification because the client supports the container, video codec, audio codec, and subtitles directly. Uses minimal server resources.
* **Direct Stream:** A partial conversion. The server sends the original video and/or audio streams, but repackages them into a different container format (remuxing) that the client supports. Uses minimal server resources, much less than transcoding.
* **Remuxing:** The process of changing the container format without re-encoding the video or audio streams inside. Part of Direct Streaming.
* **Server:** The computer running the Jellyfin (*Parvati*) or Plex (*Mahadev*) software that organizes and serves your media files (in this case, the Unraid machine).
* **Subtitles (Image-based):** Subtitles stored as pictures, like PGS (from Blu-rays) or VOBSUB (from DVDs). These often require transcoding to "burn" them into the video image for display.
* **Subtitles (Text-based):** Subtitles stored as text with timing information, like SRT or ASS. Clients can usually display these directly over the video without requiring a transcode.
* **Transcoding:** The process of converting the video and/or audio stream(s) on-the-fly from the original format/codec/bitrate to a different one that is compatible with the client device or fits within bandwidth limits. This is resource-intensive on the server.

