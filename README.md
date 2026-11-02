# The Balance Brew Cafe — Website

Proposal website for **The Balance Brew Cafe**, a cafe on Balewadi High Street, Baner, Pune 411069.
Prepared by **DEVANSHVERSE**.

| | |
| --- | --- |
| Live | https://devzone940.github.io/balance-brew-cafe/ |
| Repository | https://github.com/DEVZONE940/balance-brew-cafe |
| Stack | Plain HTML, CSS and JS. No build step, no dependencies, no libraries. |
| Hosting | GitHub Pages, `main` branch, root |

## What is on the page

1. **Intro curtain** — the name types itself in, then lifts.
2. **Hero** — full-bleed parallax photograph, headline revealed letter by letter, live stat strip (rating, reviews, cost for two, today's hours).
3. **Story** — offset image pair that wipes in on scroll, drop-capped prose.
4. **Menu** — four tabs (Coffee & Shakes, Breakfast, Burgers & Pizza, Healthy & Rolls) with 21 dishes and prices.
5. **Gallery** — six-image grid with hover zoom and clip-path reveals.
6. **Book a table** — validated form that opens WhatsApp with the request pre-filled.
7. **The Regulars** — membership signup, also handed off to WhatsApp.
8. **Visit** — address, hours, directions, embedded map.

Motion: scroll progress bar, sticky header state change, IntersectionObserver reveals with
stagger, image clip-path wipes, hero parallax, count-up statistics, marquee ticker, tab
cross-fades. Everything is disabled under `prefers-reduced-motion`, and a `<noscript>`
block keeps the whole page visible without JavaScript.

## Where every fact came from

| Detail | Value | Source |
| --- | --- | --- |
| Name | The Balance Brew Cafe | Google Business Profile |
| Rating | 4.8 from 322 reviews | Google Business Profile |
| Phone | +91 84468 53942 | Google Business Profile and Zomato |
| Address | Plot 24, Serve 85 A/2, Daisy Lalit Estate, Baner, Pune 411069 | Zomato, consistent with Google |
| Coordinates | 18.5620578, 73.7772499 | Google Business Profile |
| Hours | 11:00 AM – 11:00 PM | Zomato listing |
| Cost for two | ₹250 | Zomato listing |
| Cuisines | Pizza, Burger, Pasta, Fast Food, Healthy Food, Coffee, Shake, Beverages | Zomato listing |
| Pet friendly | Yes | The cafe's own published Instagram posts |
| Open air seating | Yes | The cafe's own published Instagram posts |
| Landmark | Left after Kalyan Jewellers, before Balewadi High Street | The cafe's own published Instagram posts |
| Named dishes | Matcha, Five Spice Burger, English Breakfast Platter, Exotic Chicken Pizza, Non Veg Caesar Crunch, Stuffed Breads, Fresh Rolls | The cafe's own published Instagram posts |

## Two things that are NOT real, on purpose

**1. Prices.** No public source publishes this cafe's prices — the Zomato menu is a scanned
image with no readable text. The 21 prices in the menu are **sample figures written to make
the layout reviewable**. They are labelled on the page ("Sample prices for layout review")
and in the footer. Replace every one with the cafe's actual menu before this goes live.

**2. Photography.** The six photographs in `assets/` are AI-generated stand-ins, not pictures
of this cafe. They exist because the cafe's own photography was not available for use.
The page says so in the footer and the gallery note. The cafe's real interiors and dishes
should replace all six files.

Everything else — name, rating, review count, phone, address, hours, cost for two,
cuisines, landmark, and the named dishes — is sourced and true to the listings above.

## Files

```
index.html · styles.css · script.js
assets/hero-cafe.jpg · coffee-matcha.jpg · food-spread.jpg
assets/pet-friendly.jpg · corner-reading.jpg · exterior-dusk.jpg
robots.txt · sitemap.xml · .nojekyll
```

## Still to confirm with the cafe

1. Real menu and prices, and permission to publish them.
2. Weekly hours — only one day's hours are published.
3. Their own photography.
4. Confirmation that +91 84468 53942 takes WhatsApp, since both forms hand off to it.
5. Their Instagram handle for the footer.

## Local preview

```bash
python3 -m http.server 8080
```
