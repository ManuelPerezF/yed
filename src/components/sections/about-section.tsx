import { person, skillContexts } from "@/data/portfolio";

const ALL_TOOLS = [...new Set(skillContexts.flatMap((ctx) => ctx.tools))];

export function AboutSection() {

  return (
    <section className="section-shell">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)] lg:items-start">
        <div>
          <h1 className="display-title max-w-2xl">{person.shortName}</h1>
          <p className="body-copy mt-6 max-w-md text-lg text-[var(--muted)]">
            {person.role}. {person.school}.
          </p>
          <p className="body-copy mt-8 max-w-md">{person.bio}</p>
          <dl className="mt-14 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-[var(--muted)]">Ubicación</dt>
              <dd className="mt-1 font-medium">{person.location}</dd>
            </div>
            <div>
              <dt className="text-sm text-[var(--muted)]">Contacto</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${person.email}`}
                  className="font-medium transition hover:text-[var(--accent)]"
                >
                  {person.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <aside
          className="about-identity flex min-h-[18rem] flex-col justify-between border border-[var(--border)] p-8 md:min-h-[22rem] md:p-10"
          aria-label="Identidad"
        >
          <p className="text-[clamp(3.5rem,10vw,6rem)] font-medium leading-none tracking-tight">
            MP
          </p>
          <div>
            <p className="text-sm text-[var(--muted)]">{person.school}</p>
            <p className="mt-2 font-medium">{person.location}</p>
          </div>
        </aside>
      </div>

      <div
        className="mt-20 overflow-hidden border-t border-[var(--border)] pt-10"
        aria-label="Herramientas"
      >
        <div className="group flex [--duration:38s] [--gap:0.75rem] [gap:var(--gap)] overflow-hidden">
          {[0, 1].map((rep) => (
            <div
              key={rep}
              aria-hidden={rep === 1}
              className="animate-marquee flex shrink-0 [gap:var(--gap)] group-hover:[animation-play-state:paused]"
            >
              {ALL_TOOLS.map((tool) => (
                <span
                  key={`${rep}-${tool}`}
                  className="shrink-0 whitespace-nowrap border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)]"
                >
                  {tool}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
