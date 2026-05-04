export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  type: string;
};

export const projectTypes = ["Web", "Mobile", "Jeu", "Design", "Autre"] as const;
