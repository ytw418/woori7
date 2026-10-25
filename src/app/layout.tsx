import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const body = Noto_Sans_KR({
  variable: "--font-body",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "우리, 7일 | 오늘부터 두 분은 예비부부입니다",
  description:
    "매칭 후 7일 동안 매일 공개되는 에피소드와 미션으로 서로를 알아가는, 내가 직접 출연하는 연애 예능. 시즌 1 참여자 모집 중.",
  openGraph: {
    title: "우리, 7일",
    description: "7일 뒤, 두 사람의 이야기는 어떻게 끝날까요? 시즌 1 참여자 모집 중.",
    locale: "ko_KR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${body.variable} antialiased`}>{children}</body>
    </html>
  );
}
