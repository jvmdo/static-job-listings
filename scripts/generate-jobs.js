import fs from "fs";

import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

const ROLES = ["Frontend", "Backend", "Fullstack"];
const LEVELS = ["Junior", "Midweight", "Senior"];
const CONTRACTS = ["Full Time", "Part Time", "Contract"];
const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Ruby",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "HTML",
  "CSS",
];
const TOOLS = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Spring",
  "Laravel",
  "Sass",
  "Tailwind",
  "Bootstrap",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Git",
  "Jest",
  "Cypress",
];
const LOCATIONS = [
  "USA Only",
  "Remote",
  "Worldwide",
  "UK Only",
  "EU Only",
  "Canada Only",
  "Australia Only",
  "Asia Only",
];
const COMPANIES = [
  {
    name: "Photosnap",
    logo: "photosnap.svg",
  },
  {
    name: "Manage",
    logo: "manage.svg",
  },
  {
    name: "Account",
    logo: "account.svg",
  },
  {
    name: "MyHome",
    logo: "myhome.svg",
  },
  {
    name: "Loop Studios",
    logo: "loop-studios.svg",
  },
  {
    name: "FaceIt",
    logo: "faceit.svg",
  },
  {
    name: "Shortly",
    logo: "shortly.svg",
  },
  {
    name: "Insure",
    logo: "insure.svg",
  },
  {
    name: "Eyecam Co.",
    logo: "eyecam-co.svg",
  },
  {
    name: "The Air Filter Company",
    logo: "the-air-filter-company.svg",
  },
];

function generateJob() {
  const postedDate = faker.date.recent({ days: 30 });
  const hoursAgo = Math.floor(
    (Date.now() - postedDate.getTime()) / (1000 * 60 * 60),
  );
  const daysAgo = Math.floor(hoursAgo / 24);

  const postedAt =
    hoursAgo < 1
      ? "Just now"
      : hoursAgo < 24
        ? `${hoursAgo}h ago`
        : daysAgo < 7
          ? `${daysAgo}d ago`
          : `${Math.floor(daysAgo / 7)}w ago`;

  const role = faker.helpers.arrayElement(ROLES);
  const level = faker.helpers.arrayElement(LEVELS);
  const contract = faker.helpers.arrayElement(CONTRACTS);
  const position = `${level} ${role} Developer`;
  const languages = faker.helpers.arrayElements(
    LANGUAGES,
    faker.number.int({ min: 2, max: 5 }),
  );
  const tools = faker.helpers.arrayElements(
    TOOLS,
    faker.number.int({ min: 2, max: 5 }),
  );
  const { name, logo } = faker.helpers.arrayElement(COMPANIES);

  return {
    id: nanoid(10),
    company: name,
    logo,
    new: hoursAgo < 24,
    featured: faker.datatype.boolean({ probability: 0.2 }), // 20% chance
    position,
    role,
    level,
    postedAt,
    postedDate: postedDate.toISOString(), // For sorting
    contract,
    location: faker.helpers.arrayElement(LOCATIONS),
    languages,
    tools,
  };
}

const jobs = Array.from({ length: 215 }, () => generateJob());

jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

fs.writeFileSync("./src/mocks/data.json", JSON.stringify(jobs, null, 2));

console.log(`✅ Generated ${jobs.length} jobs`);
