"use client";

import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Menu,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";

const image = {
  hero: "/images/hero.jpg",
  aircraft: "/images/aircraft-hero.jpg",
  cabin: "/images/cabin.jpg",
  wing: "/images/wing.jpg",
  coast: "/images/coast.jpg",
  privateAircraft: "/images/private-aircraft.jpg",
  dubai: "/images/dubai.jpg",
  seychelles: "/images/seychelles.jpg",
};

const fleet = [
  {
    number: "01",
    category: "Light aircraft",
    title: "Closer, sooner.",
    copy: "A considered choice for shorter journeys and smaller airfields.",
    src: image.privateAircraft,
    alt: "Private aircraft at a quiet regional airport",
    className: "fleet-card--light",
  },
  {
    number: "02",
    category: "Midsize aircraft",
    title: "Room to move.",
    copy: "A little more cabin, with the freedom to go further.",
    src: image.aircraft,
    alt: "Private aircraft waiting on an airport apron",
    className: "fleet-card--midsize",
  },
  {
    number: "03",
    category: "Heavy aircraft",
    title: "Space to settle.",
    copy: "For a longer day, a larger party or simply a different pace.",
    src: image.hero,
    alt: "Long range private jet in evening light",
    className: "fleet-card--heavy",
  },
  {
    number: "04",
    category: "Long range",
    title: "Further, more easily.",
    copy: "Intercontinental journeys shaped around your itinerary.",
    src: image.aircraft,
    alt: "Private jet seen on the runway at golden hour",
    className: "fleet-card--long",
  },
];

const destinations = [
  {
    name: "Zanzibar",
    region: "Indian Ocean",
    detail: "A slower arrival to the islands.",
    src: image.coast,
    alt: "Rocky tropical coastline meeting clear water",
  },
  {
    name: "Dubai",
    region: "United Arab Emirates",
    detail: "A direct line to the city and beyond.",
    src: image.dubai,
    alt: "Dubai skyline at dusk",
  },
  {
    name: "Seychelles",
    region: "Indian Ocean",
    detail: "A quieter way to reach the outer islands.",
    src: image.seychelles,
    alt: "Aerial view of a green island in the Seychelles",
  },
];

const experienceSlides = [
  {
    index: "01",
    eyebrow: "YOUR TIME, RETURNED",
    title: "A departure that starts with you.",
    copy: "Share the hour, the people and the place. We shape the flight around the day you need to have.",
    src: image.aircraft,
    alt: "Private aircraft prepared for departure",
    note: "A schedule built around your journey",
  },
  {
    index: "02",
    eyebrow: "ROOM TO RESET",
    title: "A cabin with space to think.",
    copy: "Quiet, privacy and room to settle in. The details of the cabin depend on the aircraft selected for your route.",
    src: image.cabin,
    alt: "Softly lit private aircraft cabin with cream leather seats",
    note: "Cabin details confirmed with your aircraft",
  },
  {
    index: "03",
    eyebrow: "A MORE PERSONAL PLAN",
    title: "The journey keeps its shape.",
    copy: "From a simple one-way flight to a multi-stop itinerary, every request begins with a conversation.",
    src: image.wing,
    alt: "Aircraft wing moving above a blanket of clouds",
    note: "One point of contact from inquiry onward",
  },
];

