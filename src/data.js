// ── All site data — curated from real resume & verified profiles ──

export const profile = {
  name: 'Arvind Meena',
  initials: 'AM',
  avatar: 'https://media.licdn.com/dms/image/v2/D5603AQEbi3ljkOpuBA/profile-displayphoto-scale_400_400/B56Z91.IqBG4Ag-/0/1784390652923?e=1789603200&v=beta&t=LUpKbrlmb_ddJenRBkFxVZmxGQMgTvEouYnivIANhTo',
  title: 'Full Stack & Backend Engineer',
  tagline: 'Student at IIT Kharagpur building high-throughput backends, distributed systems, and scalable full-stack applications.',
  location: 'IIT Kharagpur, India',
  email: 'arvindmeena8171@gmail.com',
  phone: '+91 7217332482',
  linkedin: 'https://www.linkedin.com/in/arvind-meena-78a258288',
  github: 'https://github.com/Arvindmeen',
  resumeUrl: '#',
  available: true,
  stats: [
    { value: 2, suffix: '+', label: 'Years Experience' },
    { value: 410, suffix: '+', label: 'DSA Problems Solved' },
    { value: 15, suffix: '+', label: 'Projects Built' },
  ],
  roles: [
    'Backend Systems Engineer',
    'Full Stack Developer',
    'Competitive Programmer',
    'IIT Kharagpur Student',
    'System Design Enthusiast',
  ],
  bio: [
    `Hey! I'm Arvind Meena, a Bioscience and Biotechnology student at IIT Kharagpur who fell in love with backend engineering — now building high-throughput distributed systems, event-driven architectures, and production-grade REST APIs.`,
    `My work spans architecting a 7-microservice train booking platform with Kafka-driven event pipelines, Saga-pattern fault tolerance, and a 96% latency cut via Redis caching down to building a real-time geospatial surge-pricing engine with Apache Flink and H3 indexing that processes 10,000+ location events per second.`,
    `I've shipped a scalable e-commerce REST API with JWT auth and RBAC as a Software Developer Intern at Atlys Workforce Technologies, containerized full microservice ecosystems with Docker, and solved 410+ problems across LeetCode (Knight Badge, Top 5%) and Codeforces.`,
  ],
};

