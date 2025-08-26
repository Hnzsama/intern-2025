import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface SubjectProps {
  icon: string;
  title: string;
  description: string;
  credits: string;
  semester: "Semester 1" | "Semester 2" | "Semester 3" | "Semester 4";
  topics: string[];
}

const subjectList: SubjectProps[] = [
  {
    icon: "Code",
    title: "Pemrograman Web",
    description: "Mata kuliah yang membahas pengembangan aplikasi web menggunakan teknologi front-end dan back-end modern.",
    credits: "3 SKS",
    semester: "Semester 2",
    topics: ["HTML/CSS/JavaScript", "Framework React.js", "Node.js & Express", "Database Integration"]
  },
  {
    icon: "Database",
    title: "Basis Data",
    description: "Mempelajari konsep, desain, dan implementasi sistem basis data relational dan non-relational.",
    credits: "3 SKS",
    semester: "Semester 3",
    topics: ["Database Design", "SQL & NoSQL", "Database Normalization", "Query Optimization"]
  },
  {
    icon: "Network",
    title: "Jaringan Komputer",
    description: "Memahami konsep jaringan komputer, protokol komunikasi, dan administrasi jaringan.",
    credits: "3 SKS",
    semester: "Semester 4",
    topics: ["Network Topology", "TCP/IP Protocol", "Network Security", "Network Administration"]
  },
  {
    icon: "Cpu",
    title: "Algoritma & Struktur Data",
    description: "Mata kuliah fundamental yang mengajarkan algoritma efisien dan struktur data yang optimal.",
    credits: "4 SKS",
    semester: "Semester 2",
    topics: ["Sorting & Searching", "Tree & Graph", "Dynamic Programming", "Big O Notation"]
  },
  {
    icon: "Smartphone",
    title: "Pemrograman Mobile",
    description: "Pengembangan aplikasi mobile untuk platform Android dan iOS menggunakan teknologi terkini.",
    credits: "3 SKS",
    semester: "Semester 4",
    topics: ["Android Development", "React Native", "Mobile UI/UX", "App Store Deployment"]
  },
  {
    icon: "Shield",
    title: "Keamanan Informasi",
    description: "Mempelajari konsep keamanan sistem informasi dan teknik-teknik proteksi data.",
    credits: "3 SKS",
    semester: "Semester 3",
    topics: ["Cryptography", "Network Security", "System Hardening", "Incident Response"]
  }
];

const getSemesterBadgeVariant = (semester: string) => {
  switch (semester) {
    case "Semester 1":
      return "secondary";
    case "Semester 2":
      return "default";
    case "Semester 3":
      return "outline";
    case "Semester 4":
      return "destructive";
    default:
      return "outline";
  }
};

export const SubjectsSection = () => {
  return (
    <section id="subjects" className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Mata Kuliah
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Mata Kuliah di Kelas Kami
        </h2>
        <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
          Kurikulum yang dirancang sistematis untuk memberikan pemahaman mendalam 
          tentang teknologi informasi dan pengembangan software.
        </h3>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectList.map(({ icon, title, description, credits, semester, topics }) => (
          <Card
            key={title}
            className="bg-background hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-primary/20 p-3 rounded-full ring-8 ring-primary/10">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>
                <div className="text-right">
                  <Badge variant={getSemesterBadgeVariant(semester)} className="mb-1">
                    {semester}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{credits}</div>
                </div>
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                  Pokok Bahasan:
                </h4>
                <ul className="space-y-2">
                  {topics.map((topic, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Icon
                        name="CircleCheck"
                        size={16}
                        color="hsl(var(--primary))"
                        className="text-primary mr-2 flex-shrink-0"
                      />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};