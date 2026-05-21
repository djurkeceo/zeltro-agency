import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import "./Projects.css";

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
  thumbnail?: string;
  livePreviewUrl?: string;
  projectUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  cardVariants: {
    hidden: { opacity: number; scale: number };
    visible: {
      opacity: number;
      scale: number;
      transition: { duration: number };
    };
  };
  shouldReduceMotion: boolean;
  onOpenProject: (projectUrl?: string) => void;
}

const projects: Project[] = [
  {
    title: "Studio Noir",
    category: "Višestranični Website",
    tags: ["React", "TypeScript", "CSS", "Framer Motion"],
    description: "Live preview projekta Studio Noir.",
    livePreviewUrl: "https://studio-noir-inky.vercel.app/",
    projectUrl: "https://studio-noir-inky.vercel.app/",
  },
  {
    title: "Prosekator",
    category: "Web Application",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "MongoDB"],
    description: "Live preview projekta Prosekator.",
    livePreviewUrl: "https://prosekator.vercel.app/",
    projectUrl: "https://prosekator.vercel.app/",
  },
  {
    title: "Syncly",
    category: "Landing Page",
    tags: ["Next.js", "CSS", "Framer Motion"],
    description: "Live preview projekta Syncly.",
    livePreviewUrl: "https://syncly-phi.vercel.app/",
    projectUrl: "https://syncly-phi.vercel.app/",
  },
  {
    title: "Metal Shop",
    category: "Višestranični Website",
    tags: ["TypeScript", "React", "CSS", "Framer Motion"],
    description: "Website preview projekta Metal Shop",
    livePreviewUrl: "https://metal-shop-su.vercel.app/",
    projectUrl: "https://metal-shop-su.vercel.app/",
  },
  {
    title: "Portfolio - Lena Marković",
    category: "Višestranični Website",
    tags: ["TypeScript", "CSS", "React"],
    description: "Live preview portfolio projekta.",
    livePreviewUrl: "https://lena-markovic.vercel.app/",
    projectUrl: "https://lena-markovic.vercel.app/",
  },
  {
    title: "Iron Lab",
    category: "Landing Page sa Galerijom",
    tags: ["TypeScript", "CSS", "React"],
    description: "Live preview projekta Iron Lab.",
    livePreviewUrl: "https://iron-lab.vercel.app/",
    projectUrl: "https://iron-lab.vercel.app/",
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  cardVariants,
  shouldReduceMotion,
  onOpenProject,
}) => {
  const thumbnailRef = useRef<HTMLDivElement | null>(null);
  const isThumbnailNearViewport = useInView(thumbnailRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px 220px 0px",
  });
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  const canShowLivePreview =
    Boolean(project.livePreviewUrl) &&
    isThumbnailNearViewport &&
    !previewFailed;

  return (
    <motion.div
      className={`project-card glass ${project.projectUrl ? "project-card-clickable" : ""}`}
      variants={cardVariants}
      whileHover={
        project.projectUrl && !shouldReduceMotion ? { y: -8 } : undefined
      }
      whileTap={project.projectUrl ? { scale: 0.99 } : undefined}
      onClick={() => onOpenProject(project.projectUrl)}
      onKeyDown={(event) => {
        if (!project.projectUrl) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenProject(project.projectUrl);
        }
      }}
      role={project.projectUrl ? "link" : undefined}
      tabIndex={project.projectUrl ? 0 : undefined}
    >
      <div className="project-thumbnail" ref={thumbnailRef}>
        {canShowLivePreview ? (
          <>
            <iframe
              src={project.livePreviewUrl}
              title={`${project.title} live preview`}
              className="project-thumbnail-iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              scrolling="no"
              onLoad={() => setIsPreviewLoaded(true)}
              onError={() => setPreviewFailed(true)}
            />
            {!isPreviewLoaded && (
              <div className="thumbnail-loading" aria-hidden="true">
                <span>Učitavanje preview-a...</span>
              </div>
            )}
          </>
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} preview`}
            className="project-thumbnail-image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="thumbnail-placeholder">
            <span className="project-number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div
          className="project-overlay"
          style={{ transitionDuration: shouldReduceMotion ? "0s" : "0.25s" }}
        >
          <span className="view-project">View Project →</span>
        </div>
      </div>
      <div className="project-content">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={`${project.title}-${tag}`} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.45 },
    },
  };

  const openProject = (projectUrl?: string) => {
    if (!projectUrl) return;
    window.open(projectUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
        >
          <h2 className="section-title">
            Naši <span className="gradient-text">projekti</span>
          </h2>
          <p className="projects-subtitle">
            Portfolio naših radova je zapravo kolekcija uspešnih partnerstava
            koja su počela samo jednom idejom.
          </p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              cardVariants={cardVariants}
              shouldReduceMotion={shouldReduceMotion}
              onOpenProject={openProject}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
