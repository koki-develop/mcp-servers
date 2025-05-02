import { z } from "zod";

export const postGroupSchema = z.enum([
  // Development
  "Bitbucket",
  "CircleCI",
  "GitHub",
  "GitLab",
  // Cloud/Infrastucture
  "AWS",
  "Azure",
  "Firebase",
  "Google Cloud",
  "Kubernetes",
  "Terraform",
  // Libraries/Frameworks
  "Angular",
  "Django",
  "Next.js",
  "Nuxt",
  "Rails",
  "React",
  "Vue.js",
  // Programming
  "Go",
  "Kotlin",
  "Node.js",
  "Python",
  "Ruby",
  "Rust",
  "Swift",
  "TypeScript",
]);
