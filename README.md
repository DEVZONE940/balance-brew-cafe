# The Balance Brew Cafe — Website

Proposal website for **The Balance Brew Cafe**, a cafe on Balewadi High Street,
Baner, Pune 411069.

Prepared by **DEVANSHVERSE**.

| | |
| --- | --- |
| Live | https://devzone940.github.io/balance-brew-cafe/ |
| Repository | https://github.com/DEVZONE940/balance-brew-cafe |
| Stack | Plain HTML, CSS, JS. No build step, no dependencies. |
| Hosting | GitHub Pages, `main` branch, root |

## Files

```
index.html    Single page: hero, story, menu, visit, closing CTA
styles.css    Design system, editorial layout, responsive rules
script.js     Mobile nav, sticky header, scroll reveal
robots.txt · sitemap.xml · .nojekyll
```

## Where every fact came from

| Detail | Value | Source |
| --- | --- | --- |
| Name | The Balance Brew Cafe | Google Business Profile |
| Category | Cafe | Google Business Profile |
| Rating | 4.8 from 322 reviews | Google Business Profile |
| Phone | +91 84468 53942 | Google Business Profile |
| Address | R2, Daisy Society, Lalit Estate, Balewadi High Street Junction, Baner, Pune 411069 | Google Business Profile |
| Coordinates | 18.5620578, 73.7772499 | Google Business Profile |
| Today's closing time | 11:00 PM | Google Business Profile (current day only) |
| Pet friendly | Yes | The cafe's own published Instagram posts |
| Open air seating | Yes | The cafe's own published Instagram posts |
| Landmark | Left after Kalyan Jewellers, before Balewadi High Street | The cafe's own published Instagram posts |
| Menu highlights | Matcha, Five Spice Burger, English Breakfast Platter, Exotic Chicken Pizza, Stuffed Breads, Fresh Rolls & Healthy Snacks | The cafe's own published Instagram posts |

### Deliberately not claimed

- No prices anywhere on the site.
- No full weekly opening hours (only the current day's closing time was available).
- No testimonials, awards, founding year, or "best in Pune" style claims.
- No photographs: the cafe's own images were not available for use, so the page is
  built on typography and colour rather than stock photography that would misrepresent
  the room.

## Confirm with the cafe before this goes live for them

1. **Weekly opening hours** — the single most visible gap. Replace the "call for other days" copy.
2. **Menu and prices** — current items, and permission to list prices.
3. **Photography** — a few real interior and food shots would lift this a lot.
4. **WhatsApp number** — confirm +91 84468 53942 receives WhatsApp.
5. **Instagram link** — add their handle to the footer once confirmed.

## Local preview

```bash
python3 -m http.server 8080
```

## Redeploy after edits

```bash
git add -A && git commit -m "Update" && git push origin main
```

GitHub Pages rebuilds automatically, usually within a minute.
