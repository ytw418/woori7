"use client";

import { useState } from "react";
import { PURPOSES, SEOUL_DISTRICTS } from "@/lib/season";

// 만 19세 이상: 2026년 기준 2007년생까지
const BIRTH_YEARS = Array.from({ length: 2007 - 1985 + 1 }, (_, i) => 2007 - i);

type Status = "idle" | "sending" | "done" | "error";

const field = "w-full rounded-2xl bg-g100 px-4 py-4 text-base text-navy outline-none placeholder:text-g500 focus:ring-2 focus:ring-pink";
const label = "mb-2 block text-sm font-bold text-g700";

function Chips<T extends string>({ name, options, value, onChange }: { name: string; options: readonly T[]; value: T | ""; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full px-4 py-3 text-sm font-bold transition ${
            value === o ? "bg-pink text-white" : "bg-g100 text-g700 hover:bg-g200"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function ApplyForm() {
  const [gender, setGender] = useState<"남성" | "여성" | "">("");
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number] | "">("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    if (!gender || !purpose) {
      setError("성별과 만남 목적을 골라 주세요.");
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const payload = {
      gender,
      purpose,
      birthYear: Number(fd.get("birthYear")),
      district: fd.get("district"),
      prefAgeMin: Number(fd.get("prefAgeMin")),
      prefAgeMax: Number(fd.get("prefAgeMax")),
      intro: fd.get("intro"),
      phone: fd.get("phone"),
      instagram: fd.get("instagram"),
      agreeAge: fd.get("agreeAge") === "on",
      agreePrivacy: fd.get("agreePrivacy") === "on",
      agreeMarketing: fd.get("agreeMarketing") === "on",
      utmSource: params.get("utm_source"),
      ref: params.get("ref"),
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "신청 중 문제가 생겼어요.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "신청 중 문제가 생겼어요.");
    }
  }

  if (status === "done") {
    return <ApplyDone />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div>
        <span className={label}>성별</span>
        <Chips name="성별" options={["남성", "여성"] as const} value={gender} onChange={setGender} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={label} htmlFor="birthYear">출생연도</label>
          <select id="birthYear" name="birthYear" required className={field} defaultValue="">
            <option value="" disabled>선택</option>
            {BIRTH_YEARS.map((y) => (
              <option key={y} value={y}>{y}년</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="district">사는 곳 (서울)</label>
          <select id="district" name="district" required className={field} defaultValue="">
            <option value="" disabled>선택</option>
            {SEOUL_DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className={label}>만남 목적</span>
        <Chips name="만남 목적" options={PURPOSES} value={purpose} onChange={setPurpose} />
      </div>

      <div>
        <span className={label}>원하는 상대 나이 (만)</span>
        <div className="flex items-center gap-3">
          <input name="prefAgeMin" type="number" min={19} max={60} defaultValue={25} required className={field} aria-label="최소 나이" />
          <span className="text-g500">~</span>
          <input name="prefAgeMax" type="number" min={19} max={60} defaultValue={34} required className={field} aria-label="최대 나이" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="intro">나를 한 줄로 소개해 주세요</label>
        <input id="intro" name="intro" maxLength={60} required placeholder="주말엔 한강 러닝, 평일엔 맛집 탐방" className={field} />
      </div>

      <div>
        <label className={label} htmlFor="phone">연락처</label>
        <input id="phone" name="phone" type="tel" inputMode="numeric" required pattern="01[0-9]-?[0-9]{3,4}-?[0-9]{4}" placeholder="010-0000-0000" className={field} />
        <p className="mt-2 text-xs text-g500">매칭 안내와 운영자 확인 연락에만 사용해요. 상대에게 공개되지 않아요.</p>
      </div>

      <div>
        <label className={label} htmlFor="instagram">인스타그램 ID (선택)</label>
        <input id="instagram" name="instagram" placeholder="@woori7" className={field} />
      </div>

      <div className="space-y-3 rounded-2xl bg-g50 p-4 text-sm text-g700">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="agreeAge" required className="mt-0.5 h-5 w-5 shrink-0 accent-pink" />
          <span><b>(필수)</b> 만 19세 이상이며, 운영자 확인 연락에 동의해요.</span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="agreePrivacy" required className="mt-0.5 h-5 w-5 shrink-0 accent-pink" />
          <span>
            <b>(필수)</b> 개인정보 수집·이용에 동의해요. 수집 항목: 성별, 출생연도, 거주 구, 만남 목적, 선호 나이, 한 줄 소개, 연락처, 인스타그램 ID(선택). 목적: 시즌 매칭과 안내. 보관: 신청 철회 또는 시즌 종료 후 90일 내 파기.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="agreeMarketing" className="mt-0.5 h-5 w-5 shrink-0 accent-pink" />
          <span>(선택) 다음 시즌 오픈 소식을 받을래요.</span>
        </label>
      </div>

      {error && <p className="rounded-xl bg-pink-soft px-4 py-3 text-sm font-bold text-pink-press">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-2xl bg-pink py-4 text-lg font-bold text-white transition hover:bg-pink-press disabled:opacity-60"
      >
        {status === "sending" ? "신청하는 중..." : "시즌 1 참여 신청하기"}
      </button>
    </form>
  );
}

function ApplyDone() {
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = `${window.location.origin}/?ref=friend`;
    const text = "7일 동안 진행되는 연애 예능, 같이 신청해 볼래? '우리, 7일' 시즌 1";
    try {
      if (navigator.share) {
        await navigator.share({ title: "우리, 7일", text, url });
      } else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
      }
    } catch {
      // 사용자가 공유를 취소한 경우
    }
  }
  return (
    <div className="rounded-3xl bg-pink-soft p-7 text-center">
      <p className="text-sm font-bold text-pink">신청 완료</p>
      <h3 className="mt-2 text-2xl font-extrabold leading-snug">
        신청해 주셔서 고마워요.
        <br />
        이야기가 곧 시작돼요.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-g700">
        운영자가 확인 후 시즌 시작 전에 연락드릴게요.
        <br />
        매칭은 상대와 내가 모두 수락해야 확정돼요.
      </p>
      <button onClick={share} className="mt-6 w-full rounded-2xl bg-navy py-4 font-bold text-white">
        {copied ? "링크를 복사했어요" : "친구에게도 알려주기"}
      </button>
    </div>
  );
}
