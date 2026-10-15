import { cn } from "@/lib/utils";
import { TEAM } from "./content";
import { sora } from "./fonts";

/** Equipo docente del taller. */
export default function Team() {
  return (
    <section id="equipo" aria-labelledby="equipo-titulo" className="mx-auto mt-28 w-full max-w-[1300px] scroll-mt-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ECE6F6] bg-white px-3.5 py-1.5 text-[13px] font-medium text-[#1A1426]">
            <span aria-hidden="true" className="size-2 rounded-full bg-[var(--ia-accent-soft)]" />
            {TEAM.eyebrow}
          </span>
          <h2
            id="equipo-titulo"
            className={cn(
              sora.className,
              "mt-4 text-[length:clamp(28px,2.6vw,38px)] font-semibold leading-[1.3] tracking-[-0.02em] text-[#1A1426]",
            )}
          >
            {TEAM.title[0]}
            <br />
            {TEAM.title[1]}
          </h2>
        </div>
        <p className="max-w-[400px] text-[14.5px] leading-[1.6] text-[#59565F]">{TEAM.description}</p>
      </div>

      <ul className="mt-11 grid gap-[26px] md:grid-cols-2">
        {TEAM.members.map((member) => (
          <li key={member.name} className="flex flex-col gap-5 rounded-[22px] bg-white p-7 sm:flex-row sm:gap-6">
            {/* Iniciales hasta tener una foto real de cada docente. */}
            <span
              aria-hidden="true"
              className={cn(
                sora.className,
                "grid size-[72px] shrink-0 place-items-center rounded-[20px] bg-[linear-gradient(135deg,var(--ia-accent-soft),var(--ia-accent))] text-[24px] font-semibold text-white",
              )}
            >
              {member.initials}
            </span>
            <div>
              <h3 className={cn(sora.className, "text-[20px] font-semibold tracking-[-0.01em] text-[#1A1426]")}>
                {member.name}
              </h3>
              <p className="mt-1 text-[14px] font-medium text-[var(--ia-accent)]">{member.role}</p>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-[#59565F]">{member.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {member.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-[#ECE4F8] bg-[#F5F0FC] px-3 py-1.5 text-[13px] text-[#1A1426]"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
