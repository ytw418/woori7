"use client";

import { useEffect, useState } from "react";
import { SEASON_START } from "@/lib/season";

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s };
}

export default function Countdown() {
  const target = Date.parse(SEASON_START);
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setT(remaining(target));
    const id = setInterval(() => setT(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { v: t?.d, u: "일" },
    { v: t?.h, u: "시간" },
    { v: t?.m, u: "분" },
    { v: t?.s, u: "초" },
  ];

  return (
    <div className="flex gap-2" aria-label="시즌 1 시작까지 남은 시간">
      {cells.map((c) => (
        <div key={c.u} className="flex min-w-14 flex-col items-center rounded-2xl bg-g100 px-3 py-2">
          <span className="text-xl font-extrabold tabular-nums text-navy">
            {c.v === undefined ? "--" : String(c.v).padStart(2, "0")}
          </span>
          <span className="text-xs text-g500">{c.u}</span>
        </div>
      ))}
    </div>
  );
}
