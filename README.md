# Sintha Holdings — static site

A **single-page** static website for **Sintha Holdings (Pty) Ltd** — PIRB-licensed plumbing, bulk & domestic water meter installation, leak repair, blocked drains, and Plumbing Certificates of Compliance — Hebron, Madibeng, Gauteng & Free State.

Pure HTML / CSS / JS. No build step, no framework, no backend. Form submissions route into WhatsApp.

---

## File map

```
site/
├── index.html           One long page — hero, services, field log, callouts, coverage, founder, contact
├── README.md            (this file)
├── css/
│   └── style.css        Editorial-industrial design system
├── js/
│   └── script.js        GSAP reveals, hero word-split, WhatsApp form router
└── assets/
    ├── images/          Curated field photos + logo.png (transparent)
    └── video/           hero.mp4
```

The site is intentionally one page — visitors scroll, the nav anchors jump them around. No multi-page navigation, no information bombardment.

---

## 1. Hero video

Hero video is at `assets/video/hero.mp4`. The poster image (`field-01-bulk-valve-action.jpg`) shows while it loads. To replace the video, drop a new `hero.mp4` in `assets/video/` (recommended: portrait/4:5, 6–12 s, MP4/H.264, ≤ 8 MB).

---

## 2. Form handling — WhatsApp

The brief form on the contact section collects name, phone, suburb, service, and a description, then opens WhatsApp with everything pre-filled. Tap *Send* in WhatsApp and the message lands on dispatch's phone. No backend, no third-party form service.

The phone number is set in `js/script.js`:

```js
const PHONE = '27711713425'; // country code +27, leading 0 dropped
```

To change the WhatsApp number globally, search-and-replace `27711713425` across `index.html` and `js/script.js`.

---

## 3. Design system

**Concept**: editorial-industrial — a master craftsman's monograph. No glassmorphism, no purple gradients.

**Palette** (CSS variables in `css/style.css`):

| Token                  | Hex                   | Use                                      |
| ---------------------- | --------------------- | ---------------------------------------- |
| `--ink`                | `#0A1A24`             | Primary type, dark sections              |
| `--paper`              | `#FAF6EE`             | Default page background (warm off-white) |
| `--paper-2`            | `#F2EBDD`             | Secondary section background             |
| `--cyan` / `cyan-deep` | `#0EA5B7` / `#0B7C8A` | Accent — drawn from the Sintha logo      |
| `--copper`             | `#C2541F`             | Emergency / urgency CTAs only            |
| `--steel`              | `#6B7B85`             | Captions, labels                         |

**Type**: Fraunces (display), Geist (body), JetBrains Mono (codes/coords) — all from Google Fonts.

**Motion**: mechanical, deliberate, weighted. GSAP + ScrollTrigger. Honors `prefers-reduced-motion`.

---

## 4. Compliance & SEO

- **Schema.org `Plumber`** JSON-LD in `index.html` — entity, address, phone, area served, hours, credentials (PIRB, CIDB, CSD)
- Honest `<title>` and `<meta description>`
- OpenGraph image set
- All images have descriptive `alt` text
- `<video>` is muted + autoplay-safe

---

## 5. Deploying

The site is fully static — host it anywhere:

| Host                              | How                                                          |
| --------------------------------- | ------------------------------------------------------------ |
| **Netlify**                       | Drag the `site/` folder onto <https://app.netlify.com/drop>  |
| **Cloudflare Pages**              | Connect repo → output dir = `site/`, no build command        |
| **GitHub Pages**                  | Push `site/` to a branch → Settings → Pages → branch + `/` root |
| **Vercel**                        | `vercel --prod` from inside `site/`                          |
| **Plain web host (cPanel, etc.)** | Upload contents of `site/` to `public_html/`                 |

Custom domain: point an `A` record at the host. After cutover, update the `https://sinthaholdings.co.za/` URLs inside the JSON-LD block in `index.html` to your live domain.

---

## 6. Contact details used

- `+27 71 171 3425` (primary, used in WhatsApp links)
- `+27 65 882 9455` (secondary)
- Email: `sinthaholdings@gmail.com`
- Yard: 340 Midas Square, Hebron, Madibeng, North West, 0193

---

## 7. Local preview

```bash
cd site
python3 -m http.server 5173
# then open http://localhost:5173
```

---

Built for Sintha Holdings (Pty) Ltd — Reg. 2024/448427/07. PIRB Licence 11493/25.
