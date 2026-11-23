"use client";
import { useEffect, useRef, useState } from "react";
const modes = ["Token bucket", "Sliding window", "Leaky bucket"];
export default function Bench() {
  const [mode, select] = useState(0),
    [running, run] = useState(true),
    [dots, draw] = useState<boolean[]>([]),
    [counts, count] = useState([0, 0]);
  const state = useRef({ level: 4, last: 0, window: [] as number[] });
  function request() {
    const t = performance.now(),
      s = state.current,
      elapsed = (t - s.last) / 1000;
    s.last = t;
    s.window = s.window.filter((x) => t - x < 4000);
    let ok = false;
    if (mode === 0) {
      s.level = Math.min(4, s.level + elapsed);
      ok = s.level >= 1;
      if (ok) s.level--;
    } else if (mode === 1) {
      ok = s.window.length < 4;
      if (ok) s.window.push(t);
    } else {
      s.level = Math.max(0, s.level - elapsed);
      ok = s.level + 1 <= 4;
      if (ok) s.level++;
    }
    draw((a) => [...a, ok].slice(-36));
    count(([a, b]) => [a + Number(ok), b + Number(!ok)]);
  }
  useEffect(() => {
    if (!running) return;
    let n = 0;
    const id = setInterval(() => {
      request();
      if (++n % 5 === 0) {
        request();
        request();
      }
    }, 700);
    return () => clearInterval(id);
  }, [mode, running]);
  return (
    <article className="bench">
      <header>
        <span>FIG. 01 / TEST BENCH</span>
        <button
          onClick={() => run(!running)}
          aria-label={running ? "Pause simulation" : "Resume simulation"}
        >
          {running ? "Ⅱ LIVE" : "▷ PAUSED"}
        </button>
      </header>
      <h2>Rate limiter</h2>
      <label className="sr-only" htmlFor="mode">
        Algorithm
      </label>
      <select
        id="mode"
        value={mode}
        onChange={(e) => {
          const i = Number(e.target.value);
          select(i);
          state.current = {
            level: i === 0 ? 4 : 0,
            last: performance.now(),
            window: [],
          };
          draw([]);
          count([0, 0]);
        }}
      >
        {modes.map((m, i) => (
          <option key={m} value={i}>
            {m}
          </option>
        ))}
      </select>
      <svg
        className="trace"
        viewBox="0 0 320 104"
        role="img"
        aria-label="Recent accepted requests above the line and rejected requests below"
      >
        <defs>
          <pattern
            id="grid"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".3" />
          </pattern>
        </defs>
        <rect width="320" height="104" fill="url(#grid)" />
        <path d="M0 51H320" stroke="currentColor" opacity=".35" />
        {dots.map((ok, i) => {
          const x = 8 + i * 8.5,
            y = ok ? 32 : 72;
          return (
            <g key={i} stroke={ok ? "var(--signal)" : "var(--text)"}>
              <path d={"M" + x + " 51V" + y} />
              {ok ? (
                <circle cx={x} cy={y} r="2.6" fill="var(--signal)" />
              ) : (
                <path d={`M${x - 2} ${y - 2}l4 4m0 -4l-4 4`} />
              )}
            </g>
          );
        })}
      </svg>
      <footer>
        <span>
          ● {counts[0]} PASS
          <br />× {counts[1]} DROP
        </span>
        <button
          onClick={() => {
            for (let i = 0; i < 5; i++) request();
          }}
        >
          Send burst ↗
        </button>
      </footer>
    </article>
  );
}
