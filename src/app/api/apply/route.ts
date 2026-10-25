import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PURPOSES, SEOUL_DISTRICTS } from "@/lib/season";

const MAX_BIRTH_YEAR = 2007; // 2026년 기준 만 19세 이상

function bad(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("잘못된 요청이에요.");
  }

  const gender = body.gender;
  const purpose = body.purpose;
  const birthYear = Number(body.birthYear);
  const district = body.district;
  const prefAgeMin = Number(body.prefAgeMin);
  const prefAgeMax = Number(body.prefAgeMax);
  const intro = String(body.intro ?? "").trim().slice(0, 60);
  const phone = String(body.phone ?? "").replace(/[^0-9]/g, "");
  const instagram = String(body.instagram ?? "").trim().replace(/^@/, "").slice(0, 30) || null;

  if (gender !== "남성" && gender !== "여성") return bad("성별을 골라 주세요.");
  if (!PURPOSES.includes(purpose as (typeof PURPOSES)[number])) return bad("만남 목적을 골라 주세요.");
  if (!Number.isInteger(birthYear) || birthYear > MAX_BIRTH_YEAR || birthYear < 1960) return bad("만 19세 이상만 신청할 수 있어요.");
  if (!SEOUL_DISTRICTS.includes(district as (typeof SEOUL_DISTRICTS)[number])) return bad("사는 구를 골라 주세요.");
  if (!(prefAgeMin >= 19 && prefAgeMax <= 60 && prefAgeMin <= prefAgeMax)) return bad("원하는 나이 범위를 확인해 주세요.");
  if (!intro) return bad("한 줄 소개를 적어 주세요.");
  if (!/^01[0-9]{8,9}$/.test(phone)) return bad("연락처를 확인해 주세요.");
  if (body.agreeAge !== true || body.agreePrivacy !== true) return bad("필수 항목에 동의해 주세요.");

  const row = {
    gender,
    purpose,
    birth_year: birthYear,
    district,
    pref_age_min: prefAgeMin,
    pref_age_max: prefAgeMax,
    intro,
    phone,
    instagram,
    agree_marketing: body.agreeMarketing === true,
    utm_source: typeof body.utmSource === "string" ? body.utmSource.slice(0, 50) : null,
    ref: typeof body.ref === "string" ? body.ref.slice(0, 50) : null,
  };

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[apply] Supabase 미설정, 신청 데이터는 저장되지 않음:", { ...row, phone: "***" });
      return NextResponse.json({ ok: true, stored: false });
    }
    return NextResponse.json({ error: "지금은 신청을 받을 수 없어요. 잠시 후 다시 시도해 주세요." }, { status: 503 });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("woori7_applications").insert(row);
  if (error) {
    if (error.code === "23505") return bad("이미 신청한 연락처예요. 운영자가 곧 연락드릴게요.");
    console.error("[apply] insert failed", error.message);
    return NextResponse.json({ error: "신청 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
