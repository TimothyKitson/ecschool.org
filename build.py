#!/usr/bin/env python3
"""
Build ecschool.org — assembles content/*.html partials into complete pages
in public/ using templates/base.html.

Run:  python3 build.py

The generated files in public/ are committed to the repo, so Netlify serves
them directly with no build step. Re-run this after editing anything in
content/ or templates/, then commit the result.
"""
import hashlib, json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.join(ROOT, 'content')
PUBLIC = os.path.join(ROOT, 'public')
TEMPLATES = os.path.join(ROOT, 'templates')

SITE_NAME = 'Englewood Christian School'
PHONE_TEXT = '(941) 208 - 5773'
PHONE_HREF = 'tel:+19412085773'
ADDRESS = '571 Medical Dr, Englewood, FL 34223, US'

# Primary nav — the original showed only these three plus "More".
NAV = [
    ('/',            'Home'),
    ('/lunch-menu',  'Lunch Menu'),
    ('/about',       'About'),
]

# The "More" dropdown — exactly the pages the original listed there.
NAV_MORE = [
    ('/calendar',               'Calendar'),
    ('/students',               'Students'),
    ('/handbook',               'Handbook'),
    ('/staff',                  'Staff'),
    ('/registration',           'Registration'),
    ('/dress-code',             'Dress Code'),
    ('/report-cards',           'Report Cards'),
    ('/van-schedules',          'Van Schedules'),
    ('/school-wellness-policy', 'School Wellness Policy'),
    ('/reporting',              'Reporting'),
]

# Kept out of the nav to keep it short, but linked in the footer so the pages
# are still reachable rather than orphaned.
NAV_FOOTER = [
    ('/employment',           'Employment'),
    ('/college-info',         'College Info'),
    ('/stem-competition',     'STEM Competition'),
    ('/spirit-week-contests', 'Spirit Week Contests'),
    ('/end-of-year-letter',   'End of Year Letter'),
    ('/covid-19-updates',     'COVID-19 Updates'),
]

# page slug -> (<title>, meta description)
PAGES = {
    'index': ('Englewood Christian School',
              'A Christian school in Englewood, Florida offering individualized ACE curriculum, small class sizes, one-on-one tutoring, and transportation from Port Charlotte, North Port, Englewood, and Venice.'),
    'about': ('About',
              'Why choose Englewood Christian School: ACE certified instructors, individualized curriculum, enrichment activities, tutoring, and Florida scholarship programs.'),
    'staff': ('Staff',
              'Meet the faculty and staff of Englewood Christian School.'),
    'students': ('Students',
                 'Student resources for Englewood Christian School, including the Ignitia login.'),
    'handbook': ('Handbook',
                 'Download the Englewood Christian School Family Handbook for 2026-27.'),
    'calendar': ('Calendar',
                 'The Englewood Christian School academic calendar for 2026-2027.'),
    'registration': ('Registration',
                     'Apply to Englewood Christian School using our new student application form.'),
    'reporting': ('Reporting',
                  'Standards of ethical conduct, reporting misconduct, and reporting child abuse, abandonment or neglect.'),
    'dress-code': ('Dress Code',
                   'Englewood Christian School uniform and dress code requirements.'),
    'lunch-menu': ('Lunch Menu',
                   'School meal information, Summer BreakSpot, and civil rights language assistance.'),
    'report-cards': ('Report Cards',
                     'How to read and understand an Englewood Christian School report card.'),
    'van-schedules': ('Van Schedules',
                      'Morning and afternoon van routes serving Port Charlotte, North Port, Englewood, and Venice.'),
    'school-wellness-policy': ('School Wellness Policy',
                               'The Englewood Christian School student wellness policy.'),
    'employment': ('Employment',
                   'Apply to work at Englewood Christian School.'),
    'college-info': ('College Info',
                     'Resources for students planning for college: Florida Shines, FAFSA, Bright Futures, and financial aid.'),
    'covid-19-updates': ('COVID-19 Updates',
                         'Archived COVID-19 updates from Englewood Christian School.'),
    'spirit-week-contests': ('Spirit Week Contests',
                             'Vote for your favorites from Spirit Week at Englewood Christian School.'),
    'stem-competition': ('STEM Competition',
                         'Photos and videos from the Englewood Christian School STEM Engineering Competition.'),
    'end-of-year-letter': ('End of Year Letter',
                           'A letter from the administrator of Englewood Christian School.'),
    '404': ('Page Not Found', 'That page could not be found.'),
    'thanks': ('Thank You', 'Your message has been sent.'),
}

