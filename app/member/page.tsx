import { member } from "#site/content";
import { Metadata } from "next";
import MemberPageClient from "./components/member-page-client";

export const metadata: Metadata = {
  title: "Anggota Kelas | Kelas Internasional D4 Manajemen Informatika UNESA",
  description: "Profil lengkap anggota Kelas Internasional D4 Manajemen Informatika Universitas Negeri Surabaya. Berkenalan dengan pengurus kelas, koordinator, dan seluruh teman sekelas.",
  keywords: [
    "Anggota Kelas",
    "Profil Mahasiswa",
    "Kelas Internasional",
    "D4 Manajemen Informatika",
    "UNESA",
    "Pengurus Kelas",
    "Koordinator",
    "Mahasiswa Aktif",
    "Surabaya"
  ],
  openGraph: {
    title: "Anggota Kelas | Kelas Internasional D4 Manajemen Informatika UNESA",
    description: "Profil lengkap anggota Kelas Internasional D4 Manajemen Informatika Universitas Negeri Surabaya. Berkenalan dengan pengurus kelas, koordinator, dan seluruh teman sekelas.",
    type: "website",
    locale: "id_ID",
    url: "https://kelas-internasional-d4-mi-unesa.vercel.app/members",
    siteName: "Kelas Internasional D4 Manajemen Informatika UNESA",
    images: [
      {
        url: "https://your-domain.com/og-image-members.jpg",
        width: 1200,
        height: 630,
        alt: "Anggota Kelas Internasional D4 Manajemen Informatika UNESA",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@unesa_official",
    creator: "@kelas_internasional_d4_mi_unesa",
    title: "Anggota Kelas | Kelas Internasional D4 Manajemen Informatika UNESA",
    description: "Profil lengkap anggota Kelas Internasional D4 Manajemen Informatika Universitas Negeri Surabaya. Berkenalan dengan pengurus kelas, koordinator, dan seluruh teman sekelas.",
    images: [
      "https://your-domain.com/og-image-members.jpg",
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
  alternates: {
    canonical: "https://kelas-internasional-d4-mi-unesa.vercel.app/members",
  },
  category: "education",
};

export default function MemberPage() {
  // Define position hierarchy for sorting
  const positionHierarchy: { [key: string]: number } = {
    "Ketua Kelas": 1,
    "Wakil Ketua Kelas": 2,
    "Sekretaris": 3,
    "Wakil Sekretaris": 4,
    "Bendahara": 5,
    "Wakil Bendahara": 6,
    "Koordinator Kebersihan": 7,
    "Koordinator Keagamaan": 8,
  };

  // Sort members by position hierarchy first, then by order
  const sortedMembers = member.sort((a, b) => {
    const aPosition = a.position || "";
    const bPosition = b.position || "";
    
    const aHierarchy = positionHierarchy[aPosition] || 999;
    const bHierarchy = positionHierarchy[bPosition] || 999;
    
    if (aHierarchy !== bHierarchy) {
      return aHierarchy - bHierarchy;
    }
    
    return (a.order || 999) - (b.order || 999);
  });

  // Group members by position category
  const executivePositions = sortedMembers.filter(m => 
    m.position && positionHierarchy[m.position] <= 6
  );
  
  // Further group executive positions for better layout
  const leadershipPositions = executivePositions.filter(m => 
    m.position && (m.position.includes("Ketua"))
  );
  
  const adminPositions = executivePositions.filter(m => 
    m.position && (m.position.includes("Sekretaris") || m.position.includes("Bendahara"))
  );
  
  const coordinatorPositions = sortedMembers.filter(m => 
    m.position && positionHierarchy[m.position] > 6 && positionHierarchy[m.position] < 999
  );
  
  const regularMembers = sortedMembers.filter(m => 
    !m.position || !positionHierarchy[m.position]
  );

  const memberData = {
    sortedMembers,
    executivePositions,
    leadershipPositions,
    adminPositions,
    coordinatorPositions,
    regularMembers,
  };

  return <MemberPageClient memberData={memberData} />;
}