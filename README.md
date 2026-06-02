# 🧠 VoluMind — Smart Auto Volume Normalizer

A Chrome browser extension that automatically normalizes 
audio loudness across all websites in real time.

No more manually adjusting volume every time you switch videos.

## Features
- Real-time loudness measurement using Web Audio API
- Learns your preferred volume from manual adjustments
- Per-site volume preferences (YouTube, Netflix, etc.)
- On-screen visual overlay showing every auto-adjustment
- Works on all websites with video or audio

## Tech Stack
JavaScript · Web Audio API · Chrome Extensions MV3 · HTML5 · CSS3

## How to Install
1. Clone this repo
2. Go to `chrome://extensions`
3. Enable Developer Mode
4. Click "Load unpacked" → select this folder

## How it Works
VoluMind hooks into every `<video>` and `<audio>` element using 
the Web Audio API. It measures RMS loudness in real time, 
compares it to your personal comfort target, and applies 
a smooth gain correction automatically.
