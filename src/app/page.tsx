import ApplyForm from "@/components/ApplyForm";
import Countdown from "@/components/Countdown";
import { EPISODES } from "@/lib/season";

const STEPS = [
  { t: "참여 신청", d: "1분이면 끝나요. 서울에 사는 만 19세 이상이면 누구나." },
  { t: "운영자 확인", d: "안전한 시즌을 위해 운영자가 짧게 연락드려요." },
  { t: "매칭 알림", d: "상대 소개 카드를 보고, 둘 다 수락하면 시즌이 시작돼요." },
  { t: "매일 밤 8시 에피소드", d: "5분이면 끝나는 미션으로 서로를 알아가요." },
  { t: "DAY 7 최종 선택", d: "둘 다 원할 때만 이야기가 이어져요." },
];

const PROMISES = [
  { t: "모든 단계는 둘 다 동의할 때만", d: "매칭, 데이트 제안, 최종 선택 모두 서로 원할 때만 진행돼요." },
  { t: "언제든 그만둘 수 있어요", d: "버튼 하나로 시즌을 종료할 수 있고, 이유를 묻지 않아요." },
  { t: "답장, 출석 강요 없음", d: "미션을 건너뛰어도 불이익이 없어요. 대화는 편한 속도로." },
  { t: "거절은 드러나지 않아요", d: "선택이 엇갈리면 누가 거절했는지 표시하지 않고 조용히 마무리돼요." },
  { t: "신고와 차단은 바로", d: "불편한 상대는 즉시 차단하고, 신고는 운영자가 직접 확인해요." },
];

const FAQS = [
  { q: "비용이 드나요?", a: "시즌 1은 전부 무료예요." },
  { q: "어디에 사는 사람이 참여할 수 있나요?", a: "시즌 1은 서울에 사는 분만 모집해요. 실제 만남으로 이어지기 쉽도록 지역을 한정했어요." },
  { q: "나이 제한이 있나요?", a: "만 19세 이상 성인만 참여할 수 있어요. 시즌 1은 20대 중반~30대 초반 분들을 중심으로 매칭해요." },
  { q: "'예비부부'는 실제 결혼과 관련이 있나요?", a: "아니요. '예비부부'는 7일 동안의 가상 예능 콘셉트예요. 실제 혼인이나 법적 관계와는 전혀 관련이 없어요." },
  { q: "매칭이 안 되면 어떻게 되나요?", a: "대기열에 남아 다음 시즌에 우선 매칭돼요. 성비가 맞지 않으면 시즌 시작이 조금 늦어질 수 있어요." },
  { q: "내 정보는 어떻게 관리되나요?", a: "연락처는 상대에게 공개되지 않아요. 신청을 철회하거나 시즌이 끝나고 90일이 지나면 파기해요." },
];

