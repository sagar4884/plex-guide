---
title: Introduction
---

#

![Logo](assets/images/guide-logo-dark.webp#only-dark)
![Logo](assets/images/guide-logo-light.webp#only-light)

This guide details common tasks you'll need to perform when joining my media server for the first time or troubleshooting issues. The content herein should answer 99% of your questions, though you're always welcome to ask me directly. While this guide primarily shows screenshots from a web browser, you can make configuration changes from most client apps (mobile, smart TV, or game console). If you have trouble finding a particular setting, switching to a web browser to make the changes is often easier. Most settings sync across your devices once configured, with one important exception: **streaming quality must be set separately the first time you log into each new client application.**
<br><br>
While you don't need to read this guide from start to finish, new users should at least review the essential sections on [Connecting to the Server](connecting.md), understanding [Client Playback Settings](client-settings.md), how to [Request Content & Report Issues](requests-and-issues.md), and the direct link to [Request Content via Request Tool](https://request.bladelight.tech).

<div id="plex-countdown" style="font-size: 1.5em; font-weight: bold; text-align: center; margin-top: 20px; color: red;"></div>

<script>
var countDownDate = new Date("July 1, 2025 00:00:00").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Check if the element exists before trying to update it
  var countdownElement = document.getElementById("plex-countdown");
  if (countdownElement) {
      countdownElement.innerHTML = "Plex Decommissioned in: " + days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(x);
        countdownElement.innerHTML = "Plex Decommissioned";
      }
  } else {
      // If element doesn't exist, stop the interval
      clearInterval(x);
  }
}, 1000);
</script>

<br>
Wondering why we're moving away from Plex? Read about [the advantages of Jellyfin vs. Plex](why-jellyfin.md).