export const skills = [
  // ── 1. Core CS & Fundamentals ──
  {
    name: 'DSA',
    icon: '/skills/dsa.svg',
    emoji: '🧠',
    cat: 'core-cs',
    project: 'Competitive Programming & Algorithms',
    summary: '410+ problems solved across LeetCode (Knight rank, 1869 peak) and Codeforces (Pupil 1329 peak).',
    highlight: 'Knight on LeetCode (Top 5.6%)'
  },
  {
    name: 'System Design',
    icon: '/skills/system-design.svg',
    emoji: '📐',
    cat: 'core-cs',
    project: 'Book My Train & RideTrack',
    summary: 'Architected 7 microservices with database-per-service, API Gateway, event streaming & circuit breakers.',
    highlight: '7 Microservices Architecture'
  },
  {
    name: 'OOP',
    icon: '/skills/oop.svg',
    emoji: '🧩',
    cat: 'core-cs',
    project: "Rubik's Cube Solver",
    summary: 'Developed modular 3x3 Rubik’s cube models using pure-virtual functions, inheritance & operator overloading.',
    highlight: 'C++ Object Models'
  },
  {
    name: 'C++ STL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    cat: 'core-cs',
    project: "Rubik's Cube Solver & CP",
    summary: 'Extensive use of unordered_map, priority_queue, vectors, and bitset operations for state search.',
    highlight: 'Optimized Bit-Level State'
  },
  {
    name: 'OS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    cat: 'core-cs',
    project: 'IIT Kharagpur Academic',
    summary: 'Deep understanding of process scheduling, multithreading, concurrency, memory paging & file systems.',
    highlight: 'Concurrency & Threads'
  },
  {
    name: 'DBMS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    cat: 'core-cs',
    project: 'Book My Train & Atlys',
    summary: 'Database normalization, indexing strategies, ACID guarantees, and database-per-service modeling.',
    highlight: 'ACID & Indexing'
  },

  // ── 2. Backend Engineering ──
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    cat: 'backend',
    project: 'Atlys & Book My Train',
    summary: 'Engineered high-performance backend microservices and REST APIs handling asynchronous I/O and event pipelines.',
    highlight: 'Scalable Microservices'
  },
  {
    name: 'Express.js',
    icon: '/skills/express.svg',
    cat: 'backend',
    project: 'Book My Train & Atlys',
    summary: 'Built centralized API Gateway with rate limiting, JWT authentication, circuit breakers & CORS.',
    highlight: 'API Gateway Routing'
  },
  {
    name: 'Prisma ORM',
    icon: '/skills/prisma.svg',
    cat: 'backend',
    project: 'Backend Applications',
    summary: 'Type-safe database modeling, automated schema migrations, relation queries & connection pooling.',
    highlight: 'Type-Safe ORM'
  },
  {
    name: 'REST API',
    icon: '/skills/rest-api.svg',
    emoji: '🔗',
    cat: 'backend',
    project: 'Atlys Workforce Technologies',
    summary: 'Designed e-commerce order management and cart systems across 15+ REST endpoints documented via Postman.',
    highlight: '15+ Documented Endpoints'
  },
  {
    name: 'GraphQL',
    icon: '/skills/graphql.svg',
    emoji: '◈',
    cat: 'backend',
    project: 'API Architecture & Query Layer',
    summary: 'Declarative data fetching with strongly typed schemas, custom resolvers, mutations & eliminating over-fetching.',
    highlight: 'Typed Schemas & Resolvers'
  },
  {
    name: 'API Gateway',
    icon: '/skills/api-gateway.svg',
    emoji: '🚪',
    cat: 'backend',
    project: 'Book My Train',
    summary: 'Centralized entry point eliminating direct client calls, enforcing rate limiting, JWT auth & circuit breakers.',
    highlight: 'Zero Direct Client Calls'
  },
  {
    name: 'WebSockets',
    icon: '/skills/websockets.svg',
    emoji: '⚡',
    cat: 'backend',
    project: 'RideTrack Platform',
    summary: 'Real-time bidirectional event streaming pipeline handling 10,000+ concurrent live location events per second.',
    highlight: '10,000+ Events / sec'
  },
  {
    name: 'JWT',
    icon: '/skills/jwt.svg',
    emoji: '🔐',
    cat: 'backend',
    project: 'Atlys & Book My Train',
    summary: 'Designed secure auth with access tokens, refresh token rotation, OTP verification & Google OAuth.',
    highlight: 'Token Rotation & OAuth'
  },
  {
    name: 'RBAC',
    icon: '/skills/rbac.svg',
    emoji: '🛡️',
    cat: 'backend',
    project: 'Atlys Workforce Technologies',
    summary: 'Implemented fine-grained role-based access control protecting administrative, customer & inventory routes.',
    highlight: 'Role-Based Authorization'
  },

  // ── 3. Distributed Systems & Architecture ──
  {
    name: 'Microservices',
    icon: '/skills/microservices.svg',
    emoji: '🏗️',
    cat: 'dist-sys',
    project: 'Book My Train',
    summary: 'Architected 7 independently deployable services (Auth, Train, Booking, Payment, Search, Notification).',
    highlight: '7 Independent Services'
  },
  {
    name: 'Apache Kafka',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg',
    cat: 'dist-sys',
    invert: true,
    project: 'Book My Train & RideTrack',
    summary: 'Event-driven producer-consumer streaming architecture with Dead Letter Queues (DLQ) for fault tolerance.',
    highlight: 'Event-Driven Streaming'
  },
  {
    name: 'RabbitMQ',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg',
    cat: 'dist-sys',
    project: 'Distributed Workflows',
    summary: 'Asynchronous message brokering with task queues, exchange routing & publish-subscribe patterns.',
    highlight: 'Async Message Queuing'
  },
  {
    name: 'Dist. Caching',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    cat: 'dist-sys',
    project: 'Book My Train',
    summary: 'Slashed API response latency by 96% (500ms down to 20ms) using multi-tier Redis caching strategies.',
    highlight: '96% Latency Reduction'
  },
  {
    name: 'Rate Limiting',
    icon: '/skills/ratelimiting.svg',
    emoji: '⏱️',
    cat: 'dist-sys',
    project: 'RideTrack & Book My Train',
    summary: 'Token bucket and sliding window rate limiting in API Gateway protecting downstream microservices.',
    highlight: 'DDoS & Abuse Protection'
  },
  {
    name: 'Idempotency',
    icon: '/skills/idempotency.svg',
    emoji: '🔁',
    cat: 'dist-sys',
    project: 'Book My Train',
    summary: 'Built idempotent payment & booking APIs with unique idempotency keys preventing double charge/booking.',
    highlight: 'Zero Duplicate Bookings'
  },
  {
    name: 'Saga Pattern',
    icon: '/skills/saga.svg',
    emoji: '🔄',
    cat: 'dist-sys',
    project: 'Book My Train',
    summary: 'Engineered fault-tolerant distributed transactions across booking, seat allocation & payment with rollback compensations.',
    highlight: 'Distributed Rollbacks'
  },
  {
    name: 'Dist. Txns',
    icon: '/skills/dist-txns.svg',
    emoji: '⚙️',
    cat: 'dist-sys',
    project: 'Book My Train',
    summary: 'Optimistic concurrency control with distributed locks in Redis for real-time seat inventory reservation.',
    highlight: 'Distributed Seat Locking'
  },
  {
    name: 'H3 Indexing',
    icon: '/skills/h3.svg',
    emoji: '🌐',
    cat: 'dist-sys',
    project: 'RideTrack Platform',
    summary: 'Uber H3 hexagonal spatial indexing for real-time driver density calculation and dynamic surge pricing.',
    highlight: 'Hexagonal Spatial Surge'
  },
  {
    name: 'Apache Flink',
    icon: '/skills/flink.svg',
    emoji: '🌊',
    cat: 'dist-sys',
    project: 'RideTrack Platform',
    summary: 'Dynamic real-time surge pricing engine using sliding window stream aggregation across geospatial events.',
    highlight: 'Sliding Window Stream'
  },

  // ── 4. Databases & Storage ──
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    cat: 'database',
    project: 'Book My Train',
    summary: 'Relational data modeling, schema migrations, foreign keys, and ACID transactions for train and booking data.',
    highlight: 'Database-Per-Service'
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    cat: 'database',
    project: 'Atlys Workforce Technologies',
    summary: 'Document-based product management, category filtering, cart operations and order history schemas.',
    highlight: 'NoSQL Product Store'
  },
  {
    name: 'Redis',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    cat: 'database',
    project: 'Book My Train & RideTrack',
    summary: 'In-memory caching, distributed locks, session management, and rate limiting key-value store.',
    highlight: 'Sub-millisecond Latency'
  },
  {
    name: 'Redis Geo',
    icon: '/skills/redis-geo.svg',
    emoji: '🗺️',
    cat: 'database',
    project: 'RideTrack Platform',
    summary: 'Eliminated high-frequency DB writes using geospatial radius queries, reducing location latency by 70%.',
    highlight: '70% Location Latency Cut'
  },
  {
    name: 'SQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    cat: 'database',
    project: 'Database Design & Queries',
    summary: 'Complex multi-table joins, subqueries, group by aggregations, query execution planning & index tuning.',
    highlight: 'Query Optimization'
  },
  {
    name: 'Elasticsearch',
    icon: '/skills/elasticsearch.svg',
    cat: 'database',
    project: 'Book My Train',
    summary: 'Implemented full-text & fuzzy search indexing across stations, routes and train schedules.',
    highlight: 'Fuzzy Station Search'
  },

  // ── 5. Languages ──
  {
    name: 'C',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    cat: 'language',
    project: 'Systems Programming & OS',
    summary: 'Low-level memory pointers, struct alignment, system calls, and data structure implementations.',
    highlight: 'Manual Memory Control'
  },
  {
    name: 'C++',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    cat: 'language',
    project: "Rubik's Cube Solver & CP",
    summary: "Built IDA* solver achieving 3s solve for 8-move scrambles and 10s for 13-move scrambles with bitmasks.",
    highlight: "Korf's IDA* Algorithm"
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    cat: 'language',
    project: 'Algorithms & Automation',
    summary: 'Used for algorithm prototyping, data analysis, script automation, and AI integrations.',
    highlight: 'Rapid Prototyping'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    cat: 'language',
    project: 'Full Stack Development',
    summary: 'Modern ES6+, async/await concurrency, event loop mastery, functional programming & DOM control.',
    highlight: 'Async Concurrency'
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    cat: 'language',
    project: 'Frontend & Backend',
    summary: 'Static type safety, interfaces, union types, and strict contracts across client and server.',
    highlight: 'Strict Type Safety'
  },

  // ── 6. DevOps, Cloud & Tools ──
  {
    name: 'AWS (EC2, S3)',
    icon: '/skills/aws.svg',
    cat: 'tools',
    project: 'Cloud Deployment',
    summary: 'Configured EC2 virtual instances for backend services and S3 buckets for secure cloud file storage.',
    highlight: 'EC2 & S3 Cloud'
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    cat: 'tools',
    project: 'Book My Train',
    summary: 'Containerized 7 microservices, Kafka, PostgreSQL, Redis and Kibana with multi-container Docker Compose.',
    highlight: 'Docker Compose Orchestration'
  },
  {
    name: 'Nginx',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    cat: 'tools',
    project: 'Server Infrastructure',
    summary: 'Configured reverse proxying, SSL/TLS termination, gzip compression and load balancing for APIs.',
    highlight: 'Reverse Proxy & Load Balancer'
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    cat: 'tools',
    project: 'All Projects',
    summary: 'Git branching workflows, interactive rebasing, merge conflict resolution, and commit hygiene.',
    highlight: 'Version Control'
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    cat: 'tools',
    invert: true,
    project: 'Collaborative Dev',
    summary: 'Continuous integration workflows, pull requests, issue tracking, and repository management.',
    highlight: 'CI/CD & Collaboration'
  },
  {
    name: 'Postman',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
    cat: 'tools',
    project: 'Atlys Workforce Technologies',
    summary: 'Documented 15+ REST API endpoints, automated testing scripts, environment variable collections.',
    highlight: '15+ Endpoints Test Suite'
  },
  {
    name: 'Firebase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
    cat: 'tools',
    project: 'Real-Time Apps',
    summary: 'Integrated Firebase authentication, Cloud Firestore real-time data sync, and cloud messaging.',
    highlight: 'Real-Time Sync'
  },
  {
    name: 'Vercel',
    icon: '/skills/vercel.svg',
    cat: 'tools',
    project: 'Web Deployments',
    summary: 'Serverless edge continuous deployment with instant preview builds and global CDN acceleration.',
    highlight: 'Edge Serverless'
  },
  {
    name: 'Netlify',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    cat: 'tools',
    project: 'Web Hosting',
    summary: 'Git-integrated frontend deployments with serverless form handlers and custom domain routing.',
    highlight: 'Automated CI Hosting'
  },
  {
    name: 'Railway',
    icon: '/skills/railway.svg',
    emoji: '🚂',
    cat: 'tools',
    project: 'Backend Hosting',
    summary: 'Hosted Node.js services, Redis instances, and PostgreSQL databases with automated build pipelines.',
    highlight: 'Full-Stack Container Host'
  },
  {
    name: 'Render',
    icon: '/skills/render.svg',
    emoji: '☁️',
    cat: 'tools',
    project: 'Web Services',
    summary: 'Deployed web services, background workers, and managed PostgreSQL databases with SSL out-of-the-box.',
    highlight: 'Managed Cloud Host'
  },
  {
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    cat: 'tools',
    project: 'Product Design',
    summary: 'Designed UI component libraries, wireframes, interaction prototypes and design tokens.',
    highlight: 'UI/UX Prototyping'
  },
  {
    name: 'Canva',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    cat: 'tools',
    project: 'Visual Design',
    summary: 'Created architecture schematics, technical presentation decks, vector graphics and branding assets.',
    highlight: 'Architecture Graphics'
  },

  // ── 7. Frontend ──
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    cat: 'frontend',
    project: 'Frontend Engineering',
    summary: 'Built responsive single-page applications with custom hooks, component composition & state management.',
    highlight: 'Component Architecture'
  },
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    cat: 'frontend',
    project: 'Web Applications',
    summary: 'Semantic HTML5 structure, accessibility (a11y) standards, and SEO-optimized web documents.',
    highlight: 'Semantic Web'
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    cat: 'frontend',
    project: 'Web Styling',
    summary: 'Crafted modern user interfaces with Tailwind CSS, Flexbox, CSS Grid, keyframes & glassmorphism.',
    highlight: 'Glassmorphism & Animations'
  },
];

