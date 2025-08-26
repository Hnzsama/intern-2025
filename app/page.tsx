import { AchievementSection } from "@/components/layout/sections/achievements";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { ActivitiesSection } from "@/components/layout/sections/activities";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/partners";
import TeamSection from "@/components/layout/sections/member";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import { SubjectsSection } from "@/components/layout/sections/subjects";

export const metadata = {
  title: "Kelas I Manajemen Informatika - Universitas Negeri Surabaya",
  description: "Profil resmi Kelas I Manajemen Informatika Universitas Negeri Surabaya. Berkenalan dengan anggota kelas, prestasi, kegiatan, dan informasi akademik terkini.",
  keywords: [
    "Manajemen Informatika",
    "Universitas Negeri Surabaya",
    "UNESA",
    "Kelas I",
    "Mahasiswa",
    "Profil Kelas",
    "Teknik Informatika",
    "Surabaya"
  ],
  authors: [
    {
      name: "Kelas I Manajemen Informatika UNESA",
    }
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kelas-i-mi-unesa.vercel.app", // Sesuaikan dengan domain Anda
    siteName: "Kelas I Manajemen Informatika UNESA",
    title: "Kelas I Manajemen Informatika - Universitas Negeri Surabaya",
    description: "Profil resmi Kelas I Manajemen Informatika Universitas Negeri Surabaya. Berkenalan dengan anggota kelas, prestasi, kegiatan, dan informasi akademik terkini.",
    images: [
      {
        url: "https://your-domain.com/og-image-kelas-mi.jpg", // Buat gambar OG khusus untuk kelas
        width: 1200,
        height: 630,
        alt: "Kelas Internasional D4 Manajemen Informatika UNESA",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@unesa_official", // Sesuaikan dengan Twitter handle UNESA jika ada
    creator: "@kelas_internasional_d4_mi_unesa",
    title: "Kelas Internasional D4 Manajemen Informatika Universitas Negeri Surabaya",
    description: "Profil resmi Kelas Internasional D4 Manajemen Informatika Universitas Negeri Surabaya. Berkenalan dengan anggota kelas, prestasi, kegiatan, dan informasi akademik terkini.",
    images: [
      "https://your-domain.com/og-image-kelas-mi.jpg", // Sama dengan OpenGraph image
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Tambahkan Google Search Console verification
  },
  category: "education",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SponsorsSection />
      <AchievementSection />
      <ActivitiesSection />
      <SubjectsSection />
      <TestimonialSection />
      <TeamSection />
      <CommunitySection />
      {/* <PricingSection /> */}
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}