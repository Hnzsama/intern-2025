import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface ActivitiesProps {
  icon: string;
  title: string;
  description: string;
}

const activitiesList: ActivitiesProps[] = [
  {
    icon: "BookOpen",
    title: "Pembelajaran Interaktif",
    description:
      "Pembelajaran dengan metode interaktif yang melibatkan diskusi, presentasi, dan praktik langsung untuk meningkatkan pemahaman mahasiswa.",
  },
  {
    icon: "Users",
    title: "Kerja Kelompok",
    description:
      "Kolaborasi dalam tim untuk mengerjakan proyek dan tugas besar yang mengasah kemampuan teamwork dan komunikasi.",
  },
  {
    icon: "Lightbulb",
    title: "Riset & Inovasi",
    description:
      "Kegiatan penelitian dan pengembangan inovasi dalam bidang teknologi yang mendorong kreativitas mahasiswa.",
  },
  {
    icon: "Trophy",
    title: "Kompetisi Akademik",
    description:
      "Partisipasi aktif dalam berbagai kompetisi tingkat nasional dan internasional untuk mengasah kemampuan kompetitif.",
  },
  {
    icon: "Presentation",
    title: "Seminar & Workshop",
    description:
      "Mengikuti dan menyelenggarakan seminar serta workshop untuk menambah wawasan dan keterampilan praktis.",
  },
  {
    icon: "GraduationCap",
    title: "Mentoring Program",
    description:
      "Program bimbingan dan mentoring dari dosen dan alumni untuk pengembangan karir dan akademik mahasiswa.",
  },
];

export const ActivitiesSection = () => {
  return (
    <section id="activities" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Aktivitas
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Kegiatan Mahasiswa Kelas Kami
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Beragam aktivitas pembelajaran dan pengembangan diri yang dirancang untuk 
        meningkatkan kompetensi akademik dan soft skill mahasiswa.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activitiesList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};