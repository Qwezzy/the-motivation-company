import Image from "next/image";
import { upcomingEvents, type UpcomingEvent } from "@/lib/site";

const DEFAULT_TIKTOK = "https://www.tiktok.com/@HectorMotivator";

function EventCard({ event }: { event: UpcomingEvent }) {
  const href = event.url || DEFAULT_TIKTOK;
  const cta = event.ctaLabel || "Watch on TikTok";

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm sm:flex-row">
      <div className="relative aspect-[4/5] w-full shrink-0 bg-navy/5 sm:aspect-auto sm:w-56 md:w-64">
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, 256px"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {event.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
            {event.subtitle}
          </p>
        )}
        <h3 className="mt-2 text-xl font-semibold text-navy">{event.title}</h3>
        {event.tagline && (
          <p className="mt-1 text-sm font-medium text-navy/60">{event.tagline}</p>
        )}
        <dl className="mt-4 grid gap-2 text-sm text-navy/80 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
              Date
            </dt>
            <dd className="mt-0.5 font-medium text-navy">{event.dateLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
              Time
            </dt>
            <dd className="mt-0.5 font-medium text-navy">{event.time}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
              Platform
            </dt>
            <dd className="mt-0.5 font-medium text-navy">
              {event.platform}
              <span className="ml-2 rounded-full bg-gold/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy">
                Free
              </span>
            </dd>
          </div>
          {event.topic && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
                Topic
              </dt>
              <dd className="mt-0.5 font-medium text-navy">{event.topic}</dd>
            </div>
          )}
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-navy/70">{event.blurb}</p>
        {event.withHandle && (
          <p className="mt-2 text-sm text-navy/60">
            With{" "}
            <span className="font-semibold text-navy">{event.withHandle}</span>
          </p>
        )}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 inline-flex self-start !py-2 !text-xs"
        >
          {cta}
        </a>
      </div>
    </article>
  );
}

/** Home strip — data-driven; hide if no upcoming events. */
export default function UpcomingEvents() {
  if (upcomingEvents.length === 0) return null;

  const shown = upcomingEvents.slice(0, 3);

  return (
    <section className="bg-white">
      <div className="container-narrow section-pad !py-14">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/50">
            Upcoming Events
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-navy sm:text-3xl">
            Join us live
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-navy/65">
            Hub events that inspire, motivate, and empower — including free
            sessions for educators and communities.
          </p>
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {shown.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