const navItems = [
  { label: "Our approach", href: "#approach" },
  { label: "The fleet", href: "#fleet" },
  { label: "The journey", href: "#experience" },
  { label: "Destinations", href: "#destinations" },
];

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand ${inverse ? "brand--inverse" : ""}`} href="#top" aria-label="AUREL home">
      <svg aria-hidden="true" className="brand-mark" viewBox="0 0 42 42" fill="none">
        <path d="M21 3.5 38.5 35H3.5L21 3.5Z" stroke="currentColor" strokeWidth="1.15" />
        <path d="m21 13.2 9.5 17H11.5l9.5-17Z" stroke="currentColor" strokeWidth=".8" opacity=".66" />
        <path d="M21 3.5v9.7m0 17v4.8" stroke="currentColor" strokeWidth="1.15" />
      </svg>
      <span className="brand-word">AUREL</span>
      <span className="brand-subtitle">PRIVATE AVIATION</span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</p>;
}

function SectionNumber({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`section-number ${light ? "section-number--light" : ""}`}>{children}</span>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <motion.header
        className="site-header"
        initial={reduceMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrandMark inverse />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} className="nav-link">
              <span className="nav-link-number">0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#charter">
          <span>Plan a flight</span>
          <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mobile-nav-panel"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
          >
            <nav aria-label="Mobile navigation">
              {navItems.map((item, index) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>
                  {item.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ))}
              <a className="mobile-nav-cta" href="#charter" onClick={() => setOpen(false)}>
                Request a charter <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media media-frame">
        <Image
          className="hero-photo"
          src={image.hero}
          alt="Private aircraft resting on a runway at the end of the day"
          fill
          preload
          quality={88}
          sizes="100vw"
        />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <Navigation />

      <div className="hero-kicker">
        <span className="hero-kicker-line" />
        <span>Private aviation, considered</span>
        <span className="hero-kicker-location">Departures worldwide</span>
      </div>

      <div className="hero-copy">
        <motion.p
          className="hero-overline"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
        >
          THE WORLD, ON YOUR TERMS
        </motion.p>
        <h1 id="hero-title" className="hero-title">
          <span className="hero-title-line">
            <motion.span
              initial={reduceMotion ? false : { y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              Arrive
            </motion.span>
          </span>
          <span className="hero-title-line hero-title-line--offset">
            <motion.span
              initial={reduceMotion ? false : { y: "115%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.74, ease: [0.22, 1, 0.36, 1] }}
            >
              beyond the expected.
            </motion.span>
          </span>
        </h1>
        <motion.div
          className="hero-bottom-row"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.08 }}
        >
          <p className="hero-description">
            A more considered way to travel. Private charter, shaped around your time and the way you choose to move.
          </p>
          <div className="hero-actions">
            <a href="#fleet" className="button button--light">
              Explore the fleet <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="#charter" className="text-link text-link--light">
              Request a charter <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="hero-coordinate" aria-hidden="true">
        <span className="coordinate-dot" />
        <span>INDEPENDENT BY DESIGN</span>
        <span className="coordinate-rule" />
        <span>01 — 09</span>
      </div>
      <a href="#approach" className="scroll-cue" aria-label="Scroll to our approach">
        <span>Scroll to explore</span>
        <span className="scroll-cue-icon"><ArrowDown size={14} aria-hidden="true" /></span>
      </a>
      <div className="hero-index" aria-hidden="true">001 / AUREL JOURNAL</div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="approach section-paper" id="approach" aria-labelledby="approach-title">
      <div className="approach-meta reveal-up">
        <SectionNumber>01 / THE AUREL APPROACH</SectionNumber>
        <span className="approach-meta-note">Thoughtful from the first mile</span>
      </div>
      <div className="approach-grid">
        <div className="approach-heading reveal-up">
          <Eyebrow>A different measure of distance</Eyebrow>
          <h2 id="approach-title" className="display-title">
            Time is the<br />
            <em>true luxury.</em>
          </h2>
          <div className="approach-mark" aria-hidden="true">
            <span>✳</span>
            <span className="approach-mark-label">AUREL / 001</span>
          </div>
        </div>
        <div className="approach-story reveal-up">
          <p className="approach-lead">
            Your journey should take its cue from you.
          </p>
          <p className="body-copy">
            We make private aviation feel less like a transaction and more like a thoughtful extension of your plans. A single point of contact, a considered aircraft match and the room to travel in a way that feels entirely your own.
          </p>
          <p className="body-copy body-copy--muted">
            From a quick regional departure to a longer journey across time zones, the details begin with what matters to you.
          </p>
          <a href="#experience" className="text-link text-link--dark">
            Discover the experience <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="approach-image-wrap reveal-up">
        <div className="approach-image media-frame">
          <Image
            src={image.wing}
            alt="Looking out over clouds from an aircraft in flight"
            fill
            sizes="(max-width: 760px) 100vw, 62vw"
            className="media-image"
          />
        </div>
        <div className="approach-image-index">A QUIETER KIND OF FREEDOM <span>— 01</span></div>
        <span className="approach-side-caption" aria-hidden="true">THE VIEW FROM HERE</span>
      </div>
      <div className="approach-footnote">
        <span className="approach-footnote-line" />
        <span>Private flights, shaped with intention.</span>
        <span>EST. FOR THE WAY AHEAD</span>
      </div>
    </section>
  );
}

function AircraftShowcase({ onSelectClass }: { onSelectClass: (value: string) => void }) {
  return (
    <section className="showcase section-ink" id="aircraft" aria-labelledby="showcase-title">
      <div className="showcase-top reveal-up">
        <SectionNumber light>02 / AIRCRAFT, CONSIDERED</SectionNumber>
        <span className="showcase-top-note">The right aircraft is the one that fits your journey.</span>
      </div>
      <div className="showcase-grid">
        <div className="showcase-copy reveal-up">
          <Eyebrow light>One journey at a time</Eyebrow>
          <h2 id="showcase-title" className="display-title display-title--light">
            The right fit<br />
            <em>for what’s next.</em>
          </h2>
          <p className="showcase-description">
            We begin with your route, the people travelling and the experience you have in mind. From there, we help identify the aircraft class that makes sense.
          </p>
          <div className="showcase-specs" aria-label="Aircraft details confirmed during charter inquiry">
            <div className="showcase-spec">
              <span>01</span><strong>Capacity</strong><small>Matched to your party</small>
            </div>
            <div className="showcase-spec">
              <span>02</span><strong>Range</strong><small>Matched to your route</small>
            </div>
            <div className="showcase-spec">
              <span>03</span><strong>Cabin</strong><small>Aircraft dependent</small>
            </div>
          </div>
          <p className="illustrative-note">
            Aircraft imagery is illustrative. Aircraft, specifications and availability are confirmed during inquiry.
          </p>
          <a
            href="#charter"
            className="text-link text-link--light"
            onClick={() => onSelectClass("No preference")}
          >
            Explore aircraft options <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="showcase-visual reveal-up">
          <span className="showcase-visual-index">A / LONG-RANGE PROFILE</span>
          <div className="showcase-image media-frame">
            <Image
              src={image.aircraft}
              alt="Private jet on the tarmac at golden hour"
              fill
              sizes="(max-width: 900px) 100vw, 54vw"
              className="showcase-photo"
              data-parallax="true"
            />
          </div>
          <span className="showcase-visual-caption">AN AIRCRAFT PROFILE, NOT A PROMISE OF AVAILABILITY</span>
          <div className="showcase-index" aria-hidden="true">02 <span>—</span> 04</div>
        </div>
      </div>
      <div className="showcase-bottom-line" />
    </section>
  );
}

function FleetSection({ onSelectClass }: { onSelectClass: (value: string) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All classes");
  const [activeIndex, setActiveIndex] = useState(0);
  const filters = ["All classes", "Light", "Midsize", "Heavy", "Long range"];
  const filteredFleet = fleet.filter((item) => {
    if (activeFilter === "All classes") return true;
    return item.category.toLowerCase().startsWith(activeFilter.toLowerCase());
  });

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".fleet-card");
    if (!card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 22), behavior: "smooth" });
  };

  const updateIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".fleet-card");
    if (!card) return;
    const next = Math.round(track.scrollLeft / (card.offsetWidth + 22));
    setActiveIndex(Math.min(Math.max(next, 0), filteredFleet.length - 1));
  };

  useEffect(() => {
    setActiveIndex(0);
    if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeFilter]);

  return (
    <section className="fleet section-paper" id="fleet" aria-labelledby="fleet-title">
      <div className="fleet-heading">
        <div className="fleet-title-group reveal-up">
          <SectionNumber>03 / THE FLEET</SectionNumber>
          <Eyebrow>A class for every kind of crossing</Eyebrow>
          <h2 id="fleet-title" className="display-title">
            Choose your<br /><em>point of view.</em>
          </h2>
        </div>
        <div className="fleet-intro reveal-up">
          <p className="body-copy">
            A broad range of aircraft classes gives us room to match the flight to your party, route and preferences. Share the outline; we’ll discuss the available options with you.
          </p>
          <span className="fleet-availability-note"><span className="small-dot" /> Illustrative imagery · availability confirmed per request</span>
        </div>
      </div>

      <div className="fleet-toolbar reveal-up">
        <div className="fleet-filters" role="group" aria-label="Filter aircraft classes">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`fleet-filter ${activeFilter === filter ? "is-active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="fleet-controls">
          <span className="fleet-counter"><b>0{activeIndex + 1}</b> / 0{filteredFleet.length}</span>
          <button type="button" className="round-control" aria-label="Previous aircraft class" onClick={() => move(-1)}>
            <ArrowLeft size={17} strokeWidth={1.4} />
          </button>
          <button type="button" className="round-control" aria-label="Next aircraft class" onClick={() => move(1)}>
            <ArrowRight size={17} strokeWidth={1.4} />
          </button>
        </div>
      </div>

      <div className="fleet-track" ref={trackRef} onScroll={updateIndex} role="region" tabIndex={0} aria-label="Aircraft classes, horizontal carousel">
        {filteredFleet.map((item) => (
          <article className={`fleet-card ${item.className}`} key={item.number}>
            <div className="fleet-card-image media-frame">
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 720px) 84vw, 39vw" className="fleet-photo" />
              <div className="fleet-card-scrim" aria-hidden="true" />
              <span className="fleet-card-index">{item.number} / 04</span>
              <button
                type="button"
                className="fleet-card-cta"
                onClick={() => {
                  onSelectClass(item.category);
                  document.getElementById("charter")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ask about this class <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            </div>
            <div className="fleet-card-caption">
              <div>
                <span className="fleet-card-category">{item.category}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="fleet-bottom-note">
        <span>01 — 04 / AIRCRAFT CLASSES</span>
        <span>Swipe or use the arrows to explore <ArrowRight size={13} aria-hidden="true" /></span>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="experience section-ink" id="experience" aria-labelledby="experience-title">
      <div className="experience-intro reveal-up">
        <div>
          <SectionNumber light>04 / THE EXPERIENCE</SectionNumber>
          <Eyebrow light>From first note to final arrival</Eyebrow>
          <h2 id="experience-title" className="display-title display-title--light">
            A little more<br /><em>like yourself.</em>
          </h2>
        </div>
        <p className="experience-side-copy">
          Private aviation is personal by nature. Our role is to make each part of the journey feel considered, connected and easy to understand.
        </p>
      </div>

      <div className="story-pin">
        <div className="story-stage">
          {experienceSlides.map((slide) => (
            <article className="story-slide" key={slide.index} aria-label={`${slide.index}: ${slide.eyebrow}`}>
              <div className="story-slide-image media-frame">
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 900px) 100vw, 53vw" className="story-photo" />
                <span className="story-image-caption">{slide.note}</span>
              </div>
              <div className="story-slide-copy">
                <div className="story-slide-label"><span>{slide.index}</span><span>{slide.eyebrow}</span></div>
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
                <span className="story-orbit" aria-hidden="true"><Compass size={25} strokeWidth={1} /></span>
              </div>
              <span className="story-slide-index" aria-hidden="true">AUREL / 0{slide.index}</span>
            </article>
          ))}
        </div>
        <div className="story-pagination" aria-hidden="true">
          {experienceSlides.map((slide) => <span key={slide.index}>{slide.index}</span>)}
        </div>
      </div>
    </section>
  );
}

function DestinationsSection() {
  const [active, setActive] = useState(0);
  const destination = destinations[active];

  return (
    <section className="destinations section-paper" id="destinations" aria-labelledby="destinations-title">
      <div className="destinations-header reveal-up">
        <div>
          <SectionNumber>05 / DESTINATIONS & JOURNEYS</SectionNumber>
          <Eyebrow>The map starts with you</Eyebrow>
          <h2 id="destinations-title" className="display-title">
            A more direct<br /><em>line to elsewhere.</em>
          </h2>
        </div>
        <p className="destinations-intro body-copy">
          One place to begin, countless ways to get there. Tell us what’s drawing you away and we’ll explore the route together.
        </p>
      </div>

      <div className="destination-layout">
        <div className="route-visual reveal-up" aria-label="Illustrative route connections from Nairobi">
          <div className="route-topline"><span>ROUTES, REIMAGINED</span><span>LAT. 01°17′ S / LONG. 36°49′ E</span></div>
          <svg className="route-map" viewBox="0 0 620 405" role="img" aria-labelledby="route-title route-description">
            <title id="route-title">Illustrative route network</title>
            <desc id="route-description">Curved route lines connect Nairobi with Zanzibar, Dubai and the Seychelles as example destinations.</desc>
            <defs>
              <pattern id="map-grid" width="34" height="34" patternUnits="userSpaceOnUse">
                <path d="M34 0H0V34" fill="none" stroke="currentColor" strokeWidth=".45" opacity=".24" />
              </pattern>
            </defs>
            <rect width="620" height="405" fill="url(#map-grid)" />
            <path className="route-line route-line--one" d="M95 216 C175 230 173 280 262 304" />
            <path className="route-line route-line--two" d="M95 216 C170 125 282 100 405 122" />
            <path className="route-line route-line--three" d="M95 216 C230 345 397 308 512 233" />
            <circle className="route-halo" cx="95" cy="216" r="12" />
            <circle className="route-origin" cx="95" cy="216" r="3" />
            <circle className="route-stop" cx="262" cy="304" r="3" />
            <circle className="route-stop" cx="405" cy="122" r="3" />
            <circle className="route-stop" cx="512" cy="233" r="3" />
            <text x="55" y="196">NBO</text>
            <text x="237" y="336">ZNZ</text>
            <text x="390" y="101">DXB</text>
            <text x="486" y="262">SEZ</text>
          </svg>
          <div className="route-bottomline">
            <span><span className="route-dot route-dot--origin" /> NAIROBI / ORIGIN</span>
            <span>Illustrative routes; availability varies by request.</span>
          </div>
        </div>

        <div className="destination-feature reveal-up">
          <div className="destination-image media-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={destination.name}
                className="destination-image-inner"
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.015 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image src={destination.src} alt={destination.alt} fill sizes="(max-width: 760px) 100vw, 42vw" className="destination-photo" />
              </motion.div>
            </AnimatePresence>
            <span className="destination-feature-number">AUREL JOURNEYS / 0{active + 1}</span>
            <span className="destination-image-label">{destination.region}</span>
          </div>
          <div className="destination-feature-copy">
              <div className="destination-tabs" role="group" aria-label="Explore example destinations">
              {destinations.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                    aria-pressed={active === index}
                  className={`destination-tab ${active === index ? "is-active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <span>0{index + 1}</span>{item.name}
                </button>
              ))}
            </div>
            <div className="destination-detail" aria-live="polite">
              <h3>{destination.name}</h3>
              <p>{destination.detail}</p>
            </div>
            <a href="#charter" className="text-link text-link--dark">Start a journey <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CharterSection({ aircraftClass }: { aircraftClass: string }) {
  const [selectedClass, setSelectedClass] = useState(aircraftClass);
  const [sent, setSent] = useState(false);
  const [departureDate, setDepartureDate] = useState("");

  useEffect(() => setSelectedClass(aircraftClass), [aircraftClass]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className="charter section-ink" id="charter" aria-labelledby="charter-title">
      <div className="charter-heading reveal-up">
        <div>
          <SectionNumber light>06 / YOUR JOURNEY, IN MIND</SectionNumber>
          <Eyebrow light>A good place to begin</Eyebrow>
          <h2 id="charter-title" className="display-title display-title--light">
            Tell us where<br /><em>you have in mind.</em>
          </h2>
        </div>
        <div className="charter-side-copy">
          <p>Share a few details and our charter team can shape the conversation around your plans.</p>
          <span className="inquiry-flag"><span className="small-dot" /> PRIVATE CHARTER INQUIRY</span>
        </div>
      </div>

      <div className="inquiry-note reveal-up" role="note">
        <span className="inquiry-note-icon"><Check size={14} aria-hidden="true" /></span>
        <span><strong>Inquiry preview</strong> — this form is a front-end demonstration. It is not connected to a booking service, and submitting will not send or confirm a charter.</span>
      </div>

      <form className="charter-form reveal-up" onSubmit={onSubmit}>
        <div className="form-section-heading"><span>01</span><h3>THE JOURNEY</h3><span className="form-section-rule" /></div>
        <div className="form-grid form-grid--route">
          <label className="form-field">
            <span>Departure city or airport <b>*</b></span>
            <input name="departure" autoComplete="off" placeholder="e.g. Nairobi" required />
          </label>
          <div className="route-field-marker" aria-hidden="true"><ArrowRight size={18} strokeWidth={1.3} /></div>
          <label className="form-field">
            <span>Destination city or airport <b>*</b></span>
            <input name="destination" autoComplete="off" placeholder="Where to?" required />
          </label>
        </div>
        <div className="form-grid form-grid--details">
          <label className="form-field">
            <span>Departure date <b>*</b></span>
            <input type="date" name="departureDate" min={new Date().toLocaleDateString("en-CA")} value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} required />
          </label>
          <label className="form-field">
            <span>Return date</span>
            <input type="date" name="returnDate" min={departureDate || new Date().toLocaleDateString("en-CA")} />
          </label>
          <label className="form-field">
            <span>Passengers <b>*</b></span>
            <select name="passengers" defaultValue="2" required>
              {Array.from({ length: 16 }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>{count} {count === 1 ? "passenger" : "passengers"}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Aircraft preference</span>
            <select name="aircraftPreference" value={selectedClass} onChange={(event) => setSelectedClass(event.target.value)}>
              <option>No preference</option>
              <option>Light aircraft</option>
              <option>Midsize aircraft</option>
              <option>Heavy aircraft</option>
              <option>Long range</option>
            </select>
          </label>
        </div>

        <div className="form-section-heading form-section-heading--contact"><span>02</span><h3>YOUR DETAILS</h3><span className="form-section-rule" /></div>
        <div className="form-grid form-grid--contact">
          <label className="form-field">
            <span>Full name <b>*</b></span>
            <input name="name" autoComplete="name" placeholder="Your name" required />
          </label>
          <label className="form-field">
            <span>Email address <b>*</b></span>
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label className="form-field">
            <span>Phone number</span>
            <input type="tel" name="phone" autoComplete="tel" placeholder="Include country code" />
          </label>
          <label className="form-field form-field--message">
            <span>Anything else we should know?</span>
            <textarea name="notes" rows={2} placeholder="Timing, onward travel, or a preference you would like us to keep in mind." />
          </label>
        </div>

        <div className="form-submit-row">
          <p>By continuing, you’re sharing these details for an inquiry demonstration only. No data is transmitted or stored.</p>
          <Button type="submit" className="button--submit">
            Prepare inquiry <ArrowUpRight size={15} aria-hidden="true" />
          </Button>
        </div>
        <p className={`form-feedback ${sent ? "is-visible" : ""}`} aria-live="polite">
          {sent && "Your inquiry details are complete. This demonstration does not send or confirm a charter; connect a booking service to submit securely."}
        </p>
      </form>
      <div className="charter-orbit" aria-hidden="true"><span>A</span></div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing-photo media-frame">
        <Image src={image.wing} alt="Aircraft wing above clouds in soft morning light" fill sizes="100vw" className="closing-image" />
      </div>
      <div className="closing-overlay" aria-hidden="true" />
      <div className="closing-content reveal-up">
        <Eyebrow light>AUREL PRIVATE AVIATION</Eyebrow>
        <h2 id="closing-title" className="display-title display-title--light">
          The world feels<br /><em>closer from here.</em>
        </h2>
        <a href="#charter" className="button button--light">
          Begin a conversation <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
      <div className="closing-coordinate" aria-hidden="true">AUREL / 07 — THE WAY AHEAD</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-ink">
      <div className="footer-main">
        <div className="footer-brand-col">
          <BrandMark inverse />
          <p>Private aviation,<br />considered.</p>
          <span className="footer-contact-note">Sample contact details</span>
          <a href="mailto:charter@aurel.example">charter@aurel.example</a>
          <a href="tel:+254200000000">+254 (0)20 000 0000</a>
        </div>
        <div className="footer-link-group">
          <span className="footer-label">EXPLORE</span>
          <a href="#approach">Our approach</a>
          <a href="#fleet">The fleet</a>
          <a href="#experience">The experience</a>
          <a href="#destinations">Destinations</a>
        </div>
        <div className="footer-link-group">
          <span className="footer-label">AIRCRAFT CLASSES</span>
          <a href="#fleet">Light aircraft</a>
          <a href="#fleet">Midsize aircraft</a>
          <a href="#fleet">Heavy aircraft</a>
          <a href="#fleet">Long range</a>
        </div>
        <div className="footer-link-group footer-social">
          <span className="footer-label">FOLLOW ALONG</span>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
          <a href="#charter">Request a charter <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AUREL PRIVATE AVIATION</span>
        <span>Aircraft details and availability are confirmed per inquiry.</span>
        <div><a href="#legal-note">PRIVACY</a><a href="#legal-note">TERMS</a><a href="#top" className="footer-back-top">BACK TO TOP <ArrowUpRight size={12} /></a></div>
      </div>
      <p className="footer-legal-note" id="legal-note">Privacy notice and charter terms are placeholders and must be supplied before publication.</p>
      <div className="footer-wordmark" aria-hidden="true">AUREL</div>
    </footer>
  );
}

function ExperienceScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      lerp: 0.085,
      respectReducedMotion: true,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 87%", once: true },
        });
      });

      gsap.to(".hero-photo", {
        yPercent: 10,
        scale: 1.09,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax='true']").forEach((element) => {
        gsap.fromTo(element, { yPercent: -5 }, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: element.closest("section"), start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      const routePaths = gsap.utils.toArray<SVGPathElement>(".route-line");
      routePaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: ".route-map", start: "top 78%", end: "bottom 48%", scrub: 0.8 },
        });
      });

      media.add("(min-width: 900px)", () => {
        const slides = gsap.utils.toArray<HTMLElement>(".story-slide");
        if (slides.length < 2) return;
        gsap.set(slides.slice(1), { autoAlpha: 0, y: 26 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".story-pin",
            start: "top top",
            end: `+=${(slides.length - 1) * 820}`,
            scrub: 1,
            pin: ".story-stage",
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        slides.slice(1).forEach((slide, index) => {
          timeline.to(slides[index], { autoAlpha: 0, y: -22, duration: 0.7, ease: "none" }, index + 0.5);
          timeline.to(slide, { autoAlpha: 1, y: 0, duration: 0.7, ease: "none" }, index + 0.5);
          timeline.fromTo(slide.querySelector(".story-photo"), { scale: 1.06 }, { scale: 1, duration: 1, ease: "none" }, index + 0.5);
        });

        return () => timeline.scrollTrigger?.kill();
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });

    return () => {
      media.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default function AviationHome() {
  const [aircraftClass, setAircraftClass] = useState("No preference");

  return (
    <MotionConfig reducedMotion="user">
      <main className="site-main">
        <ExperienceScroll />
        <Hero />
        <ApproachSection />
        <AircraftShowcase onSelectClass={setAircraftClass} />
        <FleetSection onSelectClass={setAircraftClass} />
        <ExperienceSection />
        <DestinationsSection />
        <CharterSection aircraftClass={aircraftClass} />
        <ClosingSection />
        <Footer />
      </main>
    </MotionConfig>
  );
}
