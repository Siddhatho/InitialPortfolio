import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "restaurant-robot",
    title: "Restaurant Delivery Robot",
    description: "Placeholder short description for the restaurant delivery robot project.",
    longDescription:
      "Placeholder long description for the restaurant delivery robot project.",
    tech: ["Arduino", "C++", "Sensors", "Robotics"],
    image: "/images/projects/restaurant-robot.jpg",
    featured: true,
    github: "https://github.com/placeholder/restaurant-robot",
    demo: "https://demo.placeholder.com/restaurant-robot",
    category: "Embedded + Software",
  },
  {
    slug: "ai-research-reviewer",
    title: "AI Research Reviewer",
    description: "Placeholder short description for the AI research reviewer project.",
    longDescription:
      "Placeholder long description for the AI research reviewer project.",
    tech: ["Python", "LLM Workflows", "Prompt Engineering"],
    image: "/images/projects/ai-research-reviewer.jpg",
    featured: false,
    github: "https://github.com/placeholder/ai-research-reviewer",
    demo: "https://demo.placeholder.com/ai-research-reviewer",
    category: "AI/Research",
  },
  {
    slug: "unity-football-game",
    title: "Unity Football Game",
    description: "Placeholder short description for the Unity football game project.",
    longDescription:
      "Placeholder long description for the Unity football game project.",
    tech: ["Unity", "C#", "Game Design"],
    image: "/images/projects/unity-football-game.jpg",
    featured: false,
    github: "https://github.com/placeholder/unity-football-game",
    demo: "https://demo.placeholder.com/unity-football-game",
    category: "Game Dev",
  },
  {
    slug: "django-blog-platform",
    title: "Django Blog Platform",
    description: "Placeholder short description for the Django blog platform project.",
    longDescription:
      "Placeholder long description for the Django blog platform project.",
    tech: ["Django", "Python", "MySQL", "REST APIs"],
    image: "/images/projects/django-blog-platform.jpg",
    featured: false,
    github: "https://github.com/placeholder/django-blog-platform",
    demo: "https://demo.placeholder.com/django-blog-platform",
    category: "Full Stack",
  },
  {
    slug: "embedded-sensor-system",
    title: "Embedded Sensor System",
    description: "Placeholder short description for the embedded sensor system project.",
    longDescription:
      "Placeholder long description for the embedded sensor system project.",
    tech: ["Arduino", "Sensors", "C++", "Embedded Systems"],
    image: "/images/projects/embedded-sensor-system.jpg",
    featured: false,
    github: "https://github.com/placeholder/embedded-sensor-system",
    demo: "https://demo.placeholder.com/embedded-sensor-system",
    category: "Embedded",
  },
];
