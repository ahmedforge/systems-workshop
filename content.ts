// Public editorial content only. Keep private source documents outside this repository.
export const profile = {
  name: "Ahmed Ali", // Preferred display name supplied in brief; résumé uses Ahmed Ali Hassan.
  alias: "Cole", // Brief.
  description:
    "I build Python backends for document retrieval, background jobs, and adaptive learning.", // Résumé projects and corresponding repository READMEs.
  education: "BS Computer Science · FAST-NUCES, Peshawar · Expected 2028", // Résumé, Education.
  now: "Exploring how queued work recovers from failure and how retrieval quality changes the answers a model gives.", // Editorial synthesis of DistribuQueue and Study Coach experiments; brief supplies current interests.
  github: "https://github.com/ahmedforge", // Résumé and GitHub API.
};

export const links: Record<string, string> = {
  github: profile.github, // Résumé.
  email: "ahmedali.xhassan@gmail.com", // Confirmed by owner; punctuation matches the GitHub profile.
  linkedin: "https://www.linkedin.com/in/ahmed-ali-hassan911/", // Public URL verified on the owner's signed-in LinkedIn profile.
  resume: "", // TODO: public, redacted résumé URL.
  substack: "", // TODO: supply publication URL (platform supplied in brief).
  hashnode: "https://ahmed90.hashnode.dev/", // Public blog listed under Your publications in Ahmed's Hashnode dashboard.
};

export type Project = {
  name: string;
  summary: string;
  detail: string;
  stack: string[];
  repo: string;
  demo: string;
};
export const projects: Project[] = [
  {
    // Résumé and ahmedforge/pdf-backend README.
    name: "PDF RAG Workspace", // Résumé project title.
    summary:
      "Ask a question across an uploaded PDF and trace the answer back to the page.", // README.
    detail:
      "The React workspace streams answers from FastAPI. MiniLM embeds the query, pgvector finds passages within the document, and Groq generates an answer with page citations.", // README.
    stack: ["FastAPI", "pgvector", "Groq", "Azure", "React"], // README.
    repo: "https://github.com/ahmedforge/pdf-backend", // GitHub API.
    demo: "https://white-grass-09deb0b00.1.azurestaticapps.net/", // Résumé and README.
  },
  {
    // Résumé and ahmedforge/distributed-task-queue README.
    name: "DistribuQueue", // Résumé.
    summary:
      "Keep PDF rendering jobs recoverable when a worker stops mid-document.", // Résumé and README.
    detail:
      "In progress. Redis-backed workers render PDF pages while PostgreSQL keeps job state. The dashboard streams progress and supports retries. A local Kubernetes setup uses KEDA to scale workers with the queue.", // README.
    stack: ["Redis/SAQ", "PostgreSQL", "Kubernetes", "Terraform"], // README.
    repo: "https://github.com/ahmedforge/distributed-task-queue", // GitHub API.
    demo: "", // TODO: hosted demo URL; README currently offers a recorded walkthrough.
  },
  {
    // Résumé and ahmedforge/adaptive-study-coach README.
    name: "Adaptive AI Study Coach", // README.
    summary:
      "Turn a math diagnostic into practice questions that target a student's weak topics.", // Résumé.
    detail:
      "FAISS retrieves seed questions, Gemini generates variants, and deterministic grading guides progression. MLflow tracks retrieval experiments for this GIKI-SkyLabs bootcamp capstone.", // Résumé and README.
    stack: ["FastAPI", "FAISS", "SentenceTransformers", "Gemini", "MLflow"], // README.
    repo: "https://github.com/ahmedforge/adaptive-study-coach", // GitHub API.
    demo: "", // TODO: confirmed hosted demo URL.
  },
  {
    // ahmedforge/rate-limiter-visualizer README.
    name: "Rate Limiter Visualizer", // README.
    summary:
      "Watch three rate limiters handle the same burst of traffic in a terminal.", // README.
    detail:
      "Token Bucket spends accumulated capacity, Sliding Window Log counts recent arrivals, and Leaky Bucket queues work for evenly spaced departures.", // README.
    stack: ["Python", "Token Bucket", "Sliding Window Log", "Leaky Bucket"], // README.
    repo: "https://github.com/ahmedforge/rate-limiter-visualizer", // GitHub API.
    demo: "", // TODO: confirmed hosted demo URL.
  },
  {
    // GitHub upstream PR #925, open when checked.
    name: "Zulip botserver docs", // Upstream PR.
    summary: "Show bot authors how to load custom bots from Python files.", // PR title.
    detail:
      "Proposed a documentation change to Zulip's Python API project. The upstream pull request records the review and latest status.", // Upstream PR.
    stack: ["Python", "Documentation", "Open source"], // Upstream PR.
    repo: "https://github.com/zulip/python-zulip-api/pull/925", // GitHub upstream PR.
    demo: "", // TODO: no live demo applies to this documentation change.
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "C++"], // Résumé, Languages.
  Backend: [
    "FastAPI",
    "REST APIs",
    "JWT authentication",
    "WebSockets",
    "SQLAlchemy",
    "Alembic",
  ], // Résumé, Backend.
  "Infra / DevOps": [
    "Azure",
    "Docker Compose",
    "GitHub Actions",
    "Kubernetes",
    "KEDA",
    "Prometheus",
    "Grafana",
    "Linux",
    "Git",
  ], // Résumé, Cloud & Tools; Kubernetes experience is local.
  "ML / Data": [
    "PostgreSQL",
    "Redis",
    "pgvector",
    "FAISS",
    "RAG",
    "embeddings",
    "MLflow",
    "scikit-learn",
    "Pandas",
  ], // Résumé, Data & AI.
  Frontend: ["React"], // Résumé, Frontend.
};

