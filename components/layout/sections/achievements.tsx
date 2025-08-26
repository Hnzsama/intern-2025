import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface AchievementProps {
  icon: string;
  title: string;
  number: string;
  description: string;
  progress?: number;
  status: "excellent" | "good" | "average";
  image?: string;
  slug: string; // Added slug for MDX routing
  category: string; // Added category for better organization
  date?: string; // Added date for when achievement was recorded
}

const achievementList: AchievementProps[] = [
  {
    icon: "Users",
    title: "Jumlah Mahasiswa",
    number: "45",
    description:
      "Mahasiswa aktif yang mengikuti perkuliahan dengan antusias dan dedikasi tinggi.",
    progress: 90,
    status: "excellent",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop&crop=faces",
    slug: "jumlah-mahasiswa-aktif",
    category: "akademik",
    date: "2024-08-01"
  },
  {
    icon: "Trophy",
    title: "Prestasi Kompetisi",
    number: "8",
    description:
      "Juara dalam berbagai lomba akademik dan non-akademik tingkat nasional.",
    progress: 80,
    status: "excellent",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=300&h=200&fit=crop&crop=center",
    slug: "prestasi-kompetisi-nasional",
    category: "prestasi",
    date: "2024-07-15"
  },
  {
    icon: "BookOpen",
    title: "Proyek Selesai",
    number: "25+",
    description:
      "Proyek akhir dan tugas besar yang berhasil diselesaikan dengan nilai sempurna.",
    progress: 95,
    status: "excellent",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop&crop=center",
    slug: "proyek-mahasiswa-selesai",
    category: "akademik",
    date: "2024-06-30"
  },
  {
    icon: "Award",
    title: "IPK Rata-rata",
    number: "3.7",
    description:
      "Indeks prestasi kumulatif rata-rata kelas yang menunjukkan keunggulan akademik.",
    progress: 92,
    status: "excellent",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop&crop=center",
    slug: "ipk-rata-rata-kelas",
    category: "akademik",
    date: "2024-07-31"
  },
  {
    icon: "Target",
    title: "Tingkat Kelulusan",
    number: "95%",
    description:
      "Persentase mahasiswa yang berhasil lulus tepat waktu dengan hasil memuaskan.",
    progress: 95,
    status: "excellent",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop&crop=faces",
    slug: "tingkat-kelulusan-tepat-waktu",
    category: "akademik",
    date: "2024-07-01"
  },
  {
    icon: "Star",
    title: "Rating Kepuasan",
    number: "4.8/5",
    description:
      "Tingkat kepuasan mahasiswa terhadap kualitas pembelajaran dan fasilitas kelas.",
    progress: 96,
    status: "excellent",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=200&fit=crop&crop=faces",
    slug: "rating-kepuasan-mahasiswa",
    category: "fasilitas",
    date: "2024-08-15"
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    excellent: "default",
    good: "secondary",
    average: "outline",
  } as const;

  const labels = {
    excellent: "Excellent",
    good: "Good",
    average: "Average",
  };

  return (
    <Badge className="bg-primary/80" variant={variants[status as keyof typeof variants]}>
      {labels[status as keyof typeof labels]}
    </Badge>
  );
};

const getCategoryBadge = (category: string) => {
  const colors = {
    akademik: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    prestasi: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    fasilitas: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };

  return (
    <Badge 
      variant="outline" 
      className={`text-xs ${colors[category as keyof typeof colors] || colors.akademik}`}
    >
      {category}
    </Badge>
  );
};

export const AchievementSection = () => {
  return (
    <section id="achievements" className="container py-24 sm:py-32">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
            Prestasi
          </h2>
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
            Pencapaian 
            <span className="text-primary"> Kelas Kami</span>
          </h2>
          <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
            Data prestasi dan pencapaian akademik mahasiswa yang menunjukkan 
            kualitas pembelajaran dan dedikasi tinggi dalam setiap semester.
          </h3>
        </div>

        {/* Achievement Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementList.map(
            ({
              icon,
              title,
              number,
              description,
              progress,
              status,
              image,
              slug,
              category,
              date,
            }) => (
              <Card
                key={slug}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-secondary border-t-2 border-t-primary/30 group"
              >
                <div className="relative h-48">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary/40 rounded-full ring-8 ring-primary/30 shadow-sm">
                      <Icon
                        name={icon as keyof typeof icons}
                        size={24}
                        color="hsl(var(--primary))"
                        className="text-primary"
                      />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {getStatusBadge(status)}
                    {getCategoryBadge(category)}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-background/0 via-background/50 to-background"></div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {title}
                    </CardTitle>
                    <div className="text-2xl font-bold text-primary">
                      {number}
                    </div>
                  </div>
                  {date && (
                    <div className="text-xs text-muted-foreground">
                      Update: {new Date(date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {description}
                  </CardDescription>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pencapaian</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>

                <Separator />

                <CardFooter className="pt-4">
                  <Link href={`/achievements/${slug}`} className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group/arrow hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      Lihat Detail
                      <ArrowRight className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/achievements">
            <Button size="lg" className="min-w-[200px]">
              Lihat Semua Prestasi
            </Button>
          </Link>
          <Link href="/achievements?category=prestasi">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Filter by Kategori
            </Button>
          </Link>
        </div>

        {/* Stats Grid - sama seperti HeroSection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              45
            </div>
            <div className="text-sm text-muted-foreground">Total Mahasiswa</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              3.7
            </div>
            <div className="text-sm text-muted-foreground">IPK Rata-rata</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              95%
            </div>
            <div className="text-sm text-muted-foreground">Tingkat Lulus</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">
              4.8/5
            </div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};