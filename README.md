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

> **Project configuration → Notifications**, add a form-submission email
> notification, enter the destination address and pick the `contact` form.

Netlify only registers a form after a deploy that contains it, so this option
does not appear until the site has deployed at least once.

This is a dashboard setting, not something that can be committed to the repo.
Submissions are stored either way, so nothing is lost before it is configured.

## Third-party embeds

These were on the original site and were carried over as-is:

| Page | Service |
|---|---|
| `/registration` | JotForm — new student application |
| `/employment` | Wufoo — employment application |

The original also embedded 24 Vimeo videos on `/stem-competition` and one on
`/college-info`. All of them now return 404 from Vimeo — they were deleted
from the account that hosted them, so the embeds were already broken on the
old site. They are not carried over. `/stem-competition` keeps the events,
teams, and results as a written record, and `/college-info` keeps the PDFs.
If the original video files still exist they can be re-uploaded and added
back.

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
