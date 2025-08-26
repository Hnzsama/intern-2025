"use client";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Users, Crown, Shield, BookOpen, Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import MemberCard from "@/components/member-card";

interface MemberData {
  sortedMembers: any[];
  executivePositions: any[];
  leadershipPositions: any[];
  adminPositions: any[];
  coordinatorPositions: any[];
  regularMembers: any[];
}

interface MemberPageClientProps {
  memberData: MemberData;
}

export default function MemberPageClient({ memberData }: MemberPageClientProps) {
  const { theme } = useTheme();
  
  const {
    sortedMembers,
    executivePositions,
    leadershipPositions,
    adminPositions,
    coordinatorPositions,
    regularMembers,
  } = memberData;

  const getPositionIcon = (position: string) => {
    if (position.includes("Ketua")) return <Crown className="w-4 h-4" />;
    if (position.includes("Sekretaris") || position.includes("Bendahara")) return <Shield className="w-4 h-4" />;
    if (position.includes("Koordinator")) return <Briefcase className="w-4 h-4" />;
    return <Users className="w-4 h-4" />;
  };

  const getPositionColor = (position: string) => {
    if (position.includes("Ketua")) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
    if (position.includes("Sekretaris") || position.includes("Bendahara")) return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
    if (position.includes("Koordinator")) return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
    return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Class Photo */}
      <section className="w-full">
        <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-12 md:py-20">
          <div className="text-center space-y-6">
            <Badge variant="outline" className="text-sm py-2">
              <span className="mr-2 text-primary">
                <Users className="w-4 h-4" />
              </span>
              <span>Meet Our Class</span>
            </Badge>

            <div className="max-w-screen-md mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Anggota
                <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                  Kelas
                </span>
                Kami
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Berkenalan dengan teman-teman sekelas yang luar biasa. Setiap
                individu memiliki keunikan dan bakat yang berbeda-beda.
              </p>
            </div>
          </div>

          {/* Class Photo Section */}
          <div className="relative group mt-8 w-full">
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
            <div className="relative w-full max-w-4xl mx-auto">
              <Image
                width={1200}
                height={600}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg border border-t-2 border-secondary border-t-primary/30"
                src={
                  theme === "light"
                    ? "/hero-image-light.jpeg"
                    : "/hero-image-dark.jpeg"
                }
                alt="Foto Kelas"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAAxEhkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli455XvHNvgsOl+XwBwWjlTinMMwA4Uj02nBmOl+XwBwWjlTinMMwA4Uj02nBmOhCCCDqKamh/8AFP/Z"
              />
              <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">
              {sortedMembers.length}
            </h3>
            <p className="text-muted-foreground">Total Anggota</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">
              {executivePositions.length + coordinatorPositions.length}
            </h3>
            <p className="text-muted-foreground">Pengurus</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">
              {new Set(sortedMembers.flatMap((m) => m.hobbies || [])).size}
            </h3>
            <p className="text-muted-foreground">Hobi Berbeda</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">
              {
                sortedMembers.filter(
                  (m) => m.socialNetworks && m.socialNetworks.length > 0
                ).length
              }
            </h3>
            <p className="text-muted-foreground">Aktif di Media Sosial</p>
          </div>
        </div>
      </section>

      {/* Executive Board Section */}
      {executivePositions.length > 0 && (
        <section className="py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-yellow-500" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Pengurus Inti
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pimpinan kelas yang bertanggung jawab atas koordinasi dan administrasi kelas.
            </p>
          </div>

          {/* Leadership Row (Ketua & Wakil) */}
          {leadershipPositions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {leadershipPositions.map((memberData) => (
                <div key={memberData.slug} className="w-full sm:w-72 lg:w-80">
                  <MemberCard 
                    memberData={memberData} 
                    showBio={true}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Administration Row (Sekretaris & Bendahara) */}
          {adminPositions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {adminPositions.map((memberData) => (
                <div key={memberData.slug} className="w-full sm:w-72 lg:w-80">
                  <MemberCard 
                    memberData={memberData} 
                    showBio={true}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Coordinators Section */}
      {coordinatorPositions.length > 0 && (
        <section className="py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-green-500" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Koordinator
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Koordinator berbagai bidang yang mengelola aktivitas kelas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {coordinatorPositions.map((memberData) => (
              <div key={memberData.slug} className="w-full sm:w-72 lg:w-80">
                <MemberCard 
                  memberData={memberData} 
                  showBio={true}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Regular Members Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-blue-500" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Anggota Kelas
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Teman-teman sekelas yang berkontribusi dalam berbagai kegiatan dan pembelajaran.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {regularMembers.map((memberData) => (
            <div key={memberData.slug} className="w-full sm:w-72 lg:w-80">
              <MemberCard 
                memberData={memberData} 
                showBio={true}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}