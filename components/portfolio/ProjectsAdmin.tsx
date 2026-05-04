"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  Github,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/lib/projects";
import { projectTypes } from "@/lib/projects";

type GithubSettings = {
  owner: string;
  repo: string;
  token: string;
  prodBranch: string;
  sourceBranch: string;
};

type GithubContent = {
  content: string;
  sha: string;
};

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const settingsKey = "portfolio-projects-github-settings";
const emptyProject: Project = {
  id: "",
  title: "",
  description: "",
  tech: [],
  image: "",
  link: "",
  type: "Web",
};

const defaultSettings: GithubSettings = {
  owner: "heros20",
  repo: "Portfolio-2.0",
  token: "",
  prodBranch: "gh-pages",
  sourceBranch: "main",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function toBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fromBase64(value: string) {
  const binary = atob(value.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function isGithub404(error: unknown) {
  return error instanceof Error && error.message.includes("GitHub 404");
}

async function githubRequest<T>(
  path: string,
  settings: GithubSettings,
  init?: RequestInit
) {
  const response = await fetch(
    `https://api.github.com/repos/${settings.owner}/${settings.repo}/contents/${path}`,
    {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${settings.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init?.headers ?? {}),
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}

async function getGithubFile(
  path: string,
  branch: string,
  settings: GithubSettings
) {
  return githubRequest<GithubContent>(
    `${path}?ref=${encodeURIComponent(branch)}`,
    settings
  );
}

async function putGithubFile(params: {
  path: string;
  branch: string;
  message: string;
  content: string;
  settings: GithubSettings;
}) {
  let sha: string | undefined;

  try {
    const current = await getGithubFile(
      params.path,
      params.branch,
      params.settings
    );
    sha = current.sha;
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes("GitHub 404")) {
      throw error;
    }
  }

  return githubRequest(params.path, params.settings, {
    method: "PUT",
    body: JSON.stringify({
      branch: params.branch,
      message: params.message,
      content: params.content,
      sha,
    }),
  });
}

export default function ProjectsAdmin() {
  const [settings, setSettings] = useState<GithubSettings>(defaultSettings);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Project>(emptyProject);
  const [techText, setTechText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingUploads, setPendingUploads] = useState<Record<string, string>>(
    {}
  );
  const [pendingPreviews, setPendingPreviews] = useState<
    Record<string, string>
  >({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const canPublish = useMemo(
    () =>
      Boolean(
        settings.owner &&
          settings.repo &&
          settings.token &&
          settings.prodBranch &&
          settings.sourceBranch
      ),
    [settings]
  );

  useEffect(() => {
    const stored = localStorage.getItem(settingsKey);
    if (stored) {
      setSettings({ ...defaultSettings, ...JSON.parse(stored) });
    }

    fetch(`${prefix}/projects.json?t=${Date.now()}`, { cache: "no-store" })
      .then((response) => response.json() as Promise<Project[]>)
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch(() => {
        setError("Impossible de charger projects.json depuis la prod.");
      });
  }, []);

  function persistSettings(nextSettings: GithubSettings) {
    setSettings(nextSettings);
    localStorage.setItem(settingsKey, JSON.stringify(nextSettings));
  }

  function updateForm(field: keyof Project, value: string | string[]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function getImageSrc(image: string) {
    if (!image) {
      return "";
    }
    if (pendingPreviews[image]) {
      return pendingPreviews[image];
    }
    if (/^https?:\/\//.test(image) || image.startsWith("data:")) {
      return image;
    }
    return `${prefix}${image}`;
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "png";
    const baseName = slugify(form.title || file.name.replace(/\.[^.]+$/, ""));
    const fileName = `${baseName || "projet"}-${Date.now()}.${extension}`;
    const imagePath = `/images/${fileName}`;
    const content = await fileToBase64(file);

    setPendingUploads((current) => ({ ...current, [imagePath]: content }));
    setPendingPreviews((current) => ({
      ...current,
      [imagePath]: `data:${file.type};base64,${content}`,
    }));
    setForm((current) => ({ ...current, image: imagePath }));
  }

  function resetForm() {
    setForm(emptyProject);
    setTechText("");
    setEditingId(null);
  }

  function saveLocalProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const id = editingId || slugify(form.title);
    if (!id || !form.title || !form.link || !form.description) {
      setError("Titre, lien et description sont obligatoires.");
      return;
    }

    const nextProject: Project = {
      ...form,
      id,
      image: form.image || "/images/screenshot-comets.png",
      tech: techText
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    setProjects((current) => {
      const exists = current.some((project) => project.id === id);
      if (exists) {
        return current.map((project) =>
          project.id === id ? nextProject : project
        );
      }
      return [nextProject, ...current];
    });
    setStatus(
      "Projet ajoute a la liste. Clique sur Publier pour l'envoyer sur le site."
    );
    resetForm();
  }

  function editProject(project: Project) {
    setForm(project);
    setTechText(project.tech.join(", "));
    setEditingId(project.id);
    setStatus("");
    setError("");
  }

  function deleteProject(id: string) {
    setProjects((current) => current.filter((project) => project.id !== id));
    if (editingId === id) {
      resetForm();
    }
  }

  function moveProject(id: string, direction: -1 | 1) {
    setProjects((current) => {
      const index = current.findIndex((project) => project.id === id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }
      const next = [...current];
      const [project] = next.splice(index, 1);
      next.splice(nextIndex, 0, project);
      return next;
    });
  }

  async function loadFromGithub() {
    setError("");
    setStatus("Chargement depuis GitHub...");

    try {
      const file = await getGithubFile(
        "projects.json",
        settings.prodBranch,
        settings
      );
      setProjects(JSON.parse(fromBase64(file.content)) as Project[]);
      setStatus("Liste rechargee depuis la branche de prod.");
    } catch (loadError) {
      if (!isGithub404(loadError)) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Impossible de charger depuis GitHub."
        );
        setStatus("");
        return;
      }

      try {
        const file = await getGithubFile(
          "public/projects.json",
          settings.sourceBranch,
          settings
        );
        setProjects(JSON.parse(fromBase64(file.content)) as Project[]);
        setStatus(
          "projects.json n'existe pas encore sur la branche prod. Liste rechargee depuis la branche source."
        );
      } catch (sourceLoadError) {
        if (isGithub404(sourceLoadError)) {
          setStatus(
            "projects.json n'existe pas encore sur GitHub. Ajoute tes projets puis clique sur Publier une premiere fois."
          );
          setError("");
          return;
        }

        setError(
          sourceLoadError instanceof Error
            ? sourceLoadError.message
            : "Impossible de charger depuis GitHub."
        );
        setStatus("");
      }
    }
  }

  async function publishProjects() {
    if (!canPublish) {
      setError("Renseigne le token et les infos GitHub avant publication.");
      return;
    }

    setIsPublishing(true);
    setError("");
    setStatus("Publication en cours...");

    try {
      const json = `${JSON.stringify(projects, null, 2)}\n`;
      const message = `Update portfolio projects (${new Date().toISOString()})`;

      for (const [imagePath, content] of Object.entries(pendingUploads)) {
        const prodImagePath = imagePath.replace(/^\//, "");
        const sourceImagePath = `public/${prodImagePath}`;

        await putGithubFile({
          path: prodImagePath,
          branch: settings.prodBranch,
          message,
          content,
          settings,
        });
        await putGithubFile({
          path: sourceImagePath,
          branch: settings.sourceBranch,
          message,
          content,
          settings,
        });
      }

      await putGithubFile({
        path: "projects.json",
        branch: settings.prodBranch,
        message,
        content: toBase64(json),
        settings,
      });

      await putGithubFile({
        path: "public/projects.json",
        branch: settings.sourceBranch,
        message,
        content: toBase64(json),
        settings,
      });

      setPendingUploads({});
      setPendingPreviews({});
      setStatus(
        "Publie sur GitHub. GitHub Pages peut prendre quelques instants, puis ouvre /projets en hard refresh."
      );
    } catch (publishError) {
      setError(
        publishError instanceof Error
          ? publishError.message
          : "Publication impossible."
      );
      setStatus("");
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-4 py-12 text-white">
      <div className="mx-auto grid w-[min(1180px,100%)] gap-6 lg:grid-cols-[390px_1fr]">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B4F116]">
                Admin
              </p>
              <h1 className="mt-1 text-2xl font-bold">Projets</h1>
            </div>
            <Button
              type="button"
              size="sm"
              className="bg-[#B4F116] text-black hover:bg-[#D9FF6E]"
              onClick={publishProjects}
              disabled={isPublishing}
            >
              {isPublishing ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Save />
              )}
              Publier
            </Button>
          </div>

          <div className="mb-5 grid gap-3 rounded-lg border border-white/10 bg-black/30 p-3">
            <label className="grid gap-1 text-xs text-neutral-300">
              Token GitHub
              <Input
                type="password"
                value={settings.token}
                onChange={(event) =>
                  persistSettings({ ...settings, token: event.target.value })
                }
                placeholder="github_pat_..."
                className="border-white/10 bg-black/40 text-white"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 text-xs text-neutral-300">
                Owner
                <Input
                  value={settings.owner}
                  onChange={(event) =>
                    persistSettings({ ...settings, owner: event.target.value })
                  }
                  className="border-white/10 bg-black/40 text-white"
                />
              </label>
              <label className="grid gap-1 text-xs text-neutral-300">
                Repo
                <Input
                  value={settings.repo}
                  onChange={(event) =>
                    persistSettings({ ...settings, repo: event.target.value })
                  }
                  className="border-white/10 bg-black/40 text-white"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 text-xs text-neutral-300">
                Branche prod
                <Input
                  value={settings.prodBranch}
                  onChange={(event) =>
                    persistSettings({
                      ...settings,
                      prodBranch: event.target.value,
                    })
                  }
                  className="border-white/10 bg-black/40 text-white"
                />
              </label>
              <label className="grid gap-1 text-xs text-neutral-300">
                Branche source
                <Input
                  value={settings.sourceBranch}
                  onChange={(event) =>
                    persistSettings({
                      ...settings,
                      sourceBranch: event.target.value,
                    })
                  }
                  className="border-white/10 bg-black/40 text-white"
                />
              </label>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={loadFromGithub}
              disabled={!settings.token}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <Github />
              Recharger GitHub
            </Button>
          </div>

          <form onSubmit={saveLocalProject} className="grid gap-3">
            <label className="grid gap-1 text-xs text-neutral-300">
              Titre
              <Input
                value={form.title}
                onChange={(event) => updateForm("title", event.target.value)}
                className="border-white/10 bg-black/40 text-white"
              />
            </label>
            <label className="grid gap-1 text-xs text-neutral-300">
              Description
              <Textarea
                value={form.description}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                className="min-h-28 border-white/10 bg-black/40 text-white"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1 text-xs text-neutral-300">
                Type
                <select
                  value={form.type}
                  onChange={(event) => updateForm("type", event.target.value)}
                  className="h-10 rounded-md border border-white/10 bg-black/40 px-3 text-sm text-white"
                >
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1 text-xs text-neutral-300">
                Image
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-white/10 bg-black/40 text-white"
                />
              </label>
            </div>
            <label className="grid gap-1 text-xs text-neutral-300">
              Lien
              <Input
                value={form.link}
                onChange={(event) => updateForm("link", event.target.value)}
                placeholder="https://..."
                className="border-white/10 bg-black/40 text-white"
              />
            </label>
            <label className="grid gap-1 text-xs text-neutral-300">
              Image actuelle
              <Input
                value={form.image}
                onChange={(event) => updateForm("image", event.target.value)}
                placeholder="/images/projet.png"
                className="border-white/10 bg-black/40 text-white"
              />
            </label>
            {form.image ? (
              <img
                src={getImageSrc(form.image)}
                alt=""
                className="h-32 w-full rounded-md border border-white/10 bg-black object-contain"
              />
            ) : null}
            <label className="grid gap-1 text-xs text-neutral-300">
              Technos
              <Input
                value={techText}
                onChange={(event) => setTechText(event.target.value)}
                placeholder="Next.js, Tailwind, Supabase"
                className="border-white/10 bg-black/40 text-white"
              />
            </label>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-[#B4F116] text-black hover:bg-[#D9FF6E]"
              >
                <Plus />
                {editingId ? "Mettre a jour la liste" : "Ajouter a la liste"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Vider
              </Button>
            </div>
          </form>

          {status ? <p className="mt-4 text-sm text-[#B4F116]">{status}</p> : null}
          {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Liste publiee</h2>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href={`${prefix}/projets/`} target="_blank" rel="noreferrer">
                <Eye />
                Voir
              </a>
            </Button>
          </div>

          <div className="grid gap-3">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="grid gap-4 rounded-lg border border-white/10 bg-black/30 p-3 md:grid-cols-[140px_1fr_auto]"
              >
                <img
                  src={getImageSrc(project.image)}
                  alt=""
                  className="h-24 w-full rounded-md bg-black object-contain md:w-36"
                />
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">
                      {project.title}
                    </h3>
                    <span className="rounded bg-[#B4F116]/15 px-2 py-0.5 text-xs text-[#B4F116]">
                      {project.type}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-neutral-400">
                    {project.description}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                    {project.tech.join(" / ")}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:flex-col">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => moveProject(project.id, -1)}
                    disabled={index === 0}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Monter"
                  >
                    <ArrowUp />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => moveProject(project.id, 1)}
                    disabled={index === projects.length - 1}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                    aria-label="Descendre"
                  >
                    <ArrowDown />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editProject(project)}
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Editer
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteProject(project.id)}
                    aria-label="Supprimer"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
