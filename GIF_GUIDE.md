# 🎬 HOW TO ADD ANIMATED GIFS & ILLUSTRATIONS

This guide shows you where to find **FREE** animated GIFs and how to add them to your Valentine's proposal page!

---

## 📥 WHERE TO DOWNLOAD FREE ANIMATED GIFS

### 1. **GIPHY** (Best for GIFs) - https://giphy.com
- Search for: "heart animated", "love gif", "rose animated", "sparkle gif", "couple love"
- Download: Click GIF → "Download" → Choose "GIF" format
- **Best searches:**
  - `heart beating gif`
  - `animated rose gif`
  - `love couple animated`
  - `sparkles gif`
  - `rainbow animated`

### 2. **Tenor** - https://tenor.com
- Similar to GIPHY
- Search: "animated heart", "love sticker", "valentine gif"
- Download: Right-click → "Save image as..."

### 3. **Lottie Files** (Smooth JSON Animations) - https://lottiefiles.com
- High-quality animated illustrations
- Search: "heart", "love", "couple", "romance"
- Free downloads available
- **Note:** These are JSON files, not GIFs (more advanced, optional)

### 4. **Freepik** - https://www.freepik.com
- Search: "love animation gif", "heart gif", "couple illustration animated"
- Filter by: "Free" + "GIF"
- Requires free account

### 5. **Flaticon** - https://www.flaticon.com/animated-icons
- Animated icon GIFs
- Search: "heart", "love", "sparkle", "rose"
- Free with attribution (or Premium)

---

## 📂 FILE STRUCTURE

Place your GIF files in these folders:

```
valentine-s-spark/
├── assets/
│   ├── gifs/              ← Put floating heart/confetti GIFs here
│   │   ├── heart1.gif
│   │   ├── heart2.gif
│   │   ├── heart3.gif
│   │   ├── heart4.gif
│   │   ├── rose.gif
│   │   ├── sparkle.gif
│   │   ├── lightning.gif
│   │   ├── rainbow.gif
│   │   └── strong.gif
│   │
│   └── illustrations/     ← Put large section GIFs here
│       ├── hero-heart.gif (big animated heart for hero)
│       ├── couple.gif (couple hugging/kissing animation)
│       └── celebration.gif
```

---

## 🎯 WHICH GIFS YOU NEED

### **Required GIFs** (for floating animations):
1. **heart1.gif** - Red/pink beating heart
2. **heart2.gif** - Sparkly heart
3. **heart3.gif** - Heart with wings
4. **heart4.gif** - Simple animated heart
5. **rose.gif** - Animated rose

### **Timeline GIFs** (optional but recommended):
6. **sparkle.gif** - For "2019" timeline (where it began)
7. **rose.gif** - For "2020-2021" timeline
8. **lightning.gif** - For "2022" timeline (storms)
9. **strong.gif** - For "2023" timeline (strength)
10. **rainbow.gif** - For "2024" timeline (hope)
11. **sparkles.gif** - For "2025" timeline (joy)
12. **gift-heart.gif** - For "2026" timeline (forever)

### **Section Illustrations** (optional):
13. **hero-heart.gif** - Large animated heart for hero section (100-150px)
14. **couple.gif** - Couple hugging/kissing for anniversary section (150-200px)

---

## 🔧 HOW TO ADD GIFS TO YOUR PAGE

### Step 1: Download GIFs
Go to GIPHY or Tenor, search for the animations you want, and download them.

### Step 2: Rename & Place Files
- Rename your GIFs to match the names above
- Put them in the `assets/gifs/` folder

### Step 3: Enable GIF Mode
Open `script.js` and change line 16:
```javascript
const USE_GIFS = true; // Change from false to true!
```

### Step 4: (Optional) Replace Individual GIFs
You can also manually enable specific GIFs by uncommenting lines in `index.html`:

**Hero Section Heart:**
```html
<!-- Uncomment this line: -->
<img src="assets/illustrations/hero-heart.gif" alt="heart" class="hero-heart-gif">
```

**Timeline Icons:**
```html
<!-- Uncomment these lines: -->
<img src="assets/gifs/sparkle.gif" alt="sparkle" class="timeline-gif">
```

---

## 💡 RECOMMENDED GIF SIZES

- **Floating hearts**: 30-50px width (small, fast loading)
- **Timeline icons**: 30-40px (fits in circles)
- **Section illustrations**: 100-200px (big, eye-catching)
- **Hero heart**: 120-180px (main attraction)

---

## 🎨 SPECIFIC GIF RECOMMENDATIONS

### For Floating Hearts:
- Search GIPHY: `heart beating transparent`
- Look for: **PNG/GIF with transparent background**
- Colors: Red, pink, gold

### For Timeline:
- 2019 (Start): Sparkle/star burst gif
- 2020-21 (Love): Rose blooming gif
- 2022 (Storm): Lightning/rain gif
- 2023 (Strong): Flexing bicep / strong emoji gif
- 2024 (Bond): Rainbow / infinity symbol gif
- 2025 (Joy): Sparkles / confetti gif
- 2026 (Forever): Gift box with heart gif

### For Sections:
- **Hero**: Giant glowing/beating heart
- **Anniversary**: Couple hugging animation
- **Proposal**: Fireworks / celebration gif

---

## ⚡ QUICK START (5 Minutes)

1. Go to https://giphy.com
2. Search: `heart animated transparent`
3. Download 5 different heart GIFs
4. Rename them: `heart1.gif`, `heart2.gif`, `heart3.gif`, `heart4.gif`, `rose.gif`
5. Put them in `assets/gifs/` folder
6. Open `script.js`, change `USE_GIFS = true`
7. Refresh your page → See animated GIFs! 🎉

---

## 🆘 TROUBLESHOOTING

**GIFs not showing?**
- Check file paths are correct
- Ensure `USE_GIFS = true` in script.js
- Make sure GIF files are in the right folder
- Try opening a GIF directly in browser (paste path in URL bar)

**GIFs too big/slow?**
- Use online GIF compressor: https://ezgif.com/optimize
- Target: Under 500KB per GIF for best performance

**Want Lottie animations instead?**
- Lottie = smoother, smaller files
- Requires extra library (more advanced)
- Let me know if you want help setting this up!

---

## 📌 TIPS

✅ Use **transparent background** GIFs for floating hearts
✅ Keep GIF files **under 1MB** each for fast loading
✅ Mix different heart styles for variety
✅ Preview GIFs before downloading (some may loop awkwardly)
✅ Save original download links in case you need to re-download

---

Good luck! Your girlfriend is going to LOVE seeing these animations! 💕
