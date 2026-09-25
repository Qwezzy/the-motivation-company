import Image from "next/image";
import {
  defaultEventTikTok,
  upcomingEvents,
  type UpcomingEvent,
} from "@/lib/site";

function BrandBlock({ title }: { title: string }) {
  return (
    <div
      className="relative flex aspect-[4/5] w-full shrink-0 flex-col items-center justify-center gap-3 bg-navy px-6 text-center sm:aspect-auto sm:min-h-[14rem] sm:w-56 md:w-64"
      aria-hidden
    >
      <div className="h-1 w-12 rounded-full bg-gold" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
        The Motivation Company
      </p>
      <p className="text-sm font-semibold leading-snug text-white">{title}</p>
      <div className="h-1 w-12 rounded-full bg-gold" />
    </div>
  );
}

function EventCard({ event }: { event: UpcomingEvent }) {
  const href = event.url || defaultEventTikTok;
  const cta = event.ctaLabel || "Watch on TikTok";
  const dateDisplay = event.tbc ? "Date to be announced" : event.dateLabel;
  const timeDisplay = event.tbc ? "—" : event.time;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm sm:flex-row ${
        event.tbc
          ? "border-dashed border-navy/25 bg-slate-50/80"
          : "border-navy/10"
      }`}
    >
      {event.image ? (
        <div className="relative aspect-[4/5] w-full shrink-0 bg-navy/5 sm:aspect-auto sm:w-56 md:w-64">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, 256px"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <BrandBlock title={event.title} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {event.subtitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {event.subtitle}
            </p>
          )}
          {event.tbc && (
            <span className="rounded-full border border-navy/20 bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy/70">
              TBC
            </span>
          )}
        </div>
        <h3 className="mt-2 text-xl font-semibold text-navy">{event.title}</h3>
        {event.tagline && (
          <p className="mt-1 text-sm font-medium text-navy/60">{event.tagline}</p>
        )}
        <dl className="mt-4 grid gap-2 text-sm text-navy/80 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
              Date
            </dt>
            <dd className="mt-0.5 font-medium text-navy">{dateDisplay}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
              Time
            </dt>
            <dd className="mt-0.5 font-medium text-navy">{timeDisplay}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-navy/45">
              Platform
            </dt>
            <dd className="mt-0.5 font-medium text-navy">
              {event.platform}
              {!event.tbc && (
                <span className="ml-2 rounded-full bg-gold/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-navy">
                  Free
                </span>
              )}
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

/** Home strip — data-driven; lists all current items (sorted in site.ts). */
export default function UpcomingEvents() {
  if (upcomingEvents.length === 0) return null;

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
            sessions for educators, men, and learners.
          </p>
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
