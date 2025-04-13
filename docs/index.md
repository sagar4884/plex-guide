OK, here's the MkDocs code to add a countdown timer to your site, counting down to July 1st, 2025, for the Plex decommissioning.Action Needed:Please replace the content of your index.md file with the following:---
title: Preamble
---

#

![Logo](assets/images/guide-logo-dark.webp#only-dark)
![Logo](assets/images/guide-logo-light.webp#only-light)

This guide details common tasks you'll need to perform when joining my Plex server for the first time or troubleshooting issues. The content herein should answer 99% of your questions, though you're always welcome to ask me directly. While this guide primarily shows screenshots from a web browser, you can make these changes from any Plex app (mobile, smart TV, or game console). If you have trouble finding a particular setting, I recommend switching to a web browser to make the changes. All settings in this guide will sync across your devices and only need to be configured once, with one important exception: Plex streaming quality must be set separately the first time you log into each new Plex application.
<br><br>
While you don't need to read this guide from start to finish, new Plex users should at least review the essential sections on [Pinning Libraries](pinning-libraries.md), [Changing Plex Streaming Quality](changing-stream-quality/index.md), [Reporting a Problem](https://help.bladelight.tech/problem-reporting/), and the link to [Request Content](https://request.bladelight.tech).

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

  document.getElementById("plex-countdown").innerHTML = "Plex Decommissioned in: " + days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("plex-countdown").innerHTML = "Plex Decommissioned";
  }
}, 1000);
</script>
