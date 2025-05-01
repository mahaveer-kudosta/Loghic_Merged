export type TabType = "structure" | "dependencies" | "config" | "preview";

export interface Project {
  id: number;
  name: string;
  description: string;
  repoUrl: string;
  sourceType: "frontend" | "backend";
  path: string;
}

export interface MergeConfig {
  projectName: string;
  description: string;
  mainScript: string;
  nodeVersion: string;
  scripts: Record<string, string>;
  dependencies: Record<string, {
    frontend: string;
    backend: string;
    resolution: "newest" | "frontend" | "backend" | "both";
  }>;
  environmentVariables: Array<{
    name: string;
    value: string;
    source: "frontend" | "backend" | "both";
  }>;
  apiEndpoints: Array<{
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
  }>;
}
