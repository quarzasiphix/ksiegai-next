'use client';

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LandingPageVariant } from "@/lib/ab-testing";

/**
 * Variant-specific hero content
 * Variant A: Pre-KSeF Standard (current default)
 * Variant B: Accountant Lock-in lead story
 */

interface HeroVariantProps {
  variant: LandingPageVariant;
}

export function HeroHeadline({ variant }: HeroVariantProps) {
  if (variant === 'B') {
    return (
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in px-2">
        System, który księgowa polubi — i nie będzie chciała zmienić
      </h1>
    );
  }

  // Variant A (default)
  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight animate-fade-in px-2">
      Inbox faktur dla polskich firm — zanim trafią do KSeF.
    </h1>
  );
}

export function HeroSubheadline({ variant }: HeroVariantProps) {
  if (variant === 'B') {
    return (
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 sm:mb-6 font-medium leading-relaxed animate-fade-in px-2">
        Faktury wpadają automatycznie. Wszystko ma ślad audytu. <br className="hidden sm:block" />
        Księgowa widzi wszystko bez maili — i nie chce wracać do chaosu.
      </p>
    );
  }

  // Variant A (default)
  return (
    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 sm:mb-6 font-medium leading-relaxed animate-fade-in px-2">
      Faktury wpadają automatycznie, możesz je omówić i zatwierdzić. <br className="hidden sm:block" />
      Księgowa widzi wszystko bez maili.
    </p>
  );
}

export function HeroMicrocopy({ variant }: HeroVariantProps) {
  if (variant === 'B') {
    return (
      <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fade-in px-2">
        Księgowa, która raz pracuje z KsięgaI, nie chce wracać do maili i Excel-a.
      </p>
    );
  }

  // Variant A (default)
  return (
    <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fade-in px-2">
      System przygotowuje dane. Ty zatwierdzasz wyjątki.
    </p>
  );
}

export function HeroMechanism({ variant }: HeroVariantProps) {
  if (variant === 'B') {
    return (
      <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto mb-8 animate-fade-in">
        <p className="text-base sm:text-lg text-blue-200 font-medium text-center">
          <span className="text-blue-400 font-bold">Dlaczego księgowe zostają:</span> Raz zobaczą workflow z rolami, śladem audytu i automatycznym odbiorem — nie chcą wracać do chaosu.
        </p>
      </div>
    );
  }

  // Variant A (default)
  return (
    <div className="bg-blue-900/30 border border-blue-500/30 rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto mb-8 animate-fade-in">
      <p className="text-base sm:text-lg text-blue-200 font-medium text-center">
        <span className="text-blue-400 font-bold">Mechanizm:</span> Jeśli Twój kontrahent używa KsięgaI — faktura pojawia się u Ciebie automatycznie. Bez maili.
      </p>
    </div>
  );
}

/**
 * Variant-specific KSeF banner
 */
export function KSeFBanner({ variant }: HeroVariantProps) {
  if (variant === 'B') {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm sm:text-base text-white font-medium">
            Księgowe, które pracują z KsięgaI, są gotowe na KSeF. Ich klienci też.
          </p>
        </div>
      </div>
    );
  }

  // Variant A (default)
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-center text-sm sm:text-base text-white font-medium">
          Każda polska firma będzie potrzebować ustrukturyzowanej skrzynki odbiorczej. KSeF czyni to nieuniknionym.
        </p>
      </div>
    </div>
  );
}

/**
 * Tracking wrapper for CTA buttons
 */
interface CTAButtonProps {
  href: string;
  variant: LandingPageVariant;
  children: React.ReactNode;
  className?: string;
  eventName?: string;
}

export function TrackedCTAButton({ href, variant, children, className, eventName = 'cta_click' }: CTAButtonProps) {
  const handleClick = () => {
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        variant_id: variant,
        cta_location: 'hero',
      });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
