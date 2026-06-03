import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "restaurant-robot",
    title: "Restaurant Delivery Robot",
    description:
      "Autonomous delivery robot with sensor fusion, obstacle avoidance, and path planning.",
    longDescription:
      "Built an autonomous restaurant delivery robot using Arduino and C++. Integrated ultrasonic and IR sensors for obstacle avoidance, implemented path planning logic, and demoed the system at university.",
    tech: ["Arduino", "C++", "Sensors", "Path Planning"],
    image: "/images/projects/restaurant-robot.jpg",
    featured: true,
    github: "https://github.com/Siddhatho/restaurant-delivery-robot",
    demo: "https://github.com/Siddhatho/restaurant-delivery-robot#demo",
    category: "Robotics",
  },
  {
    slug: "ai-research-reviewer",
    title: "AI Research Reviewer",
    description:
      "LLM-powered paper analysis pipeline with structured prompt engineering workflows.",
    longDescription:
      "Developed a Python tool that ingests research papers and generates structured reviews using LLM APIs, custom prompts, and evaluation heuristics for literature review acceleration.",
    tech: ["Python", "LLM", "Prompt Eng."],
    image: "/images/projects/ai-research-reviewer.jpg",
    featured: false,
    github: "https://github.com/Siddhatho/ai-research-reviewer",
    demo: "https://github.com/Siddhatho/ai-research-reviewer#demo",
    category: "AI/ML",
  },
  {
    slug: "unity-football-game",
    title: "Unity Football Game",
    description:
      "Arcade-style football game with physics-based gameplay and polished UX.",
    longDescription:
      "Designed and built a Unity football game in C# with player controls, match logic, UI flows, and tuned game-feel for responsive arcade play.",
    tech: ["Unity", "C#", "Game Design"],
    image: "/images/projects/unity-football-game.jpg",
    featured: false,
    github: "https://github.com/Siddhatho/unity-football-game",
    demo: "https://github.com/Siddhatho/unity-football-game#demo",
    category: "Game Dev",
  },
  {
    slug: "django-blog-platform",
    title: "Django Blog Platform",
    description:
      "Full-stack blog platform with REST APIs, auth, and MySQL persistence.",
    longDescription:
      "Created a Django blog with user authentication, CRUD posts, REST endpoints, MySQL backend, and deployment-ready configuration for production hosting.",
    tech: ["Django", "Python", "MySQL", "REST"],
    image: "/images/projects/django-blog-platform.jpg",
    featured: false,
    github: "https://github.com/Siddhatho/django-blog-platform",
    demo: "https://github.com/Siddhatho/django-blog-platform#demo",
    category: "Full Stack",
  },
  {
    slug: "embedded-sensor-system",
    title: "Embedded Sensor System",
    description:
      "Multi-sensor data acquisition and monitoring firmware on Arduino.",
    longDescription:
      "Engineered an embedded sensor network with Arduino C++ firmware for real-time acquisition, filtering, and serial telemetry to a host dashboard.",
    tech: ["Arduino", "C++", "Sensors"],
    image: "/images/projects/embedded-sensor-system.jpg",
    featured: false,
    github: "https://github.com/Siddhatho/embedded-sensor-system",
    category: "Embedded",
  },
];
