"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile, projects, skills, timeline, links } from "../content";
import Bench from "./Bench";
const sections = [
  ["overview", "Overview"],
  ["projects", "Projects"],
  ["notebook", "Notebook"],
  ["writing", "Writing"],
];
const themes = [
  ["ember", "Ember"],
  ["acid", "Acid Paper"],
  ["sea", "Deep Sea"],
];
function jump(id: string) {
  document.getElementById(id)?.scrollIntoView();
}
function Diagram() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 440 72"
      role="img"
      aria-label="React sends questions to FastAPI, which retrieves context from pgvector and calls Groq"
    >
      <path
        d="M65 36H105m76 0h35V16h40m-40 20v20h40"
        fill="none"
        stroke="currentColor"
      />
      {[
        ["React", 0, 22],
        ["FastAPI", 106, 22],
        ["pgvector", 258, 2],
        ["Groq", 258, 42],
      ].map(([t, x, y]) => (
        <g key={t} transform={`translate(${x} ${y})`}>
          <rect width="75" height="26" fill="var(--bg)" stroke="currentColor" />
          <text
            x="37"
            y="17"
            textAnchor="middle"
            fill="currentColor"
            fontSize="12"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}
export default function Workshop({
  recent,
}: {
  recent: { name: string; url: string; date: string }[];
}) {
  const [active, setActive] = useState("overview"),
    [tool, setTool] = useState(""),
    [query, type] = useState(""),
    [answer, reply] = useState(""),
    [palette, choose] = useState("ember");
  const dialog = useRef<HTMLDialogElement>(null),
    reduce = useReducedMotion();
  function theme(key: string) {
    document.documentElement.dataset.theme = key;
    choose(key);
    try {
      localStorage.setItem("palette", key);
    } catch {}
  }
  function open(name: string) {
    type("");
    reply("");
    setTool(name);
    dialog.current?.showModal();
  }
  useEffect(() => {
    choose(document.documentElement.dataset.theme || "ember");
    const keys = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        dialog.current?.open ? dialog.current.close() : open("Commands");
      } else if (e.key === "\x60") {
        e.preventDefault();
        dialog.current?.open ? dialog.current.close() : open("Terminal");
      }
    };
    const update = () => {
      let id = "overview";
      for (const [s] of sections)
        if (
          (document.getElementById(s)?.getBoundingClientRect().top ??
            Infinity) <=
          innerHeight * 0.45
        )
          id = s;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
        id = "writing";
      setActive(id);
    };
    addEventListener("keydown", keys);
    addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      removeEventListener("keydown", keys);
      removeEventListener("scroll", update);
    };
  }, []);
  const commands = [
    ...sections.map(([id, name]) => ({
      name: "Go to " + name,
      act: () => jump(id),
    })),
    ...themes.map(([id, name]) => ({
      name: "Theme / " + name,
      act: () => theme(id),
    })),
    {
      name: "Open GitHub",
      act: () => window.open(profile.github, "_blank", "noopener"),
    },
    {
      name: "Copy email",
      act: async () => {
        if (!links.email) {
          reply("// TODO — email awaiting confirmation");
          return;
        }
        try {
          await navigator.clipboard.writeText(links.email);
          reply("Email copied");
        } catch {
          reply(links.email);
        }
      },
    },
  ];
  function terminal() {
    const q = query.trim().toLowerCase(),
      t = themes.find(
        ([id, name]) =>
          q === "theme " + id || q === "theme " + name.toLowerCase(),
      );
    if (t) {
      theme(t[0]);
      reply(t[1]);
    } else
      reply(
        (
          {
            help: "help · projects · whoami · theme <Ember | Acid Paper | Deep Sea> · contact",
            projects: projects.map((p) => p.name).join(" / "),
            whoami: profile.description,
            contact: links.email || profile.github,
          } as Record<string, string>
        )[q] || "Unknown command. Try help.",
      );
    type("");
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to portfolio
      </a>
      <header className="mast">
        <a href="#overview" className="brand">
          <b>Æ</b> AHMEDFORGE<span> / SYSTEMS WORKSHOP</span>
        </a>
        <button onClick={() => open("Commands")}>
          Commands <kbd>⌘ / Ctrl K</kbd>
        </button>
      </header>
      <div className="shell">
        <aside>
          <nav aria-label="Sections">
            {sections.map(([id, n], i) => (
              <a
                key={id}
                aria-label={n}
                aria-current={active === id ? "location" : undefined}
                href={"#" + id}
              >
                0{i + 1} <span>{n}</span>
              </a>
            ))}
          </nav>
          <div className="pal">
            <small>PALETTE</small>
            {themes.map(([id, n]) => (
              <button
                aria-pressed={palette === id}
                key={id}
                onClick={() => theme(id)}
              >
                <i className={id} />
                {n}
              </button>
            ))}
          </div>
        </aside>
        <main id="main">
          <section id="overview">
            <div className="eyebrow">
              <span className="mark" /> ENGINEERING PORTFOLIO{" "}
              <span className="rule" /> FIELD INDEX / 01
            </div>
            <div className="hero">
              <div>
                <p className="kicker">BACKEND / DEVOPS / MLOPS</p>
                <h1
                  onPointerMove={(e) => {
                    if (!reduce && e.pointerType === "mouse")
                      e.currentTarget.style.setProperty(
                        "--tilt",
                        ((e.clientX -
                          e.currentTarget.getBoundingClientRect().left) /
                          e.currentTarget.clientWidth) *
                          6 -
                          3 +
                          "deg",
                      );
                  }}
                  onPointerLeave={(e) =>
                    e.currentTarget.style.setProperty("--tilt", "0deg")
                  }
                >
                  {profile.name}
                  <em>.</em>
                </h1>
                <div className="alias">↳ Also known as {profile.alias}</div>
                <p className="lede">{profile.description}</p>
                <a className="solid" href="#projects">
                  Explore projects ↓
                </a>
              </div>
              <Bench />
            </div>
          </section>
          <section id="projects">
            <div className="heading">
              <small>02 / PROJECT INDEX</small>
              <h2>
                Selected work<span>.</span>
              </h2>
            </div>
            {projects.map((p, i) => (
              <motion.details
                key={p.name}
                initial={false}
                whileInView={reduce ? {} : { y: [5, 0] }}
                viewport={{ once: true }}
              >
                <summary>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.summary}</p>
                    <div className="tags">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <strong>↗</strong>
                </summary>
                <div className="detail">
                  <p>{p.detail}</p>
                  {/pdf/i.test(p.name) && <Diagram />}
                  <div>
                    {p.repo && (
                      <a href={p.repo}>
                        {p.repo.includes("/pull/")
                          ? "Pull request"
                          : "Repository"}{" "}
                        ↗
                      </a>
                    )}{" "}
                    {p.demo && <a href={p.demo}>Live demo ↗</a>}
                  </div>
                </div>
              </motion.details>
            ))}
          </section>
          <section id="notebook">
            <div className="heading">
              <small>03 / NOTEBOOK</small>
              <h2>
                At the bench<span>.</span>
              </h2>
            </div>
            <div className="columns">
              <div>
                <h3>Right now</h3>
                <p>{profile.now}</p>
                <h3>Field notes</h3>
                {timeline.map((t) => (
                  <article key={t.title}>
                    <small>{t.date}</small>
                    <h4>{t.title}</h4>
                    <p>{t.detail}</p>
                  </article>
                ))}
              </div>
              <div>
                <h3>Tool chest</h3>
                {Object.entries(skills).map(([k, v]) => (
                  <article key={k}>
                    <small>{k}</small>
                    <p>{v.join(" · ")}</p>
                  </article>
                ))}
                <h3>Repository activity</h3>
                {recent.map((r) => (
                  <article key={r.url}>
                    <small>{r.date}</small>
                    <br />
                    <a href={r.url}>{r.name} ↗</a>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="writing">
            <div className="heading">
              <small>04 / CORRESPONDENCE</small>
              <h2>
                Writing & contact<span>.</span>
              </h2>
            </div>
            {Object.entries(links).filter(([, url]) => Boolean(url)).map(([k, v]) => (
              <div className="linkrow" key={k}>
                <b>{k}</b>
                {v ? (
                  <a href={k.toLowerCase() === "email" ? "mailto:" + v : v}>
                    Open ↗
                  </a>
                ) : (
                  <small>// TODO — confirm {k}</small>
                )}
              </div>
            ))}
            <a className="foot" href={profile.github}>
              @ahmedforge ↗
            </a>
          </section>
        </main>
      </div>
      <dialog
        aria-label={tool || "Workshop commands"}
        ref={dialog}
        onClose={() => setTool("")}
      >
        <header>
          {tool}
          <button onClick={() => dialog.current?.close()}>Close ×</button>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (tool === "Terminal") terminal();
            else
              (
                dialog.current?.querySelector(".cmd") as HTMLButtonElement
              )?.click();
          }}
        >
          <input
            aria-label={
              tool === "Terminal" ? "Terminal command" : "Filter commands"
            }
            autoFocus
            placeholder={
              tool === "Terminal" ? "$ type help" : "Find a command…"
            }
            value={query}
            onChange={(e) => type(e.target.value)}
          />
        </form>
        {tool === "Commands" &&
          commands
            .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
            .map((c) => (
              <button
                className="cmd"
                key={c.name}
                onClick={() => {
                  if (c.name !== "Copy email") dialog.current?.close();
                  c.act();
                }}
              >
                {c.name} ↵
              </button>
            ))}
        <output aria-live="polite">{answer}</output>
      </dialog>
    </>
  );
}

