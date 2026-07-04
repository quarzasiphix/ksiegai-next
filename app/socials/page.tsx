import type { Metadata } from "next";
import Link from "next/link";
import { Facebook, Sparkles, FileCheck2, MessageSquare, Download, Smartphone } from "lucide-react";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=pl.ksiegai.mobile";

export const metadata: Metadata = {
  title: "ksiegai social media — X, Reddit i Facebook",
  description:
    "Oficjalne profile ksiegai. Aktualizacje produktu, KSeF, faktury, dokumenty i feedback od użytkowników.",
  alternates: {
    canonical: "https://ksiegai.pl/socials",
  },
  openGraph: {
    title: "ksiegai social media — X, Reddit i Facebook",
    description:
      "Oficjalne profile ksiegai. Aktualizacje produktu, KSeF, faktury, dokumenty i feedback od użytkowników.",
    url: "https://ksiegai.pl/socials",
    type: "website",
    locale: "pl_PL",
  },
};

const SOCIALS = [
  {
    name: "X / Twitter",
    handle: "@ksiegai",
    url: "https://x.com/ksiegai",
    desc: "Szybkie aktualizacje, nowe funkcje i posty z budowy produktu.",
    icon: XIcon,
    color: "from-neutral-700 to-neutral-900",
    ring: "hover:ring-neutral-400/30",
  },
  {
    name: "Reddit",
    handle: "r/ksiegai",
    url: "https://www.reddit.com/r/ksiegai/",
    desc: "Pytania, dyskusje, feedback i pomysły od użytkowników.",
    icon: RedditIcon,
    color: "from-orange-500 to-orange-600",
    ring: "hover:ring-orange-400/30",
  },
  {
    name: "Facebook",
    handle: "ksiegai",
    url: "https://www.facebook.com/profile.php?id=61577273731274",
    desc: "Nowości, poradniki i aktualizacje dla firm oraz księgowych.",
    icon: Facebook,
    color: "from-blue-500 to-blue-600",
    ring: "hover:ring-blue-400/30",
  },
];

const TOPICS = [
  {
    icon: Sparkles,
    title: "Aktualizacje produktu",
    desc: "Nowe funkcje, poprawki i rozwój aplikacji.",
  },
  {
    icon: FileCheck2,
    title: "KSeF i faktury",
    desc: "Praktyczne informacje dla firm.",
  },
  {
    icon: MessageSquare,
    title: "Feedback od użytkowników",
    desc: "Pytania, sugestie i pomysły społeczności.",
  },
];

export default function SocialsPage() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-2xl px-6 py-20">
        {/* Hero */}
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-blue-300">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Bądź na bieżąco
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">ksiegai w social mediach</h1>
          <p className="mt-4 text-lg text-white/55">
            Aktualizacje, nowe funkcje, KSeF, księgowość i rozwój aplikacji dla JDG i spółek.
          </p>
          <p className="mt-3 text-sm text-white/35">
            Dołącz, jeśli prowadzisz firmę, obsługujesz klientów księgowo albo chcesz śledzić rozwój ksiegai.
          </p>
        </div>

        {/* Social cards */}
        <div className="space-y-3">
          {SOCIALS.map(({ name, handle, url, desc, icon: Icon, color, ring }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm ring-1 ring-transparent transition-all duration-200 hover:bg-white/6 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 ${ring}`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white/90">{name}</p>
                <p className="text-xs text-white/40">{handle}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">{desc}</p>
              </div>
              <span className="shrink-0 text-white/25 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/60">
                &rarr;
              </span>
            </a>
          ))}
        </div>

        {/* Android highlight */}
        <div className="mt-4 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-5 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white/90">ksiegai na Androida</p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">
                Pobierz aplikację z Google Play albo zobacz stronę wersji mobilnej.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" />
                  Google Play
                </a>
                <Link
                  href="/android"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Strona Android
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* What we publish */}
        <section className="mt-16">
          <h2 className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-white/40">
            Co publikujemy?
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {TOPICS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/8 bg-white/4 p-4 text-center backdrop-blur-sm"
              >
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 ring-1 ring-blue-500/20">
                  <Icon className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-sm font-semibold text-white/90">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <p className="mt-16 text-center text-xs text-white/30">
          Masz pytanie albo sugestię?{" "}
          <Link href="/" className="text-white/50 underline underline-offset-2 hover:text-white/80 transition-colors">
            Wróć na stronę główną
          </Link>
        </p>
      </div>
    </main>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function RedditIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.82 12.774c.037.166.056.34.056.518 0 2.55-2.968 4.62-6.63 4.62-3.664 0-6.63-2.07-6.63-4.62 0-.178.02-.352.056-.518A1.44 1.44 0 015 11.36a1.44 1.44 0 012.44-1.03c1.006-.686 2.393-1.12 3.933-1.174l.744-3.494a.34.34 0 01.4-.264l2.46.523a1.02 1.02 0 11-.13.634l-2.19-.466-.657 3.086c1.505.068 2.86.5 3.848 1.176a1.44 1.44 0 012.436 1.03c0 .61-.394 1.128-.938 1.32zM8.5 13a1 1 0 112 0 1 1 0 01-2 0zm7.5-1a1 1 0 100 2 1 1 0 000-2zm-.35 3.192a.34.34 0 00-.478.043c-.54.63-1.673.855-2.172.855-.5 0-1.633-.225-2.172-.855a.34.34 0 10-.516.442c.72.84 2.147 1.078 2.688 1.078.54 0 1.968-.238 2.688-1.078a.34.34 0 00-.038-.485z" />
    </svg>
  );
}