export const timeline = [
  {
    date: "Present", // User confirmed this is their current internship.
    title: "Software Engineer Intern", // Title in the supplied offer.
    detail: "Glexno", // Employer in the supplied offer.
  },
  {
    date: "Jun – Aug 2026",
    title: "AI Bootcamp Participant",
    detail:
      "GIKI-SkyLabs · Presented Adaptive AI Study Coach as a capstone after studying ML, NLP, RAG, and MLOps.",
  }, // Résumé, Training & Experience.
  {
    date: "2026",
    title: "AWS Cloud Practitioner Essentials",
    detail: "Coursera coursework in cloud fundamentals.",
  }, // Résumé, Courses & Activities; course rather than professional certification.
  {
    date: "Sep – Dec 2025",
    title: "Volunteer Computer Skills Instructor",
    detail:
      "Adapted computer lessons to individual learning needs at Special Education Complex, Peshawar.",
  }, // Résumé, Training & Experience.
  {
    date: "2024 – 2028 (expected)",
    title: "BS Computer Science",
    detail:
      "FAST-NUCES, Peshawar · Data structures, database systems, computer networks, and computer architecture. IEEE student member.",
  }, // Résumé, Education and Activities.
];

// Public GitHub REST /users/ahmedforge/repos snapshot. All four had zero stars
// and empty topic arrays when checked. Name, language, timestamps and links are API fields.
export const recentRepos = [
  {
    name: "distributed-task-queue",
    language: "Python",
    topics: [],
    updated_at: "2026-11-02T21:21:58Z",
    html_url: projects[1].repo,
  },
  {
    name: "adaptive-study-coach",
    language: "Python",
    topics: [],
    updated_at: "2026-10-30T23:03:17Z",
    html_url: projects[2].repo,
  },
  {
    name: "pdf-backend",
    language: "Python",
    topics: [],
    updated_at: "2026-10-29T19:10:06Z",
    html_url: projects[0].repo,
  },
  {
    name: "rate-limiter-visualizer",
    language: "Python",
    topics: [],
    updated_at: "2026-09-06T16:40:59Z",
    html_url: projects[3].repo,
  },
];