function Section({ id, eyebrow, title, children, gray }: { id?: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode; gray?: boolean }) {
  return (
    <section id={id} className={gray ? "bg-g50" : ""}>
      <div className="mx-auto max-w-xl px-6 py-20">
        <p className="text-sm font-bold text-pink">{eyebrow}</p>
        <h2 className="mt-2 text-[28px] font-extrabold leading-tight">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[280px] rounded-[40px] bg-navy p-3 shadow-2xl shadow-pink/20">
      <div className="rounded-[30px] bg-white px-5 pb-6 pt-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-g500">시즌 1 · DAY 3</span>
          <span className="rounded-full bg-lavender-soft px-2 py-1 text-[11px] font-bold text-lavender">오늘 밤 8시 공개</span>
        </div>
        <p className="mt-4 text-lg font-extrabold leading-snug">
          서로 고른 데이트 카드가
          <br />
          겹칠까요?
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["한강 피크닉", "전시 데이트", "맛집 탐방", "보드게임 카페"].map((c, i) => (
            <div key={c} className={`rounded-2xl px-3 py-4 text-center text-sm font-bold ${i === 0 ? "bg-pink text-white" : "bg-g100 text-g700"}`}>
              {c}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-pink-soft px-4 py-3 text-sm font-bold text-pink">
          상대도 선택을 마쳤어요
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-g100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-6">
          <span className="text-lg font-extrabold">
            우리<span className="text-pink">,</span> 7일
          </span>
          <a href="#apply" className="rounded-full bg-pink-soft px-4 py-2 text-sm font-bold text-pink">
            참여 신청
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-xl px-6 pb-16 pt-14">
          <p className="inline-block rounded-full bg-pink-soft px-3 py-1 text-sm font-bold text-pink">
            시즌 1 참여자 모집 중
          </p>
          <h1 className="mt-5 text-[34px] font-extrabold leading-[1.25] sm:text-[40px]">
            오늘부터 두 분은
            <br />
            <span className="text-pink">예비부부</span>입니다.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-g700">
            7일 뒤, 두 사람의 이야기는 어떻게 끝날까요?
            <br />
            내가 직접 출연하는 7일간의 연애 예능.
          </p>
          <div className="mt-8">
            <p className="mb-3 text-sm font-bold text-g500">11월 9일(월) 밤 8시, 시즌 1 시작까지</p>
            <Countdown />
          </div>
          <div className="mt-14">
            <PhoneMock />
          </div>
        </div>
      </section>

      {/* Concept */}
      <Section eyebrow="왜 우리, 7일인가요" title={<>소개팅은 매칭으로 끝나지만,<br />우리의 이야기는 이제 시작이에요.</>} gray>
        <div className="space-y-3">
          {[
            { t: "무슨 말을 할지 고민하지 마세요", d: "매일 도착하는 미션이 자연스러운 대화 소재가 돼요." },
            { t: "끝없는 프로필 넘기기는 그만", d: "한 시즌에 한 사람. 지금의 관계에만 집중해요." },
            { t: "내일이 궁금해지는 연애", d: "매일 밤 8시, 두 사람의 다음 에피소드가 열려요." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl bg-white p-6">
              <p className="text-lg font-bold">{c.t}</p>
              <p className="mt-1 text-g700">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Episodes */}
      <section>
        <div className="mx-auto max-w-xl px-6 pt-20">
          <p className="text-sm font-bold text-pink">7일간의 에피소드</p>
          <h2 className="mt-2 text-[28px] font-extrabold leading-tight">
            매일 밤 8시,
            <br />
            새로운 이야기가 열려요
          </h2>
        </div>
        <div className="no-scrollbar mx-auto mt-10 flex max-w-xl snap-x gap-3 overflow-x-auto px-6 pb-20">
          {EPISODES.map((e) => (
            <div
              key={e.day}
              className={`flex w-56 shrink-0 snap-start flex-col justify-between rounded-3xl p-6 ${
                e.day === 7 ? "bg-navy text-white" : e.day === 0 ? "bg-pink text-white" : "bg-g100"
              }`}
            >
              <span className={`text-sm font-extrabold ${e.day === 0 || e.day === 7 ? "text-white/70" : "text-pink"}`}>DAY {e.day}</span>
              <div className="mt-10">
                <p className="text-lg font-extrabold leading-snug">{e.title}</p>
                <p className={`mt-2 text-sm ${e.day === 0 || e.day === 7 ? "text-white/80" : "text-g700"}`}>{e.teaser}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <Section eyebrow="이렇게 진행돼요" title="신청부터 최종 선택까지" gray>
        <ol className="space-y-6">
          {STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink text-sm font-extrabold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-lg font-bold">{s.t}</p>
                <p className="mt-1 text-g700">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Final choice preview */}
      <Section eyebrow="DAY 7 미리보기" title={<>마지막 밤,<br />두 사람의 선택은?</>}>
        <div className="rounded-3xl bg-navy p-7 text-white">
          <p className="text-sm font-bold text-white/60">DAY 7 · 최종 선택</p>
          <p className="mt-3 text-2xl font-extrabold leading-snug">이야기를 이어갈까요?</p>
          <p className="mt-2 text-sm text-white/70">상대에게는 내 선택이 바로 보이지 않아요. 둘 다 원할 때만 결과가 공개돼요.</p>
          <div className="mt-6 grid gap-2">
            <div className="rounded-2xl bg-pink py-4 text-center font-bold">이어가고 싶어요</div>
            <div className="rounded-2xl bg-white/10 py-4 text-center font-bold text-white/80">이번 시즌은 여기까지</div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-g500">실제 서비스 화면 예시예요.</p>
      </Section>

      {/* Promises */}
      <Section eyebrow="안심 약속" title={<>재미는 예능처럼,<br />마음은 진짜처럼 존중해요</>} gray>
        <div className="space-y-3">
          {PROMISES.map((p) => (
            <div key={p.t} className="rounded-3xl bg-white p-6">
              <p className="font-bold">{p.t}</p>
              <p className="mt-1 text-sm text-g700">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Apply */}
      <Section id="apply" eyebrow="시즌 1 참여 신청" title={<>1분이면 끝나요.<br />이야기의 주인공이 되어 주세요.</>}>
        <ApplyForm />
      </Section>

      {/* FAQ */}
      <Section eyebrow="자주 묻는 질문" title="궁금한 점이 있나요?" gray>
        <div className="divide-y divide-g200 rounded-3xl bg-white">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                {f.q}
                <span className="ml-4 text-g500 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-g700">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <footer className="mx-auto max-w-xl px-6 py-12 text-xs leading-relaxed text-g500">
        <p className="font-bold text-g700">우리, 7일</p>
        <p className="mt-2">&lsquo;예비부부&rsquo;는 가상의 예능 콘셉트이며 실제 혼인이나 법적 관계를 의미하지 않아요.</p>
        <p>만 19세 이상 성인만 참여할 수 있어요.</p>
        <p className="mt-4">© 2026 우리, 7일</p>
      </footer>

    </main>
  );
}
