import {
  getStackBadgeLabel,
  getStackDisplayLabel,
  getStackIconUrl,
} from "@/lib/stack-icons";

type ProjectCardStackProps = {
  stackBadges: string[];
};

export function ProjectCardStack({ stackBadges }: ProjectCardStackProps) {
  return (
    <div className="project-card-stack">
      <ul className="project-card-stack-list" aria-label="Stack tecnológico">
        {stackBadges.map((tech) => {
          const iconUrl = getStackIconUrl(tech);
          const label = getStackDisplayLabel(tech);

          return (
            <li key={tech} className="project-card-stack-badge">
              {iconUrl ? (
                <img
                  className="project-card-stack-icon"
                  src={iconUrl}
                  alt=""
                  width={16}
                  height={16}
                  loading="lazy"
                />
              ) : (
                <span className="project-card-stack-initials" aria-hidden>
                  {getStackBadgeLabel(tech)}
                </span>
              )}
              <span className="project-card-stack-label">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