# slug -> url used for aria-current matching
def url_for(slug):
    return '/' if slug == 'index' else '/' + slug


def render_footer_links(current_url):
    out = []
    for h, l in NAV_FOOTER:
        cur = ' aria-current="page"' if h == current_url else ''
        out.append('<li><a href="' + h + '"' + cur + '>' + l + '</a></li>')
    return '<ul class="footer-links">' + ''.join(out) + '</ul>'


def render_nav(current_url):
    def item(href, label):
        cur = ' aria-current="page"' if href == current_url else ''
        return f'<li><a href="{href}"{cur}>{label}</a></li>'

    main = '\n        '.join(item(h, l) for h, l in NAV)
    more = '\n            '.join(item(h, l) for h, l in NAV_MORE)
    more_open = ' data-open="false"'
    in_more = any(h == current_url for h, _ in NAV_MORE)
    more_cur = ' aria-current="true"' if in_more else ''
    return f'''<nav class="site-nav" id="site-nav" aria-label="Main">
      <ul class="nav-list">
        {main}
        <li class="has-menu"{more_open}>
          <button type="button" aria-expanded="false" aria-controls="more-menu"{more_cur}>More</button>
          <ul class="submenu" id="more-menu">
            {more}
          </ul>
        </li>
      </ul>
    </nav>'''


FIELD_DAY_DIR = os.path.join(PUBLIC, 'assets', 'img', 'field-day')
DOCS_DIR = os.path.join(PUBLIC, 'assets', 'img', 'docs')

# Human-readable names for the rendered documents, used in alt text and links.
# Documents that are wider than they are tall, shown at the full content
# width rather than the narrow reading column.
DOC_WIDE = {'August-17', '26-27-calendar', 'Grade-Signs', 'FinAidOverview'}

DOC_TITLES = {
    '26-27-calendar': ('2026-2027 school calendar', 'Download Calendar'),
    'August-17': ('Lunch menu', 'Download Menu'),
    'ECSFreeLunch': ('Free and reduced price school meals information', 'Download PDF'),
    'Educator-misconduct': ('Notice on reporting educator misconduct', 'Download PDF'),
    'FAS-FMS-1': ('Florida Academic and Medallion Scholars award amounts', 'Download PDF'),
    'Grade-Signs': ('Learning grade level table', 'Download PDF'),
    'misconductFlyer': ('Flyer on reporting educator misconduct', 'Download PDF'),
    'poster-on-child-abuse': ('Poster on reporting child abuse, abandonment or neglect', 'Download PDF'),
    '2026-2027-Handbook': ('Family Handbook 2026-27', 'Download Handbook'),
    'BFHandbookChapter1': ('Florida Bright Futures Scholarship handbook', 'Download PDF'),
    'FinAidOverview': ('Financial aid overview presentation', 'Download PDF'),
}


def _doc_manifest():
    # Build metadata, kept out of public/ so it is not served.
    try:
        with open(os.path.join(ROOT, 'docs-manifest.json'), encoding='utf-8') as fh:
            return json.load(fh)
    except (FileNotFoundError, ValueError):
        return {}


DOCS = _doc_manifest()


