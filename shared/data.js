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
    "I'm an AI engineer passionate about pushing models out of the cloud and into the physical world. My work sits at the intersection of applied machine learning, production software, and hardware-aware systems — retrieval, multimodal search, geospatial intelligence, and on-device agents that still keep a human in the loop.",
    "I specialize in shipping AI that has to hold up at a judging table and in production: WATTLINE (Best Hack for Good) mapped electricity-dependent medical equipment users to neighborhood outages across Atlanta; Trace (1st — Actian VectorAI) is a forensic search stack on SapBERT, BGE-M3, CLIP, and rank fusion; Bearing Witness runs a local screening agent on a Dell Pro Max GB10. The tools I actually reach for are Python, FastAPI, Django, React, vector search, RAG, and the model APIs the problem needs — then tests, CI, and a demo that doesn't flake.",
    "I love the ugly middle: messy federal data, flaky endpoints, a pipeline that has to be right because the number is a person. I will sit in performance, retrieval quality, and backend correctness until the system is something I would put in front of a stranger.",
    "In production I was promoted to co-lead on a Django/React fleet platform in my first internship — multi-tenant work, 14+ backend endpoints, three branded clients on one backend. I want that same discipline when the runtime is a sensor, a box with no cloud, or a robot. I'm at Georgia Tech for my M.S. in CS to go deeper on the models and systems underneath.",
    "I thrive in rooms with a clock and a crowd: hackathons, live demos, CodePath sessions with 200+ learners. I like making the next person faster than I was.",
    "At the core, I'm driven by one mission:",
    "turning advanced AI into practical systems that interact with the physical world.",
    "If you're building in applied AI, on-device inference, or software that has to survive contact with reality, I'd love to connect."
  ],
  archive: {
    pitch: "I'm an AI engineer passionate about pushing models out of the cloud and into the physical world.",
    quest: "Bring AI out of the cloud and into the physical world. Georgia Tech is the training. Hardware is the quest that is not done.",
    signal: "Write if you want this person in the room.",
    memories: [
      { src: 'images/life/wattline-winning-picture.jpg', caption: 'Best Hack for Good — Hack RenderATL' },
      { src: 'images/life/cox-hackathon-pic.jpg', caption: 'Demo day — walking the table through it' },
      { src: 'images/life/muaythai-1.jpg', caption: 'After sparring' }
    ],
    top10: ['wattline', 'trace', 'apex', 'atlas', 'contextmod', 'bearing-witness', 'rivals-coach'],
    legendary: ['wattline', 'trace'],
    trial: [
      {
        id: 'skyit',
        beats: [
          'Promoted to co-lead on a Django/React fleet platform serving 3 branded clients on one backend',
          'Led the multi-tenant GHG emissions port: tenant-scoped models, a two-schema MySQL harness, intern lanes in parallel',
          'Stabilized 14+ backend endpoints — CORS, serializers, ORM filters, blob fallbacks, runtime failures'
        ]
      },
      { id: 'codepath' }
    ]
  },
  education: [
    { school: 'Georgia Institute of Technology', degree: 'M.S. Computer Science (OMSCS)', dates: 'Aug 2026 – May 2028', note: 'In Progress' },
    { school: 'Georgia State University', degree: 'B.S. Computer Science', dates: 'Aug 2022 – Dec 2025', note: 'GPA 3.5 · Dean’s List' }
  ],
  experience: [
    {
      id: 'skyit',
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
      id: 'codepath',
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
  earlier: [],
  life: [
    { src: 'images/life/wattline-winning-picture.jpg', caption: 'Best Hack for Good — Hack RenderATL', album: 'Builds' },
    { src: 'images/life/cox-hackathon-pic.jpg', caption: 'Demo day — walking the table through it', album: 'Builds' },
    { src: 'images/life/muaythai-1.jpg', caption: 'After sparring', album: 'Muay Thai' },
    { src: 'images/life/travel-1.jpg', caption: 'Sensō-ji Temple — Tokyo', album: 'Travel' },
    { src: 'images/life/shot-11.jpg', caption: 'Golden Gate in bloom', album: 'Shots' },
    { src: 'images/life/travel-3.jpg', caption: 'Straight up, midnight towers', album: 'Travel' },
    { src: 'images/life/shot-10.jpg', caption: 'Japanese garden, deep summer', album: 'Shots' },
    { src: 'images/life/travel-2.jpg', caption: 'Sunset wade with the crew', album: 'Travel' },
    { src: 'images/life/shot-3.jpg', caption: 'Golden hour over Sutro Baths', album: 'Shots' },
    { src: 'images/life/shot-4.jpg', caption: 'Wings out at Lands End', album: 'Shots' },
    { src: 'images/life/shot-5.jpg', caption: 'Front row seats to the Pacific', album: 'Shots' },
    { src: 'images/life/shot-6.jpg', caption: 'Sutro Baths at dusk', album: 'Shots' },
    { src: 'images/life/shot-7.jpg', caption: 'Crissy Field, one good boy', album: 'Shots' },
    { src: 'images/life/shot-8.jpg', caption: 'The climb to the bridge', album: 'Shots' },
    { src: 'images/life/shot-9.jpg', caption: 'Through the trees', album: 'Shots' },
    { src: 'images/life/travel-4.jpg', caption: 'City lights from the top', album: 'Travel' },
    { src: 'images/life/shot-1.jpg', caption: 'Above the valley', album: 'Shots' },
    { src: 'images/life/shot-2.jpg', caption: 'Golden hour local', album: 'Shots' }
  ],
  rooms: [
    { id: 'classic', file: 'classic.html', name: 'The Classic View', accent: '#c9a84c', blurb: 'The portfolio, no games. Quick view.' }
  ]
};
