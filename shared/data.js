/* Single source of truth for all rooms. Classic view stays static HTML (SEO);
   every themed room renders from this object so content never drifts. */
window.VINH = {
  name: 'Vinh Le',
  role: 'AI Engineer · M.S. CS @ Georgia Tech',
  tagline: 'All-in on AI — building with it daily, studying it at Georgia Tech, and pushing it toward real hardware.',
  location: 'Atlanta, GA',
  email: 'vinhhle24@gmail.com',
  phone: '404-285-7020',
  links: {
    github: 'https://github.com/vinhbin',
    linkedin: 'https://www.linkedin.com/in/vinh-thaile/',
    devpost: 'https://devpost.com/vinhbin',
    resume: 'https://drive.google.com/file/d/1Jyk3KfmpQvOFum6Bcvi72CNqa8acZHWd/view?usp=sharing',
    site: 'https://vinhle.xyz'
  },
  about: [
    "AI is my craft. I build with it daily, and I'm at Georgia Tech for my M.S. in CS to master what's underneath — the models, the deep learning, the systems that make it all work. The next frontier for me is hardware: bringing AI out of the cloud and into the physical world.",
    "The work speaks for itself: Best Hack for Good at Hack RenderATL, 1st place in the Actian VectorAI Build Challenge, and a co-lead role on production software in my first internship — and I'm just getting started.",
    "Off the clock: traveling, good food, videography, and Muay Thai."
  ],
  education: [
    { school: 'Georgia Institute of Technology', degree: 'M.S. Computer Science (OMSCS)', dates: 'Aug 2026 – May 2028', note: 'In Progress' },
    { school: 'Georgia State University', degree: 'B.S. Computer Science', dates: 'Aug 2022 – Dec 2025', note: 'GPA 3.5 · Dean’s List' }
  ],
  experience: [
    {
      title: 'Software Engineering Intern · Co-Lead',
      org: 'SkyIT (GBCS Group)',
      dates: 'Mar 2026 – Jun 2026',
      bullets: [
        'Promoted to co-lead; organized the modernization roadmap and led stabilization of a legacy Django/React fleet platform serving 3 branded frontend clients on a shared backend',
        'Led a multi-tenant enterprise port of the GHG emissions module: tenant-scoped Django models, a two-schema MySQL test harness, and an intern team coordinated across parallel feature lanes',
        'Fixed Django backend defects across 14+ endpoints involving CORS middleware, serializers, ORM filters, blob fallbacks, and API runtime failures',
        'Consolidated backend work into a master-backend branch and standardized API configs across 3 frontend clients; migrated 55+ files across major Axios/PrimeReact versions'
      ],
      tech: ['Django', 'MySQL', 'React', 'Multi-tenant', 'REST APIs']
    },
    {
      title: 'Technical Fellow',
      org: 'CodePath · Foundations of AI Engineering',
      dates: 'Jun 2026 – Aug 2026',
      bullets: [
        'Supported live class sessions and breakout rooms for a 200+ learner AI course, answering technical questions in real time',
        "Awarded CodePath's Certificate of Leadership (Summer 2026)"
      ],
      tech: ['AI Engineering', 'Python', 'Mentorship']
    }
  ],
  skills: {
    'Languages': ['Python', 'Java', 'SQL', 'JavaScript', 'TypeScript'],
    'Backend': ['FastAPI', 'Django', 'Django REST Framework', 'Node.js', 'Express', 'REST APIs', 'JWT Auth'],
    'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'pgvector'],
    'Architecture & Testing': ['Multi-tenant systems', 'API design', 'Data pipelines', 'pytest', 'Automated testing'],
    'Cloud & Tools': ['Docker', 'Git', 'AWS', 'Azure', 'Vercel', 'Railway', 'Render', 'Postman'],
    'AI / ML': ['OpenAI API', 'Claude API', 'Gemini API', 'Embeddings', 'RAG', 'scikit-learn'],
    'Frontend': ['React', 'Next.js', 'MapLibre', 'HTML', 'CSS', 'Bootstrap']
  },
  projects: [
    {
      id: 'wattline',
      name: 'WATTLINE',
      award: 'Best Hack for Good',
      event: 'Hack RenderATL / MLH',
      date: 'Aug 2026',
      desc: 'Led a 4-person team to Best Hack for Good — mapping electricity-dependent medical equipment users to neighborhood-level outage exposure across 25 Atlanta NPUs.',
      bullets: [
        'Verified the federal HHS emPOWER pipeline end-to-end, reconciling a 92,233-person state anchor across ZIP, county, and state layers with small-cell suppression handled as intervals',
        'React/MapLibre frontend with a 24-hour timeline scrubber; read path is precomputed JSON served by FastAPI with no database in the request path'
      ],
      tech: ['React', 'MapLibre', 'FastAPI', 'Data Pipeline'],
      links: { demo: 'https://wattline-web.onrender.com', devpost: 'https://devpost.com/software/wattline', github: 'https://github.com/vinhbin/wattline' },
      image: 'images/wattline.png'
    },
    {
      id: 'trace',
      name: 'Trace',
      award: '1st Place',
      event: 'Actian VectorAI DB Build Challenge',
      date: 'Apr 2026',
      desc: 'Won 1st place for an AI forensic-search platform matching missing persons with unidentified remains.',
      bullets: [
        'Multi-vector retrieval pipeline: SapBERT, BGE-M3, CLIP, Reciprocal Rank Fusion',
        'Pre-filtered vector search to improve accuracy and cut retrieval overhead'
      ],
      tech: ['FastAPI', 'React', 'Vector Search', 'CLIP'],
      links: { demo: 'https://trace-forensic-search-ssookra-7703s-projects.vercel.app/', dorahacks: 'https://dorahacks.io/buidl/43227', github: 'https://github.com/StephenSook/trace-forensic-search' },
      image: 'images/trace.png'
    },
    {
      id: 'apex',
      name: 'APEX',
      award: null,
      event: 'IBM SkillsBuild AI Builders Challenge',
      date: 'May 2026',
      desc: "Backend for an AI race-engineer built on IBM Granite, coaching adaptive racers who don't have one.",
      bullets: [
        'Owned API routes and Granite tool integration across 20 live endpoints',
        'Authored the backend test suite (192 tests) and wired CI to gate every merge'
      ],
      tech: ['IBM Granite', 'REST APIs', 'Testing', 'CI/CD'],
      links: { demo: 'https://apex-one-black.vercel.app', github: 'https://github.com/StephenSook/apex' },
      image: 'images/apex.png'
    },
    {
      id: 'atlas',
      name: 'Hometown Pathway Atlas',
      award: null,
      event: 'Team USA × Google Cloud Hackathon',
      date: 'May 2026',
      desc: 'County-level Olympic/Paralympic parity analytics across all 3,222 U.S. counties.',
      bullets: [
        'Data pipeline with per-capita normalization and empirical-Bayes shrinkage',
        'Integrated Vertex AI Gemini and deployed on Google Cloud Run'
      ],
      tech: ['Python', 'Vertex AI', 'Gemini', 'Cloud Run'],
      links: { demo: 'https://atlas-frontend-635524063449.us-central1.run.app', github: 'https://github.com/StephenSook/Hometown-Pathway-Atlas' },
      image: 'images/atlas.png'
    },
    {
      id: 'contextmod',
      name: 'ContextMod',
      award: 'Published App',
      event: 'Reddit Mod Tools Hackathon',
      date: 'May 2026',
      desc: 'Rule-engine backend for a native Devvit moderation bot, published on the Reddit developer platform.',
      bullets: [
        'JSON5 rules with multiple rule kinds and action handlers',
        'Strict-TypeScript, fully-tested codebase'
      ],
      tech: ['TypeScript', 'Devvit', 'JSON5'],
      links: { app: 'https://developers.reddit.com/apps/cm-devvit', github: 'https://github.com/StephenSook/context-mod-devvit' },
      image: 'images/contextmod.png'
    },
    {
      id: 'bearing-witness',
      name: 'Bearing Witness',
      award: null,
      event: 'Dell × NVIDIA AI Hackathon · NYC',
      date: '2026',
      desc: 'Always-on, fully local bearing-screening agent on the Dell Pro Max GB10. Physics does the diagnosis, a local model files the paperwork, a human has to say yes.',
      bullets: [],
      tech: ['Python', 'Local LLM', 'Signal Processing'],
      links: { github: 'https://github.com/StephenSook/bearing-witness' },
      image: null
    },
    {
      id: 'rivals-coach',
      name: 'Rivals Coach',
      award: null,
      event: 'Side Project',
      date: '2026',
      desc: 'Live coaching companion for Marvel Rivals: reads the match roster via Overwolf GEP and suggests one pick, swap, or hold from your own comfort pool.',
      bullets: [],
      tech: ['TypeScript', 'Overwolf'],
      links: { github: 'https://github.com/vinhbin/Marvel-Rivals-Live-Coach' },
      image: null
    }
  ],
  earlier: [
    { id: 'vibecheck', name: 'VibeCheck', date: 'Mar 2026', desc: 'Real-time networking platform built in 12 hours; AI matching via pgvector cosine similarity with streaming.', tech: ['Express', 'Supabase', 'pgvector'], links: { demo: 'https://vibe-check-seven-bay.vercel.app/' }, image: 'images/vibechecklp.png' },
    { id: 'carecircle', name: 'CareCircle', date: 'Apr 2026', desc: 'Multilingual caregiving platform: 10 languages, multimodal AI pipeline for OCR, voice transcription, and medical translation.', tech: ['Next.js', 'Supabase', 'Gemini 2.5'], links: { github: 'https://github.com/vinhbin/CareCircle' }, image: 'images/carecirclelp.png' },
    { id: 'financeflow', name: 'FinanceFlow', date: 'Fall 2024', desc: 'Top 3 capstone: financial platform with Plaid integration, JWT auth, and AI-powered insights.', tech: ['Node.js', 'Express', 'MySQL', 'Plaid'], links: { demo: 'https://financeflow.icu/login' }, image: 'images/financeflow5.png' },
    { id: 'tripboard', name: 'TripBoard', date: 'Fall 2025', desc: 'Collaborative travel planning with REST APIs, MongoDB, and real-time group scheduling.', tech: ['React', 'Node.js', 'MongoDB'], links: { demo: 'https://app.tripboard.xyz/dashboard' }, image: 'images/tripboard.png' },
    { id: 'smartbook', name: 'SmartBook', date: 'Jan – May 2025', desc: 'Flutter mobile reading companion: Google Books search, Firebase Auth, Firestore.', tech: ['Flutter', 'Dart', 'Firebase'], links: { github: 'https://github.com/vinhbin/smartbook' }, image: 'images/smartbook3.png' },
    { id: 'heartdisease', name: 'Heart Disease Prediction', date: 'Fall 2025', desc: 'Logistic Regression and Random Forest on clinical data, evaluated via ROC-AUC, precision, and recall.', tech: ['Python', 'scikit-learn', 'Pandas'], links: { github: 'https://github.com/vinhbin/heartdiseaseDS' }, image: 'images/heartdisease.jfif' }
  ],
  life: [
    { src: 'images/life/shot-3.jpg', caption: 'Golden hour over Sutro Baths', album: 'Shots' },
    { src: 'images/life/shot-4.jpg', caption: 'Wings out at Lands End', album: 'Shots' },
    { src: 'images/life/shot-5.jpg', caption: 'Front row seats to the Pacific', album: 'Shots' },
    { src: 'images/life/shot-6.jpg', caption: 'Sutro Baths at dusk', album: 'Shots' },
    { src: 'images/life/shot-7.jpg', caption: 'Crissy Field, one good boy', album: 'Shots' },
    { src: 'images/life/shot-8.jpg', caption: 'The climb to the bridge', album: 'Shots' },
    { src: 'images/life/shot-9.jpg', caption: 'Golden Gate in bloom', album: 'Shots' },
    { src: 'images/life/shot-10.jpg', caption: 'Japanese garden, deep summer', album: 'Shots' },
    { src: 'images/life/travel-1.jpg', caption: 'Sensō-ji Temple — Tokyo', album: 'Travel' },
    { src: 'images/life/travel-2.jpg', caption: 'Sunset wade with the crew', album: 'Travel' },
    { src: 'images/life/travel-3.jpg', caption: 'Straight up, midnight towers', album: 'Travel' },
    { src: 'images/life/travel-4.jpg', caption: 'City lights from the top', album: 'Travel' },
    { src: 'images/life/shot-1.jpg', caption: 'Above the valley', album: 'Shots' },
    { src: 'images/life/shot-2.jpg', caption: 'Golden hour local', album: 'Shots' },
    { src: 'images/life/muaythai-1.jpg', caption: 'After sparring', album: 'Muay Thai' }
  ],
  rooms: [
    { id: 'terminal', file: 'terminal.html', name: 'The Terminal', accent: '#33ff66', blurb: 'A working shell. Type help.' },
    { id: 'phone', file: 'phone.html', name: 'The Phone', accent: '#9fc9ff', blurb: 'Slide to unlock.' },
    { id: 'retro', file: 'retro.html', name: 'Retro Windows', accent: '#14b8a6', blurb: 'It is now safe to browse my archive.' },
    { id: 'game', file: 'game.html', name: 'The Arcade', accent: '#ff2d95', blurb: '60 seconds. Keep the lights on.' },
    { id: 'classic', file: 'classic.html', name: 'The Classic View', accent: '#c9a84c', blurb: 'The portfolio, no games. Quick view.' }
  ]
};
