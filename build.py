#!/usr/bin/env python3
"""
Build ecschool.org — assembles content/*.html partials into complete pages
in public/ using templates/base.html.

Run:  python3 build.py

The generated files in public/ are committed to the repo, so Netlify serves
them directly with no build step. Re-run this after editing anything in
content/ or templates/, then commit the result.
"""
import os, re, shutil, sys

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
    'index': ('Englewood Christian School | Englewood, FL',
              'A Christian school in Englewood, Florida offering individualized ACE curriculum, small class sizes, one-on-one tutoring, and transportation from Port Charlotte, North Port, Englewood, and Venice.'),
    'about': ('About Us',
              'Why choose Englewood Christian School: ACE certified instructors, individualized curriculum, enrichment activities, tutoring, and Florida scholarship programs.'),
    'staff': ('Staffulty',
              'Meet the faculty and staff of Englewood Christian School.'),
    'students': ('Students',
                 'Student resources for Englewood Christian School, including the Ignitia login.'),
    'handbook': ('Family Handbook',
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
    'report-cards': ('Report Card Guide',
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


def build():
    base = open(os.path.join(TEMPLATES, 'base.html'), encoding='utf-8').read()
    built = 0
    for slug, (title, desc) in PAGES.items():
        src = os.path.join(CONTENT, slug + '.html')
        if not os.path.exists(src):
            print(f'  !! missing content/{slug}.html', file=sys.stderr)
            continue
        body = open(src, encoding='utf-8').read()
        cur = url_for(slug)
        full_title = title if slug == 'index' else f'{title} | {SITE_NAME}'
        html = (base
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
                .replace('{{CONTENT}}', body))
        out = os.path.join(PUBLIC, slug + '.html')
        open(out, 'w', encoding='utf-8').write(html)
        built += 1
        print(f'  built public/{slug}.html')
    print(f'\n{built} pages written to public/')


if __name__ == '__main__':
    build()
