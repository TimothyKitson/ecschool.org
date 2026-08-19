# ecschool.org

Static site for **Englewood Christian School**, migrated off GoDaddy Website
Builder (Airo) to Netlify.

## How it works

There is **no build step on Netlify**. The finished HTML lives in `public/`
and is committed to the repo, so a deploy cannot fail on a build error — it
just publishes files. This is deliberate: the old site's instability is the
reason for the move.

```
public/          ← what Netlify serves (publish directory)
  assets/css     site.css — all styling
  assets/fonts   Bitter + Damion, self-hosted (no Google Fonts request)
  assets/img     photos, staff headshots, logo
  assets/pdf     handbook, calendar, notices
content/         page content only (one file per page)
templates/       base.html — the shared shell (header, nav, footer)
build.py         assembles content/ + templates/ into public/
netlify.toml     publish dir, security headers, cache rules
```

## Editing a page

1. Edit the matching file in `content/` (e.g. `content/staff.html`).
   These contain **only** the page body — no header, nav, or footer.
2. Run the build:
   ```
   python3 build.py
   ```
3. Commit both your `content/` change and the regenerated `public/` files.

To change the header, footer, or navigation, edit `templates/base.html` (and
the `NAV` / `NAV_MORE` lists in `build.py`), then rebuild — every page picks
the change up at once.

## Contact form

The homepage form uses **Netlify Forms** (`data-netlify="true"`). Submissions
are captured in the Netlify dashboard under **Forms**, and the sender lands on
`/thanks`.

To have submissions emailed out, set it once in the Netlify UI:

> **Site configuration → Forms → Form notifications → Add notification →
> Email notification**, then enter the destination address and pick the
> `contact` form.

This is a dashboard setting, not something that can be committed to the repo.
Submissions are stored either way, so nothing is lost before it is configured.

## Third-party embeds

These were on the original site and were carried over as-is:

| Page | Service |
|---|---|
| `/registration` | JotForm — new student application |
| `/employment` | Wufoo — employment application |
| `/college-info` | Vimeo — financial aid presentation |
| `/stem-competition` | Vimeo — 24 competition videos |

## What was dropped

- **Sign In / My Account** — a GoDaddy member-area feature that was unused
  (it displayed the placeholder `filler@godaddy.com`). `/m/*` now redirects
  to the homepage.
- **GoDaddy runtime JS/CSS** — replaced by one hand-written stylesheet and a
  small amount of inline JS for the mobile menu.

## Design tokens

Taken from the original site so the look carries over:

| Token | Value |
|---|---|
| Brand blue | `#0544a4` |
| Mid blue (CTA strip) | `#095ad4` |
| Link / accent blue | `#3b7ee3` |
| Dark (footer bar) | `#161616` |
| Body text | `#1b1b1b` |
| Muted text | `#5e5e5e` |
| Light section wash | `#f6f6f6` |
| Headings | Bitter 700 |
| Body | Helvetica / Arial |