export const skillCategories = [
  { id: 'all',         label: 'All' },
  { id: 'core-cs',     label: 'Core CS' },
  { id: 'backend',     label: 'Backend' },
  { id: 'dist-sys',    label: 'Distributed Systems' },
  { id: 'database',    label: 'Databases & Storage' },
  { id: 'language',    label: 'Languages' },
  { id: 'tools',       label: 'DevOps & Tools' },
  { id: 'frontend',    label: 'Frontend' },
];

export const experience = [
  {
    role: 'Software Developer Intern',
    company: 'Atlys Workforce Technologies',
    period: "May'25 – Jun'25",
    desc: 'Developed a scalable E-Commerce REST API using Node.js, Express.js, and MongoDB with JWT authentication and bcrypt password hashing. Built product management system with CRUD operations, category filtering, pagination, and role-based access control (RBAC). Designed order management and cart system with inventory tracking across 15+ REST API endpoints documented via Postman.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'RBAC', 'REST API', 'Postman'],
  },
  {
    role: 'Competitive Programmer & Problem Solver',
    company: 'LeetCode & Codeforces',
    period: '2024 – Present',
    desc: 'Solved 410+ algorithmic problems focusing on Dynamic Programming, Graph Theory, Trees, and Bit Manipulation. Knight on LeetCode (Top 5.6% Worldwide, 1869 peak rating) and Pupil on Codeforces (1329 peak rating) across 40+ rated global rounds.',
    tags: ['C++', 'DSA', 'Algorithms', 'Graph Theory', 'Dynamic Programming', 'Competitive Programming'],
  },
  {
    role: 'Open Source & Core Contributor',
    company: 'GitHub Projects',
    period: '2023 – Present',
    desc: 'Actively architected and open-sourced distributed systems projects including microservices platforms with Kafka, real-time spatial intelligence engines with Apache Flink & Redis Geospatial, and C++ IDA* solvers.',
    tags: ['Distributed Systems', 'Apache Kafka', 'Redis', 'Docker', 'Open Source'],
  },
];

