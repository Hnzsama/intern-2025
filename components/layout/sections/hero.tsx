"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className="container w-full px-4 md:px-6">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>Angkatan 2025</Badge>
            </span>
            <span> Generasi Digital Native! </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-4">
            <h1>Welcome to</h1>
            <h1>
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                International Class
              </span>
              Informatics Management
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            Kami bukan hanya sekadar kelas, tapi keluarga besar yang saling mendukung dalam perjalanan akademik.
            Mari berkolaborasi, berinovasi, dan meraih prestasi bersama!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button className="w-full sm:w-auto min-w-[200px] font-bold group/arrow">
              <Users className="size-5 mr-2" />
              Komunitas
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-full sm:w-auto min-w-[200px] font-bold"
            >
              <Link
                href="#achievements"
                target="_self"
              >
                <Award className="size-5 mr-2" />
                Lihat Prestasi
              </Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-md mx-auto mt-12 px-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">40+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Mahasiswa</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">15+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Kegiatan</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">5+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Prestasi</div>
            </div>
          </div>
        </div>

        <div className="relative group mt-14 w-full px-4">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full max-w-[1200px] h-auto mx-auto rounded-lg relative leading-none border border-t-2 border-secondary border-t-primary/30 object-cover"
            src={
              theme === "light"
                ? "/hero-image-light.jpeg"
                : "/hero-image-dark.jpeg"
            }
            alt="dashboard"
            priority
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};