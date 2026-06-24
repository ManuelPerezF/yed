import { getStackBadgeLabel, getStackIconUrl } from "@/lib/stack-icons";

type ProjectCardStackProps = {
  stackBadges: string[];
};

export function ProjectCardStack({ stackBadges }: ProjectCardStackProps) {
  const badges = stackBadges;

  return (
    <div className="project-card-stack" aria-hidden>
      <ul className="project-card-stack-list">
        {badges.map((tech) => {
          const iconUrl = getStackIconUrl(tech);

          return (
            <li key={tech} className="project-card-stack-badge">
              {iconUrl ? (
                <img src={iconUrl} alt="" width={24} height={24} loading="lazy" />
              ) : (
                <span className="project-card-stack-initials">
                  {getStackBadgeLabel(tech)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
