import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import studioNoirPreview640 from "../assets/StudioNoir-640.png";
import studioNoirPreview1280 from "../assets/StudioNoir-1280.png";
import prosekatorPreview640 from "../assets/Prosekator-640.png";
import prosekatorPreview1280 from "../assets/Prosekator-1280.png";
import synclyPreview640 from "../assets/Syncly-640.png";
import synclyPreview1280 from "../assets/Syncly-1280.png";
import metalShopPreview640 from "../assets/MetalShop-640.png";
import metalShopPreview1280 from "../assets/MetalShop-1280.png";
import lenaMarkovicPreview640 from "../assets/LenaMarkovicPortfolio-640.png";
import lenaMarkovicPreview1280 from "../assets/LenaMarkovicPortfolio-1280.png";
import sharkOriginsPreview640 from "../assets/SharkOrigins-640.png";
import sharkOriginsPreview1280 from "../assets/SharkOrigins-1280.png";
import "./Projects.css";

interface ProjectThumbnail {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
  thumbnail?: ProjectThumbnail;
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

const projectImageSizes =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

const createThumbnail = (
  src640: string,
  src1280: string,
  width: number,
  height: number,
): ProjectThumbnail => ({
  src: src640,
  srcSet: `${src640} 640w, ${src1280} 1280w`,
  width,
  height,
});

const projects: Project[] = [
  {
    title: "Studio Noir",
    category: "Višestranični Website",
    tags: ["React", "TypeScript", "CSS", "Framer Motion"],
    description: "Live preview projekta Studio Noir.",
    thumbnail: createThumbnail(
      studioNoirPreview640,
      studioNoirPreview1280,
      1280,
      636,
    ),
    projectUrl: "https://studio-noir-inky.vercel.app/",
  },
  {
    title: "Prosekator",
    category: "Web Application",
    tags: ["HTML", "CSS", "Bootstrap", "JavaScript", "MongoDB"],
    description: "Live preview projekta Prosekator.",
    thumbnail: createThumbnail(
      prosekatorPreview640,
      prosekatorPreview1280,
      1280,
      618,
    ),
    projectUrl: "https://prosekator.vercel.app/",
  },
  {
    title: "Syncly",
    category: "Landing Page",
    tags: ["Next.js", "CSS", "Framer Motion"],
    description: "Live preview projekta Syncly.",
    thumbnail: createThumbnail(synclyPreview640, synclyPreview1280, 1280, 622),
    projectUrl: "https://syncly-phi.vercel.app/",
  },
  {
    title: "Metal Shop",
    category: "Višestranični Website",
    tags: ["TypeScript", "React", "CSS", "Framer Motion"],
    description: "Live preview projekta Metal Shop",
    thumbnail: createThumbnail(
      metalShopPreview640,
      metalShopPreview1280,
      1280,
      634,
    ),
    projectUrl: "https://metal-shop-su.vercel.app/",
  },
  {
    title: "Portfolio - Lena Marković",
    category: "Višestranični Website",
    tags: ["TypeScript", "CSS", "React"],
    description: "Live preview projekta Portfolio - Lena Marković.",
    thumbnail: createThumbnail(
      lenaMarkovicPreview640,
      lenaMarkovicPreview1280,
      1280,
      647,
    ),
    projectUrl: "https://lena-markovic.vercel.app/",
  },
  {
    title: "Shark Origins",
    category: "Educational Web Game",
    tags: ["TypeScript", "React"],
    description: "Live preview projekta Shark Origins.",
    thumbnail: createThumbnail(
      sharkOriginsPreview640,
      sharkOriginsPreview1280,
      1280,
      646,
    ),
    projectUrl: "https://evolucija-ajkule.vercel.app/",
  },
];

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  cardVariants,
  shouldReduceMotion,
  onOpenProject,
}) => {
  return (
    <m.div
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
      <div className="project-thumbnail">
        {project.thumbnail ? (
          <img
            src={project.thumbnail.src}
            srcSet={project.thumbnail.srcSet}
            sizes={projectImageSizes}
            width={project.thumbnail.width}
            height={project.thumbnail.height}
            alt={`${project.title} preview`}
            className="project-thumbnail-image"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
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
    </m.div>
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
        <m.div
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
        </m.div>

        <m.div
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
        </m.div>
      </div>
    </section>
  );
};

export default Projects;
