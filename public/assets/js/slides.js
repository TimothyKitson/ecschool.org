(function(){
  "use strict";

  /* ---------------------------------------------------------------
     ICONS — small inline SVG library, single stroke style
  --------------------------------------------------------------- */
  var ICO = {
    book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5"/><path d="M20 18H6.5A2.5 2.5 0 0 0 4 20.5"/>',
    users:'<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16.5 6.2a3.2 3.2 0 0 1 0 6.2"/><path d="M18.8 14c2.6.5 4.2 2.4 4.2 6"/>',
    shirt:'<path d="M8 3l4 2 4-2 4 4-3 3v10H7V10L4 7z"/>',
    check:'<path d="M4 12l5 5L20 6"/>',
    x:'<path d="M6 6l12 12M18 6L6 18"/>',
    shield:'<path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6z"/>',
    phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M11 18.5h2"/>',
    bus:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M3 12h18"/><circle cx="7.5" cy="19.5" r="1.4"/><circle cx="16.5" cy="19.5" r="1.4"/>',
    heart:'<path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.2 4.5 4.5 0 0 1 20 9.5c0 6.1-8 11-8 11z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 7 8.5-7"/>',
    calendar:'<rect x="3.5" y="4.5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17"/><path d="M8 2.5v4M16 2.5v4"/>',
    star:'<path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20l1.4-6.3-4.8-4.3 6.4-.6z"/>',
    flag:'<path d="M6 21V4"/><path d="M6 4h12l-3 4 3 4H6"/>',
    clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    cross:'<path d="M12 3v18"/><path d="M6 9h12"/>',
    alert:'<path d="M12 3l9.5 17H2.5z"/><path d="M12 10v4"/><path d="M12 17.2h.01"/>',
    lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    hand:'<path d="M8 12V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 11V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v9c0 3-2 5.5-5.5 5.5S6 18 6 15v-3.2c0-.9.7-1.6 1.6-1.6.9 0 1.4.5 1.4 1.3"/>',
    device:'<rect x="4.5" y="6" width="15" height="12" rx="2"/><path d="M9 20h6"/>',
    graduation:'<path d="M12 3L2 8l10 5 10-5z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/>',
    clipboard:'<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M9 11h6M9 15h6"/>',
    pill:'<rect x="3" y="12" width="8" height="8" rx="4" transform="rotate(-45 7 16)"/><path d="M9.5 9.5l5-5a3.54 3.54 0 0 1 5 5l-5 5"/>',
    home:'<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>',
    trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5a3 3 0 0 0 3 5"/><path d="M16 5h3a3 3 0 0 1-3 5"/><path d="M10 15v2a2 2 0 0 0 4 0v-2"/><path d="M8 21h8"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2l-2 5.6-5.6 2 2-5.6z"/>'
  };
  function icon(name, size){
    size = size || 20;
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex:none;display:block;">'+(ICO[name]||ICO.check)+'</svg>';
  }

  /* ---------------------------------------------------------------
     CONTENT — every slide from the parent-night deck
  --------------------------------------------------------------- */
  var SLIDES = [
    { type:'cover',
      kicker:'Englewood Christian School',
      title:'Family Handbook Highlights',
      sub:'2026–2027 School Year',
      tag:'Godly Knowledge, Wisdom, and Integrity',
      foot:'571 Medical Dr, Englewood, FL 34223  ·  (941) 208-5773  ·  ecschool.org'
    },
    { type:'statement',
      kicker:'2026–2027 School Year Theme',
      title:'Surviving the Jungle',
      lead:'Exploring the world’s jungles — learning to be IN the world, but not OF the world.'
    },
    { type:'features', cols:2,
      page:6,
      kicker:'Who We Are', title:'Our Mission & Approach',
      lead:{quote:true, text:'Every child is a wonderfully unique individual who possesses her or his own learning style and maturity level.'},
      items:[
        {icon:'book', t:'A Proven Curriculum', d:'ACE paper-based PACEs combined with Alpha & Omega computer-based coursework.'},
        {icon:'users', t:'Tutoring When Needed', d:'One-on-one support is available whenever a student needs it, without a special arrangement.'}
      ],
      footnote:'A non-denominational, private K–12 Christian school serving Englewood since 2010, accredited through CGACS.'
    },
    { type:'tracks',
      page:9,
      kicker:'Academics', title:'The Three Learning Tracks',
      tracks:[
        {label:'Track 1', name:'College / University Bound', grade:'80', pace:'12 PACEs or 10 Units in each subject to pass.'},
        {label:'Track 2', name:'Diploma / Focus', grade:'70', pace:'12 PACEs or 10 Units in each subject to pass.'},
        {label:'Track 3', name:'Long-Term Learning', grade:'70', pace:'8 PACEs or 7 Units in each subject to pass.'}
      ],
      note:'A track sets the pace and the destination — not the student’s ability.',
      footnote:'Diagnostic testing at the start of the year sets each student’s starting point. Track placement is a conversation between the school and the family.'
    },
    { type:'features', cols:3,
      page:10,
      kicker:'Academics', title:'Testing, Grades, and Competitions',
      items:[
        {icon:'clipboard', t:'Diagnostic Testing', d:'Testing at the start of the year identifies gaps so that each student begins at the right level.'},
        {icon:'trophy', t:'Academic Competitions', d:'Four are held each year. Tracks 1 and 2 compete in all four; Track 3 competes in three.'},
        {icon:'book', t:'Report Cards & Ignitia', d:'Grades and coursework are tracked in the Ignitia portal, and report cards come out each quarter.'}
      ]
    },
    { type:'features', cols:4,
      page:15,
      kicker:'Academics', title:'Awards',
      items:[
        {icon:'star', t:'Honor Roll', d:'Earned quarterly with all work complete and an overall average of A (90–99) or A+ (100).'},
        {icon:'trophy', t:'Shining Star', d:'Awarded quarterly and yearly to students who earn no demerits in a given quarter.'},
        {icon:'flag', t:'Mountain Mover', d:'Awarded to students who complete more than one year of academic work with passing grades.'},
        {icon:'check', t:'Perfect Attendance', d:'Awarded to students who do not miss any school days in a given quarter.'}
      ],
      footnote:'Honor roll requires both the grade average and completion of all expected work — not one or the other.'
    },
    { type:'numbered',
      page:7,
      kicker:'Expectations', title:'Good Standing: Five Requirements',
      items:[
        {t:'Current on work', d:'Work efforts are kept up to the current point in the active school year.'},
        {t:'Acceptable grades', d:"A grade average deemed acceptable for the student's academic level."},
        {t:'Attendance', d:'Less than or equal to 5% absence across the school year.'},
        {t:'Behavior', d:'Fewer than 10 demerits for the current quarter.'},
        {t:'Account in good order', d:'No outstanding financial obligations with the school.'}
      ],
      footnote:'Good standing affects eligibility for privileges such as field trips and school activities.'
    },
    { type:'statsFeatures',
      page:22,
      kicker:'Expectations', title:'Attendance: What Counts as Present',
      stats:[
        {num:'3.5', lbl:'Class Hours', dt:'Minimum time present to count for the day when arriving late or leaving early.'},
        {num:'11:30', lbl:'A.M. Cutoff', dt:'Arriving after — or checking out before — 11:30 a.m. is recorded as an absence.'},
        {num:'5', lbl:'Parent Excuses', dt:'Parent excuse days are permitted per school year.'},
        {num:'3 = 1', lbl:'Tardies', dt:'Every three late arrivals or early check-outs in a quarter equals one unexcused absence.'}
      ],
      items:[
        {icon:'clock', t:'Illness of Three Days or More', d:'A written doctor’s excuse must come back with the student when they return to school.'},
        {icon:'check', t:'Punctuality Is Part of the Work', d:'“Regular and punctual attendance is necessary” for a student to progress through the curriculum.'}
      ],
      footnote:'The 5% absence limit is one of the five good-standing requirements. Missing more than 20 days may mean the year’s work receives no credit, which can prevent promotion to the next grade.'
    },
    { type:'features', cols:3, small:true, tone:'positive',
      page:21,
      kicker:'Dress Code', title:'What IS Acceptable',
      items:[
        {icon:'check', t:'School-Issued Polo', d:'Monday through Thursday. Midriff must stay covered when arms are raised.'},
        {icon:'check', t:'Khaki, Black or Navy Bottoms', d:'Cotton pants, shorts, skorts and skirts. Undamaged jeans are permitted.'},
        {icon:'check', t:'Knee-Length Rule', d:'Skirts, skorts and shorts must reach the knee when the student is standing.'},
        {icon:'check', t:'Closed Sneakers', d:'Sneakers in good repair, closed-toe and closed-heel, for safety.'},
        {icon:'check', t:'Friday Dress', d:'A school polo or a school T-shirt. All other uniform standards still apply.'},
        {icon:'check', t:'Layers for Warmth', d:'Plain sweaters or long-sleeved undershirts indoors; coats and hoodies outdoors.'}
      ],
      footnote:'K–3 girls may wear a navy or khaki jumper with a uniform shirt. Dresses are reserved for special events.'
    },
    { type:'features', cols:3, small:true, tone:'negative',
      page:22,
      kicker:'Dress Code', title:'What Is NOT Acceptable',
      items:[
        {icon:'x', t:'Leggings & Stretch Pants', d:'Leggings, jeggings, stretch pants and yoga pants are not permitted.'},
        {icon:'x', t:'Low-Ride or Damaged', d:'Low-ride garments of any kind, and ripped or damaged jeans.'},
        {icon:'x', t:'Cargo & Multi-Pocket', d:'Cargo styles and multi-pocket bottoms are not part of the uniform.'},
        {icon:'x', t:'Open Footwear', d:'Flip-flops, Crocs and sandals. Swimwear is not worn on campus.'},
        {icon:'x', t:'Tank Tops & Visible Straps', d:'Tank tops, spaghetti straps, and visible undergarments or straps.'},
        {icon:'x', t:'Above the Knee', d:'Anything shorter than knee-length, and dresses on regular school days.'}
      ],
      footnote:'A dress code violation is one of the infractions that can earn a demerit — please check outfits the night before.'
    },
    { type:'columns',
      page:21,
      kicker:'Dress Code', title:'Grooming & Appearance',
      colA:{ title:'Boys', icon:'users', items:[
        'Hair may not touch the collar or cover the eyes',
        'Natural hair colors only — no unnatural colors',
        'Afros are limited to two inches',
        'No mohawks or cut-in designs',
        'No earrings or visible piercings',
        'A belt is required, and no visible tattoos'
      ]},
      colB:{ title:'Girls', icon:'users', items:[
        'Hair is to be only of natural color',
        'Highlighting in natural tones is acceptable',
        'Earrings no more than one inch below the earlobe',
        'No piercings other than earrings',
        'No visible undergarments or straps',
        'No visible tattoos or body modifications'
      ]},
      footnote:'Hats are removed before entering the building.'
    },
    { type:'features', cols:3, small:true,
      page:19,
      kicker:'Behavior', title:'What Earns a Demerit',
      items:[
        {icon:'alert', t:'Running or Yelling', d:'During non-play time.'},
        {icon:'book', t:'Coming Without Materials', d:'Arriving to class unprepared.'},
        {icon:'clipboard', t:'Incomplete Homework', d:'Missing or incomplete assignments.'},
        {icon:'users', t:'Disrespect', d:'Toward staff or students.'},
        {icon:'shirt', t:'Dress Code Violations', d:'Uniform standards not met.'},
        {icon:'device', t:'Misuse of Technology', d:'School technology used improperly.'},
        {icon:'shield', t:'Bullying', d:'Not tolerated at any level.'},
        {icon:'hand', t:'Fighting', d:'Physical altercations of any kind.'},
        {icon:'x', t:'Plagiarism or Cheating', d:'Academic dishonesty.'}
      ],
      footnote:'The handbook also covers non-Christian behavior such as lying, cheating or stealing. Possession of a weapon carries a two-week suspension while the school investigates.'
    },
    { type:'demeritSystem',
      page:19,
      kicker:'Behavior', title:'How the Demerit System Works',
      stats:[
        {num:'10', lbl:'Demerits in a Semester', dt:'The student receives a detention.'},
        {num:'5th', lbl:'Infraction', dt:'Consequences escalate with each occurrence, up to immediate suspension at the Administrator’s discretion.'},
        {num:'30', lbl:'Demerit Ceiling', dt:'More than 30 demerits in a semester means review by the Administrator for possible expulsion.'}
      ],
      listTitle:'Consequences may include',
      items:[
        'Service project or campus beautification',
        'Morning or afternoon detention',
        'A 200-word essay',
        'In-school suspension of one to three days'
      ],
      footnote:'The list is not exhaustive — and we will always talk with you before consequences escalate.'
    },
    { type:'features', cols:2,
      page:15,
      kicker:'Behavior', title:'Merits',
      items:[
        {icon:'star', t:'How Merits Are Earned', d:'Merits are given to students who do what they are supposed to. They will also be given to students who help around the school.'},
        {icon:'trophy', t:'What Merits Are Used For', d:'Merits can be used to buy different toys or items at the end of every quarter.'}
      ],
      footnote:'The handbook treats behavior as earning rewards both ways — merits for good choices, demerits for poor ones.'
    },
    { type:'features', cols:3,
      page:18,
      kicker:'Behavior', title:'Phones & Electronic Devices',
      items:[
        {icon:'lock', t:'Off and Put Away', d:'Phones and tablets may come to campus, but they stay off and in their assigned place until a teacher or the Administrator gives permission.'},
        {icon:'device', t:'If a Device Comes Out', d:'First time is a warning. Second time brings demerits and the device is held until the end of the day. Third time a parent collects it.'},
        {icon:'phone', t:'Reach Your Child Through Us', d:'Please do not call or text your student directly during the school day. Call the office and we will pass the message along.'}
      ],
      footnote:'Older students may use devices according to their earned privilege rankings. The school may review the contents of a confiscated device, and reserves the right to ban devices if they are misused.'
    },
    { type:'transport',
      page:25,
      kicker:'Logistics', title:'Transportation: Van',
      stat:{num:'$100', lbl:'Per Month, Per Family', dt:'One flat rate covers every child in the family.'},
      areas:['Port Charlotte','North Port','Englewood','Venice'],
      rules:[
        'Buckle your seat belt as soon as you are seated',
        'Stay seated until you reach your destination',
        'No changing seats',
        'Nothing thrown inside the van or out the window',
        'No waving objects above the seats'
      ],
      footnote:'When a rule is broken, a student may be charged with a demerit, or a different punishment.'
    },
    { type:'features', cols:2, big:true,
      page:23,
      kicker:'Logistics', title:'Arrival, Dismissal & Pick-Up',
      items:[
        {icon:'clock', t:'School Hours', d:'Monday through Friday, 8:00 a.m. to 3:00 p.m. Please plan arrival so students are seated and ready at 8:00.'},
        {icon:'calendar', t:'Early Pick-Up', d:'If your child needs to leave before the end of the day, notify the school before 10 a.m. that morning.'}
      ]
    },
    { type:'medication',
      page:20,
      kicker:'Health', title:'Medication & Student Wellness',
      stats:[
        {num:'5', lbl:'Calendar Days', dt:'Maximum for over-the-counter treatment without a signed prescriber statement.'},
        {num:'1', lbl:'Week', dt:'To collect leftover medication after the ending date, before it is discarded.'}
      ],
      steps:[
        {t:'With written authorization', d:'Nothing can be given at school — including over-the-counter medicine — without the authorization form on file.'},
        {t:'In its original container', d:'Labeled with the student’s name, the prescription number if applicable, and instructions for administering.'},
        {t:'Collected when finished', d:'Parents pick up leftover medication; anything left behind is discarded according to school policy.'}
      ]
    },
    { type:'features', cols:3,
      page:23,
      kicker:'Partnership', title:'How We Stay in Touch',
      items:[
        {icon:'clock', t:'Within Two Hours', d:'“I will return a phone call or text from the school within 2 hours unless circumstances will not allow it.” — from the parent commitment in the handbook.', quote:true},
        {icon:'mail', t:'Email or the School Office', d:'Please reach teachers by email or through the office. Our goal this year is to avoid parent–teacher texting unless the teacher initiates it.'},
        {icon:'users', t:'Show Up for the Hard Conversations', d:'When we ask you to a meeting about behavior or academic standing, we are asking because it works — please make every effort to attend.'}
      ]
    },
    { type:'timeline',
      href:'/calendar', linkLabel:'Show in calendar',
      kicker:'Before You Go', title:'Key Dates',
      items:[
        {d:'August 3', l:'Staff returns'},
        {d:'August 4 & 6', l:'Parent orientation'},
        {d:'August 10', l:'First day for students'},
        {d:'September 7', l:'Labor Day — no school', off:true},
        {d:'October 2', l:'Teacher conference — no school', off:true},
        {d:'October 9', l:'End of 1st quarter'},
        {d:'November 23–27', l:'Thanksgiving break', off:true},
        {d:'December 18', l:'End of 2nd quarter'},
        {d:'Dec 21 – Jan 4', l:'Christmas break', off:true},
        {d:'January 18', l:'MLK Day — no school', off:true},
        {d:'February 15', l:'Presidents’ Day — no school', off:true},
        {d:'March 5', l:'End of 3rd quarter'},
        {d:'March 15–19', l:'Spring break', off:true},
        {d:'March 26', l:'Good Friday — no school', off:true},
        {d:'April 16–19', l:'Mini break — no school', off:true},
        {d:'May 27', l:'Award & Graduation Night'},
        {d:'May 28', l:'Last day of school (half day)'},
        {d:'May 31', l:'Memorial Day', off:true},
        {d:'June 7', l:'Last day for all staff'}
      ],
      footnote:'Dates as published in the ECS 2026–2027 calendar. Report cards and honor roll follow each quarter, and there are four academic competitions across the year.'
    }
  ];

  /* ---------------------------------------------------------------
     RENDERERS — one function per slide "type"
  --------------------------------------------------------------- */
  function esc(s){ return (s==null?'':String(s)); }

  function renderCard(it, tone){
    var toneClass = tone ? ' tone-'+tone : '';
    return '<div class="ecs-card'+toneClass+'">' +
      (it.icon?'<span class="icn">'+icon(it.icon)+'</span>':'') +
      '<h4>'+esc(it.t)+'</h4><p>'+(it.quote?'“'+esc(it.d)+'”':esc(it.d))+'</p></div>';
  }

  function shell(s, bodyHtml, opts){
    opts = opts || {};
    var kicker = s.kicker ? '<p class="ecs-kicker">'+esc(s.kicker)+'</p>' : '';
    var title = s.title ? '<h3 class="ecs-title">'+esc(s.title)+'</h3>' : '';
    var foot = s.footnote ? '<div class="ecs-footnote">'+esc(s.footnote)+'</div>' : '';
    return '<div class="ecs-slide-inner">'+kicker+title+'<div class="ecs-body">'+bodyHtml+'</div>'+foot+'</div>';
  }

  var RENDER = {
    cover:function(s){
      return '<div class="ecs-cover">'+
        '<img src="__LOGO_SRC__" alt="">'+
        '<p class="k">'+esc(s.kicker)+'</p>'+
        '<h3>'+esc(s.title)+'</h3>'+
        '<div class="rule"></div>'+
        '<p class="sub">'+esc(s.sub)+'</p>'+
        '<p class="tag">'+esc(s.tag)+'</p>'+
        '<p class="foot">'+esc(s.foot)+'</p>'+
      '</div>';
    },
    statement:function(s){
      return '<div class="ecs-statement">'+
        '<p class="k">'+esc(s.kicker)+'</p>'+
        '<h3>'+esc(s.title)+'</h3>'+
        '<p>'+esc(s.lead)+'</p>'+
      '</div>';
    },
    toc:function(s){
      var html = '<div class="ecs-grid g4" style="grid-template-rows:1fr 1fr;">';
      s.items.forEach(function(it){
        html += '<div class="ecs-card"><span class="icn">'+icon(it.icon)+'</span><h4>'+esc(it.t)+'</h4><p>'+esc(it.d)+'</p></div>';
      });
      html += '</div>';
      return shell(s, html);
    },
    features:function(s){
      var cols = s.cols||3;
      // Three full rows of cards do not fit the 720px canvas at the default
      // padding, so flag the dense case for the stylesheet to tighten.
      var cls = 'g'+cols + (Math.ceil(s.items.length/cols) > 2 ? ' dense' : '');
      var html = '<div class="ecs-grid '+cls+'">';
      s.items.forEach(function(it){ html += renderCard(it, s.tone); });
      html += '</div>';
      var withLead = '';
      if(s.lead){ withLead = '<p class="ecs-lead'+(s.lead.quote?' quote':'')+'">'+esc(s.lead.text)+'</p>'; }
      return shell(s, withLead + html);
    },
    numbered:function(s){
      var html = '<div class="ecs-numbered">';
      s.items.forEach(function(it,i){
        html += '<div class="ecs-num-row"><span class="bubble">'+(i+1)+'</span><div class="txt"><h4>'+esc(it.t)+'</h4><p>'+esc(it.d)+'</p></div></div>';
      });
      html += '</div>';
      return shell(s, html);
    },
    statsFeatures:function(s){
      var html = '<div style="display:flex;flex-direction:column;gap:16px;height:100%;">';
      html += '<div class="ecs-stats g4" style="display:grid;grid-template-columns:repeat(4,1fr);flex:0 0 auto;">';
      s.stats.forEach(function(st){
        html += '<div class="ecs-stat"><span class="num">'+esc(st.num)+'</span><span class="lbl">'+esc(st.lbl)+'</span><span class="dt">'+esc(st.dt)+'</span></div>';
      });
      html += '</div>';
      html += '<div class="ecs-grid g2" style="flex:1 1 auto;">';
      s.items.forEach(function(it){ html += renderCard(it); });
      html += '</div></div>';
      return shell(s, html);
    },
    columns:function(s){
      function col(c){
        var lis = c.items.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('');
        return '<div class="ecs-col"><h3><span class="icn sm">'+icon(c.icon,16)+'</span>'+esc(c.title)+'</h3><ul>'+lis+'</ul></div>';
      }
      var html = '<div class="ecs-columns">'+col(s.colA)+col(s.colB)+'</div>';
      return shell(s, html);
    },
    tracks:function(s){
      var html = '<div style="display:flex;flex-direction:column;gap:16px;height:100%;">';
      html += '<div class="ecs-tracks">';
      s.tracks.forEach(function(t,i){
        html += '<div class="ecs-track t'+(i+1)+'"><span class="tnum">'+esc(t.label)+'</span><h4>'+esc(t.name)+'</h4>'+
          '<div class="pg"><span class="n">'+esc(t.grade)+'</span><span class="l">Passing Grade</span></div>'+
          '<p class="pace">'+esc(t.pace)+'</p>'+
          '<p class="note">'+esc(s.note)+'</p></div>';
      });
      html += '</div></div>';
      return shell(s, html);
    },
    demeritSystem:function(s){
      var html = '<div style="display:flex;flex-direction:column;gap:18px;height:100%;">';
      html += '<div class="ecs-stats g3" style="display:grid;grid-template-columns:repeat(3,1fr);flex:0 0 auto;">';
      s.stats.forEach(function(st){
        html += '<div class="ecs-stat"><span class="num">'+esc(st.num)+'</span><span class="lbl">'+esc(st.lbl)+'</span><span class="dt">'+esc(st.dt)+'</span></div>';
      });
      html += '</div>';
      html += '<div style="flex:1 1 auto;background:var(--accent-tint);border-radius:16px;padding:20px 24px;display:flex;flex-direction:column;justify-content:center;box-shadow:0 2px 10px -6px rgba(6,26,56,0.22);">';
      html += '<h4 style="margin:0 0 10px;font-family:\'Source Serif 4\',serif;color:var(--navy-deep);font-size:15px;">'+esc(s.listTitle)+'</h4>';
      html += '<ul class="ecs-simplelist" style="display:grid;grid-template-columns:1fr 1fr;">';
      s.items.forEach(function(it){ html += '<li>'+icon('check')+' '+esc(it)+'</li>'; });
      html += '</ul></div></div>';
      return shell(s, html);
    },
    transport:function(s){
      var html = '<div class="ecs-columns" style="grid-template-columns:1fr 1.3fr;">';
      html += '<div style="display:flex;flex-direction:column;gap:16px;">';
      html += '<div class="ecs-stat" style="flex:0 0 auto;"><span class="num">'+esc(s.stat.num)+'</span><span class="lbl">'+esc(s.stat.lbl)+'</span><span class="dt">'+esc(s.stat.dt)+'</span></div>';
      html += '<div class="ecs-col" style="flex:1 1 auto;"><h3><span class="icn sm">'+icon('bus',16)+'</span>Areas Served</h3><ul>'+s.areas.map(function(a){return '<li>'+esc(a)+'</li>';}).join('')+'</ul></div>';
      html += '</div>';
      html += '<div class="ecs-col"><h3><span class="icn sm">'+icon('shield',16)+'</span>Rules for Van Riders</h3><ul>'+s.rules.map(function(r){return '<li>'+esc(r)+'</li>';}).join('')+'</ul></div>';
      html += '</div>';
      return shell(s, html);
    },
    medication:function(s){
      var html = '<div class="ecs-columns" style="grid-template-columns:1.4fr 1fr;">';
      html += '<div class="ecs-numbered" style="justify-content:flex-start;">';
      s.steps.forEach(function(it,i){
        html += '<div class="ecs-num-row"><span class="bubble">'+(i+1)+'</span><div class="txt"><h4>'+esc(it.t)+'</h4><p>'+esc(it.d)+'</p></div></div>';
      });
      html += '</div>';
      html += '<div style="display:flex;flex-direction:column;gap:16px;">';
      s.stats.forEach(function(st){
        html += '<div class="ecs-stat"><span class="num">'+esc(st.num)+'</span><span class="lbl">'+esc(st.lbl)+'</span><span class="dt">'+esc(st.dt)+'</span></div>';
      });
      html += '</div></div>';
      return shell(s, html);
    },
    timeline:function(s){
      var html = '<div class="ecs-timeline"><div class="ecs-tl-grid">';
      s.items.forEach(function(it){
        html += '<div class="ecs-tl-item'+(it.off?' off':'')+'"><span class="ecs-tl-date">'+esc(it.d)+'</span><span class="ecs-tl-label">'+esc(it.l)+'</span></div>';
      });
      html += '</div></div>';
      return shell(s, html);
    }
  };

  /* ---------------------------------------------------------------
     SECTION THEMES — each section carries its own accent
  --------------------------------------------------------------- */
  var THEMES = {
    'Who We Are':      { a:'#0B4EA8', t:'#E9F0FB' },
    'Academics':       { a:'#0B4EA8', t:'#E9F0FB' },
    'Expectations':    { a:'#8A5612', t:'#FBF2E1' },
    'Dress Code':      { a:'#0E6E6E', t:'#E4F2F2' },
    'Behavior':        { a:'#7A2E5E', t:'#F8ECF4' },
    'Logistics':       { a:'#0E6E6E', t:'#E4F2F2' },
    'Health':          { a:'#1B7A45', t:'#E9F5EE' },
    'Partnership':     { a:'#8A5612', t:'#FBF2E1' },
    'Before You Go':   { a:'#0A2A57', t:'#EAF1FB' }
  };
  var TONE_ACCENTS = {
    positive: { a:'#1B7A45', t:'#EAF5EE' },
    negative: { a:'#B3261E', t:'#FBEAE8' }
  };
  function themeFor(s){
    if(s.tone && TONE_ACCENTS[s.tone]) return TONE_ACCENTS[s.tone];
    return THEMES[s.kicker] || { a:'#0A2A57', t:'#EAF1FB' };
  }

  /* ---------------------------------------------------------------
     BUILD SLIDES INTO DOM
  --------------------------------------------------------------- */
  var canvas = document.getElementById('ecsCanvas');
  var LOGO_SRC = document.getElementById('ecsLogo').getAttribute('src');
  var slideEls = [];

  SLIDES.forEach(function(s, i){
    var fn = RENDER[s.type] || function(){ return shell(s,''); };
    var html = fn(s).replace('__LOGO_SRC__', LOGO_SRC);
    var div = document.createElement('div');
    div.className = 'ecs-slide' + (i===0?' is-active':'');
    var th = themeFor(s);
    div.style.setProperty('--accent', th.a);
    div.style.setProperty('--accent-tint', th.t);
    div.innerHTML = html;
    if(s.type !== 'cover' && s.type !== 'statement'){
      var tag = document.createElement('div');
      tag.className = 'ecs-tag';
      tag.innerHTML = 'Englewood Christian School &nbsp;·&nbsp; <b>'+(i+1)+'</b> / '+SLIDES.length;
      div.appendChild(tag);
    }
    // "Show in handbook" — jumps the handbook page-viewer on this same page to
    // the printed page the slide summarises. A real link so it still works
    // (as an anchor to the viewer) if the handler never runs.
    if(s.page || s.href){
      var jump = document.createElement('a');
      jump.className = 'ecs-hblink';
      if(s.page){
        jump.href = '#doc-2026-2027-Handbook';
        jump.setAttribute('data-doc-target','doc-2026-2027-Handbook');
        jump.setAttribute('data-doc-page', String(s.page));
        jump.innerHTML = 'Show in handbook <span aria-hidden="true">&rarr;</span>' +
          '<span class="ecs-hbpage">p.&nbsp;' + s.page + '</span>';
      } else {
        // A slide whose subject lives on another page of the site rather than
        // in the handbook: an ordinary link, so it just navigates.
        jump.href = s.href;
        jump.innerHTML = (s.linkLabel || 'Read more') +
          ' <span aria-hidden="true">&rarr;</span>';
      }
      div.appendChild(jump);
      div.classList.add('has-hblink');
    }
    canvas.appendChild(div);
    slideEls.push(div);
  });

  /* ---------------------------------------------------------------
     TRAIL DOTS + COUNTER
  --------------------------------------------------------------- */
  var trail = document.getElementById('ecsTrail');
  var dots = [];
  SLIDES.forEach(function(_,i){
    var d = document.createElement('span');
    d.className = 'dot'+(i===0?' on':'');
    trail.appendChild(d);
    dots.push(d);
  });
  var counter = document.getElementById('ecsCounter');

  /* ---------------------------------------------------------------
     NAV STATE
  --------------------------------------------------------------- */
  var current = 0;
  var total = SLIDES.length;
  var prevBtn = document.getElementById('ecsPrev');
  var nextBtn = document.getElementById('ecsNext');

  // The arrows, counter and trail dots are drawn white, which reads on the
  // dark cover and theme slides but disappears on the light content slides.
  // Flag which kind is showing so the stylesheet can switch them to navy.
  function paintChrome(){
    var t = SLIDES[current].type;
    document.getElementById('ecsShell')
      .classList.toggle('on-light', t !== 'cover' && t !== 'statement');
  }

  function goTo(idx){
    if(idx<0 || idx>=total) return;
    slideEls[current].classList.remove('is-active');
    dots[current].classList.remove('on');
    current = idx;
    slideEls[current].classList.add('is-active');
    dots[current].classList.add('on');
    counter.innerHTML = '<b>'+(current+1)+'</b> / '+total;
    prevBtn.disabled = (current===0);
    nextBtn.disabled = (current===total-1);
    paintChrome();
  }
  paintChrome();                       // slide 1 is showing already
  function next(){ goTo(current+1); }
  function prev(){ goTo(current-1); }

  /* ---------------------------------------------------------------
     SIZING — the deck always fills whatever space it is given
  --------------------------------------------------------------- */
  var shell = document.getElementById('ecsShell');
  var stage = document.getElementById('ecsStage');
  var expandBtn = document.getElementById('ecsExpand');

  function isMobileViewport(){
    return Math.min(window.innerWidth, window.innerHeight) < 620 || ('ontouchstart' in window && window.innerWidth < 900);
  }

  function layout(){
    var box = shell.getBoundingClientRect();
    var w = box.width || window.innerWidth;
    var h = box.height || window.innerHeight;
    var rotate = isMobileViewport() && h > w; // portrait phone -> show it landscape
    var availW = rotate ? h : w;
    var availH = rotate ? w : h;
    var sw = availW/1280, sh = availH/720;
    // In the page the box is a CSS 16:9 aspect-ratio, so these two are equal
    // in theory and differ only by sub-pixel rounding — and at some browser
    // zoom levels the height came out a hair smaller, which scaled the canvas
    // narrower than its box and left a dark hairline down each side. When the
    // box is 16:9 to within a percent, fill the width and let the shell's
    // overflow:hidden absorb the fraction of a pixel. Fullscreen is genuinely
    // not 16:9, so there it still has to fit inside both dimensions.
    var scale = Math.abs(sw - sh) / Math.max(sw, sh) < 0.01 ? sw : Math.min(sw, sh);
    document.getElementById('ecsCanvas').style.transform =
      (rotate ? 'rotate(90deg) ' : '') + 'scale('+scale+')';
  }

  /* True fullscreen needs a tap/click to be allowed by the browser,
     so it lives on the expand button rather than firing on load. */
  function toggleFullscreen(){
    var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if(fsEl){
      try{ (document.exitFullscreen || document.webkitExitFullscreen).call(document); }catch(e){}
      if(screen.orientation && screen.orientation.unlock){
        try{ screen.orientation.unlock(); }catch(e){}
      }
      return;
    }
    var req = shell.requestFullscreen || shell.webkitRequestFullscreen;
    if(!req) return;
    try{
      var p = req.call(shell);
      if(p && p.then){
        p.then(function(){
          if(screen.orientation && screen.orientation.lock){
            screen.orientation.lock('landscape').catch(function(){});
          }
        }).catch(function(){});
      }
    }catch(e){}
  }

  function onKey(e){
    if(e.key === 'ArrowRight'){ e.preventDefault(); next(); }
    else if(e.key === 'ArrowLeft'){ e.preventDefault(); prev(); }
  }

  expandBtn.addEventListener('click', toggleFullscreen);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  /* Arrow keys only act when the deck has focus, or while it is
     fullscreen — otherwise they would hijack normal page scrolling. */
  shell.addEventListener('keydown', onKey);
  document.addEventListener('keydown', function(e){
    if(document.fullscreenElement || document.webkitFullscreenElement) onKey(e);
  });
  window.addEventListener('resize', layout);
  window.addEventListener('orientationchange', function(){ setTimeout(layout, 60); });
  document.addEventListener('fullscreenchange', function(){ setTimeout(layout, 60); });
  document.addEventListener('webkitfullscreenchange', function(){ setTimeout(layout, 60); });
  if(screen.orientation && screen.orientation.addEventListener){
    screen.orientation.addEventListener('change', function(){ setTimeout(layout, 60); });
  }
  if(window.ResizeObserver){
    new ResizeObserver(layout).observe(shell);
  }

  goTo(0);
  layout();

  /* ---------------------------------------------------------------
     SWIPE SUPPORT
  --------------------------------------------------------------- */
  var touchX = null, touchY = null;
  stage.addEventListener('touchstart', function(e){
    touchX = e.touches[0].clientX; touchY = e.touches[0].clientY;
  }, {passive:true});
  stage.addEventListener('touchend', function(e){
    if(touchX===null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if(Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)){
      if(dx < 0) next(); else prev();
    }
    touchX = null; touchY = null;
  }, {passive:true});

})();