def render_doc(stem):
    """A rendered document: one page becomes a plain figure, several become a
    pager with Previous / Next, the way the original presented them. Every page
    ships as an image so no PDF viewer chrome appears inside the page, and all
    but the first load lazily so only what is read gets downloaded."""
    entry = DOCS.get(stem)
    if not entry:
        return f'<p><a href="/assets/pdf/{stem}.pdf" target="_blank" rel="noopener">Download PDF &rsaquo;</a></p>'
    title, label = DOC_TITLES.get(stem, (stem, 'Download PDF'))
    pages, n = entry['pages'], entry['count']
    pdf = f'/assets/pdf/{stem}.pdf'
    wide = ' doc--wide' if stem in DOC_WIDE else ''
    if n == 1:
        p = pages[0]
        return (f'<figure class="doc{wide}">\n'
                f'      <img src="/assets/img/docs/{p["file"]}" alt="{title}" '
                f'width="{p["w"]}" height="{p["h"]}" loading="lazy" decoding="async">\n'
                f'      <figcaption><a href="{pdf}" target="_blank" rel="noopener">{label} &rsaquo;</a></figcaption>\n'
                f'    </figure>')
    imgs = []
    for i, p in enumerate(pages):
        imgs.append(
            f'        <li class="docpage"{" data-active" if i == 0 else ""}>'
            f'<img src="/assets/img/docs/{p["file"]}" alt="{title}, page {i + 1} of {n}" '
            f'width="{p["w"]}" height="{p["h"]}" loading="{"eager" if i == 0 else "lazy"}" decoding="async"></li>')
    nl = chr(10)
    return f'''<div class="docpager{wide}" id="doc-{stem}" data-total="{n}">
      <p class="docpager-dl"><a href="{pdf}" target="_blank" rel="noopener">{label} &rsaquo;</a></p>
      <ul class="docpager-pages">
{nl.join(imgs)}
      </ul>
      <p class="docpager-nav">
        <button type="button" class="doc-prev">&lsaquo; Previous</button>
        <span class="doc-count"><span class="doc-at">1</span>/{n}</span>
        <button type="button" class="doc-next">Next &rsaquo;</button>
      </p>
    </div>'''


def render_field_day():
    """Build the Field Day carousel from whatever images are in
    public/assets/img/field-day/. Empty folder -> a short placeholder."""
    try:
        files = sorted(f for f in os.listdir(FIELD_DAY_DIR)
                       if re.search(r'\.(jpe?g|png|webp)$', f, re.I))
    except FileNotFoundError:
        files = []
    # A separate small crop per photo, so the strip does not pull ten full
    # stage-sized images just to draw ten 80px squares.
    thumb_dir = os.path.join(FIELD_DAY_DIR, 'thumbs')
    if not files:
        return '<p class="lede">Field Day photos will be posted here.</p>'
    slides, thumbs = [], []
    for i, f in enumerate(files):
        url = '/assets/img/field-day/' + f
        cur = ' aria-current="true"' if i == 0 else ''
        slides.append(
            f'        <li class="fd-slide"{" data-active" if i == 0 else ""}>'
            f'<img src="{url}" alt="Field Day at Englewood Christian School, photo {i + 1} of {len(files)}"'
            f' loading="{"eager" if i == 0 else "lazy"}" decoding="async"></li>')
        thumb = url
        if os.path.exists(os.path.join(thumb_dir, f)):
            thumb = '/assets/img/field-day/thumbs/' + f
        thumbs.append(
            f'        <li><button type="button" class="fd-thumb" data-go="{i}"{cur}'
            f' aria-label="Show photo {i + 1} of {len(files)}">'
            f'<img src="{thumb}" alt="" width="80" height="56"'
            f' loading="lazy" decoding="async"></button></li>')
    nl = chr(10)
    return f'''<div class="fd" data-autoplay="3000">
      <div class="fd-stage">
        <button type="button" class="fd-nav fd-prev" aria-label="Previous photo"></button>
        <ul class="fd-track" aria-live="polite">
{nl.join(slides)}
        </ul>
        <button type="button" class="fd-nav fd-next" aria-label="Next photo"></button>
      </div>
      <ul class="fd-thumbs">
{nl.join(thumbs)}
      </ul>
    </div>'''