export const projects = [
  {
    title: 'Book My Train | Microservices Architecture',
    desc: 'Architected a scalable platform using 7 microservices and database-per-service architecture. Centralized API Gateway with rate limiting, circuit breakers & JWT auth. Event-driven Kafka pipeline with Dead Letter Queues, Saga pattern distributed seat locking, idempotent APIs, and Redis caching slashing latency by 96% (500ms to 20ms). Containerized with Docker Compose.',
    tags: ['Node.js', 'Express.js', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Docker', 'Microservices', 'Saga Pattern'],
    emoji: '🚂',
    gradient: 'from-indigo-600 to-violet-700',
    demo: '#',
    repo: 'https://github.com/Arvindmeen',
  },
  {
    title: 'RideTrack | Distributed Real-Time Mobility Intelligence',
    desc: 'Eliminated high-frequency DB writes using Redis Geospatial & in-memory caching, reducing location latency by 70%. Event streaming pipeline using WebSockets & Kafka handling 10,000+ concurrent location events/sec. Built dynamic surge pricing engine using Apache Flink sliding window aggregation and Uber H3 spatial indexing.',
    tags: ['WebSockets', 'Apache Kafka', 'Apache Flink', 'Redis', 'H3 Indexing', 'Distributed Systems'],
    emoji: '🏍️',
    gradient: 'from-blue-600 to-cyan-600',
    demo: '#',
    repo: 'https://github.com/Arvindmeen',
  },
  {
    title: "Rubik's Cube Solver using Korf's IDA* Algorithm",
    desc: "Developed a virtual 3x3 Rubik's Cube in three C++ models using OOP principles and bit-level state encoding. Custom move generator achieving 3s solve time for 8-move scrambles with BFS/IDDFS and 10s for 13-move scrambles with Korf's IDA* algorithm using move pruning and transposition tables.",
    tags: ['C++', 'Algorithms & DSA', 'OOP', 'STL', 'Graph Search', 'Bit Manipulation'],
    emoji: '🎲',
    gradient: 'from-emerald-600 to-teal-700',
    demo: '#',
    repo: 'https://github.com/Arvindmeen',
  },
  {
    title: 'Fashion-hub | Scalable E-Commerce',
    desc: 'Engineered a robust REST API backend with Node.js, Express.js, and MongoDB. Secure JWT auth, refresh token rotation, bcrypt password hashing, and role-based access control (RBAC). Complete order tracking and inventory management across 15+ endpoints.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'RBAC', 'Postman'],
    emoji: '🛒',
    gradient: 'from-amber-600 to-orange-700',
    demo: '#',
    repo: 'https://github.com/Arvindmeen',
  },
];

export const education = [
  {
    degree: 'B.Tech + M.Tech (Dual Degree) | Bioscience and Biotechnology',
    institution: 'Indian Institute of Technology Kharagpur',
    period: '2023 – 2028',
    badge: '🎓 Dual Degree (B.Tech + M.Tech)',
    logo: '/iitkgp.png',
    desc: 'Pursuing a Dual Degree in Bioscience and Biotechnology, while building strong expertise in Computer Science — Data Structures, Algorithms, Operating Systems, DBMS, and Distributed System Design.',
  },
  {
    degree: 'Dakshana Scholar | JEE Advanced Preparation',
    institution: 'The Dakshana Foundation, Pune',
    period: '2022 – 2023',
    badge: '🏆 JEE Advanced 2023 Qualified',
    logo: '/dakshana.png',
    desc: 'Selected through the national Joint Dakshana Selection Test (JDST) for an intensive 1-year fully-funded residential fellowship for JEE Advanced 2023, securing admission into IIT Kharagpur.',
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'Jawahar Navodaya Vidyalaya, Moradabad',
    period: '2020 – 2022',
    badge: '🔬 PCM Stream · CBSE',
    logo: '/jnv.png',
    desc: 'Specialized in Physics, Chemistry, and Mathematics (PCM) under CBSE. Developed strong foundational analytical thinking, calculus, and mathematical problem-solving skills.',
  },
  {
    degree: 'Secondary (10th)',
    institution: 'Jawahar Navodaya Vidyalaya, Moradabad',
    period: '2015 – 2020',
    badge: '🌟 Merit Selected JNV Scholar',
    logo: '/jnv.png',
    desc: 'Completed secondary education with distinction under CBSE. Earned admission into Jawahar Navodaya Vidyalaya through the competitive district-level merit exam.',
  },
];

export const certifications = [
  'Knight Badge on LeetCode (1869 Peak Rating, Top 5.6% Worldwide)',
  'Pupil Rank on Codeforces (1329 Peak Rating, 25+ Rated Rounds)',
];
