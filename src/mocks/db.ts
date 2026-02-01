import { Collection } from "@msw/data";
import z from "zod";
import generateJob from "./generate-job";

const JobSchema = z.object({
  id: z.string(),
  company: z.string(),
  logo: z.string(),
  new: z.boolean(),
  featured: z.boolean(),
  position: z.string(),
  role: z.string(),
  level: z.string(),
  postedAt: z.string(),
  postedDate: z.string(),
  contract: z.string(),
  location: z.string(),
  languages: z.array(z.string()),
  tools: z.array(z.string()),
});

const PaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const JobsResponseSchema = z.object({
  jobs: z.array(JobSchema),
  pagination: PaginationSchema,
});

export type Job = z.infer<typeof JobSchema>;

export type JobsResponse = z.infer<typeof JobsResponseSchema>;

const jobs = new Collection({
  schema: JobSchema,
});

jobs.createMany(250, generateJob);

export default { jobs };