def hashed_asset(rel):
    """Copy assets/<rel>.<ext> to <rel>.<hash>.<ext> and return its URL.

    Static assets are served with a one-year immutable cache, so a file's name
    has to change whenever its contents do — otherwise browsers keep serving
    an old copy against new HTML, which breaks the layout.
    """
    directory, filename = os.path.split(rel)
    stem, ext = os.path.splitext(filename)
    out_dir = os.path.join(PUBLIC, 'assets', directory)
    data = open(os.path.join(out_dir, filename), 'rb').read()
    digest = hashlib.sha256(data).hexdigest()[:10]
    name = f'{stem}.{digest}{ext}'
    # drop hashed builds from previous runs
    pattern = re.escape(stem) + r'\.[0-9a-f]{10}' + re.escape(ext)
    for f in os.listdir(out_dir):
        if re.fullmatch(pattern, f) and f != name:
            os.remove(os.path.join(out_dir, f))
    open(os.path.join(out_dir, name), 'wb').write(data)
    return f'/assets/{directory}/{name}'


# The handbook slide deck is its own stylesheet and script. Only the page that
# embeds the deck pays for them, so they are injected per page rather than
# sitewide.
SLIDES_MARKER = 'class="ecs-root"'


def build():
    base = open(os.path.join(TEMPLATES, 'base.html'), encoding='utf-8').read()
    css_url = hashed_asset('css/site.css')
    slides_css = hashed_asset('css/slides.css')
    slides_js = hashed_asset('js/slides.js')
    field_day = render_field_day()
    built = 0
    for slug, (title, desc) in PAGES.items():
        src = os.path.join(CONTENT, slug + '.html')
        if not os.path.exists(src):
            print(f'  !! missing content/{slug}.html', file=sys.stderr)
            continue
        body = open(src, encoding='utf-8').read()
        cur = url_for(slug)
        # The original titled each page with just its name.
        full_title = title
        has_slides = SLIDES_MARKER in body
        head_extra = (f'\n<link rel="stylesheet" href="{slides_css}">'
                      if has_slides else '')
        body_extra = (f'\n<script src="{slides_js}" defer></script>'
                      if has_slides else '')
        html = (base
                .replace('{{CSS}}', css_url)
                .replace('{{NAV}}', render_nav(cur))
                .replace('{{FOOTER_LINKS}}', render_footer_links(cur))
                .replace('{{TITLE}}', full_title)
                .replace('{{DESCRIPTION}}', desc)
                .replace('{{CANONICAL}}', 'https://ecschool.org' + cur)
                .replace('{{PHONE_TEXT}}', PHONE_TEXT)
                .replace('{{PHONE_HREF}}', PHONE_HREF)
                .replace('{{ADDRESS}}', ADDRESS)
                .replace('{{SITE_NAME}}', SITE_NAME)
                .replace('{{YEAR}}', '2026')
                .replace('{{HEAD_EXTRA}}', head_extra)
                .replace('{{BODY_EXTRA}}', body_extra)
                .replace('{{CONTENT}}', body)
                # after {{CONTENT}}: these tokens come from content files
                .replace('{{FIELD_DAY}}', field_day))
        html = re.sub(r'\{\{DOC:([A-Za-z0-9._-]+)\}\}',
                      lambda m: render_doc(m.group(1)), html)
        out = os.path.join(PUBLIC, slug + '.html')
        open(out, 'w', encoding='utf-8').write(html)
        built += 1
        print(f'  built public/{slug}.html')
    print(f'\n{built} pages written to public/  (css: {css_url})')


if __name__ == '__main__':
    build()
