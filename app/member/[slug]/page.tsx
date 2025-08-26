import { member } from "#site/content";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  ExternalLink, 
  User, 
  Calendar, 
  BookOpen,
  MapPin,
  Mail,
  Phone,
  Trophy,
  Star,
  Heart,
  Eye,
  Share2,
  Download,
  Briefcase,
  GraduationCap,
  Clock,
  Award,
  Activity
} from "lucide-react";
import { InstagramIcon } from "lucide-react";
import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import { MDXContent } from "@/components/mdx-content";
import { Metadata } from "next";

const socialIcon = (socialName: string) => {
  switch (socialName) {
    case "LinkedIn":
      return <LinkedInIcon className="w-5 h-5" />;
    case "Github":
      return <GithubIcon className="w-5 h-5" />;
    case "X":
      return <XIcon className="w-5 h-5" />;
    case "Instagram":
      return <InstagramIcon className="w-5 h-5" />;
    default:
      return <ExternalLink className="w-5 h-5" />;
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { 
    day: 'numeric',
    month: 'long', 
    year: 'numeric' 
  });
};

const calculateAge = (birthDate?: string) => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

interface MemberDetailPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata dynamically based on the member data
export async function generateMetadata({ params }: MemberDetailPageProps): Promise<Metadata> {
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug || "";
  const memberData = member.find((m) => m.slugAsParams === slug);

  if (!memberData) {
    return {
      title: "Member Not Found | Kelas Internasional D4 Manajemen Informatika UNESA",
      description: "The requested member profile could not be found.",
    };
  }

  const fullName = `${memberData.firstName} ${memberData.lastName}`;
  const nickname = memberData.nickname ? ` "${memberData.nickname}"` : '';
  const position = memberData.position || 'Mahasiswa';

  return {
    title: `${fullName}${nickname} - ${position} | Kelas Internasional D4 Manajemen Informatika UNESA`,
    description: `Profil ${fullName}, ${position} Kelas Internasional D4 Manajemen Informatika UNESA. ${memberData.bio || `Mahasiswa ${memberData.department} semester ${memberData.semester}.`}`,
    keywords: [
      fullName,
      memberData.firstName,
      memberData.lastName,
      memberData.nickname,
      position,
      memberData.department,
      "Kelas Internasional",
      "D4 Manajemen Informatika",
      "UNESA",
      "Profil Mahasiswa",
      memberData.studentId,
      ...(memberData.hobbies || []),
      ...(memberData.skills?.map(skill => skill.name) || [])
    ].filter((keyword): keyword is string => Boolean(keyword)),
    authors: [
      {
        name: fullName,
      }
    ],
    openGraph: {
      title: `${fullName}${nickname} - ${position}`,
      description: `Profil ${fullName}, ${position} Kelas Internasional D4 Manajemen Informatika UNESA. ${memberData.bio || `Mahasiswa ${memberData.department} semester ${memberData.semester}.`}`,
      type: "profile",
      locale: "id_ID",
      url: `https://kelas-internasional-d4-mi-unesa.vercel.app/member/${slug}`,
      siteName: "Kelas Internasional D4 Manajemen Informatika UNESA",
      images: [
        {
          url: memberData.imageUrl || "https://your-domain.com/default-member-og.jpg",
          width: 1200,
          height: 630,
          alt: `${fullName} - ${position}`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@unesa_official",
      creator: "@kelas_internasional_d4_mi_unesa",
      title: `${fullName}${nickname} - ${position}`,
      description: `Profil ${fullName}, ${position} Kelas Internasional D4 Manajemen Informatika UNESA. ${memberData.bio || `Mahasiswa ${memberData.department} semester ${memberData.semester}.`}`,
      images: [
        memberData.imageUrl || "https://your-domain.com/default-member-og.jpg",
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
      canonical: `https://kelas-internasional-d4-mi-unesa.vercel.app/member/${slug}`,
    },
    category: "education",
    other: {
      'profile:first_name': memberData.firstName,
      'profile:last_name': memberData.lastName,
      'profile:username': memberData.nickname || memberData.studentId,
    },
  };
}

// Generate static params for all members
export async function generateStaticParams() {
  return member.map((memberData) => ({
    slug: memberData.slugAsParams, // This should return an array for [...slug]
  }));
}

export default function MemberDetailPage({ params }: MemberDetailPageProps) {
  const slug = params.slug
  const memberData = member.find((m) => m.slugAsParams === slug);

  if (!memberData) {
    notFound();
  }

  const age = calculateAge(memberData.birthDate);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-8">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/member">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Member
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Profile Card */}
              <Card className="overflow-hidden shadow-lg bg-gradient-to-b from-primary/5 to-transparent border-primary/10">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-6">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/10 rounded-full blur opacity-50"></div>
                    <Avatar className="w-40 h-40 relative border-4 border-primary/30 shadow-xl">
                      <AvatarImage 
                        src={memberData.imageUrl} 
                        alt={`${memberData.firstName} ${memberData.lastName}`}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                        {memberData.firstName[0]}{memberData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {memberData.isActive && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-background rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">
                    {memberData.firstName}{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {memberData.lastName}
                    </span>
                  </CardTitle>
                  
                  {memberData.nickname && (
                    <Badge variant="secondary" className="w-fit mx-auto mt-2 bg-primary/10 text-primary border-primary/20">
                      "{memberData.nickname}"
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-center gap-2 mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-mono bg-primary/20 text-primary px-3 py-1 rounded-full font-semibold">
                      {memberData.studentId}
                    </span>
                  </div>

                  {memberData.position && (
                    <div className="flex items-center justify-center gap-2 mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {memberData.position}
                      </span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-3">
                    {memberData.department && (
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span className="font-medium">Jurusan:</span>
                        <span className="text-muted-foreground truncate">{memberData.department}</span>
                      </div>
                    )}
                    
                    {memberData.semester && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="font-medium">Semester:</span>
                        <span className="text-muted-foreground truncate">{memberData.semester}</span>
                      </div>
                    )}

                    {memberData.birthPlace && memberData.birthDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">TTL:</span>
                        <span className="text-muted-foreground truncate">
                          {memberData.birthPlace}, {formatDate(memberData.birthDate)}
                          {age && ` (${age} tahun)`}
                        </span>
                      </div>
                    )}

                    {memberData.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="font-medium">Email:</span>
                        <span className="text-muted-foreground truncate">{memberData.email}</span>
                      </div>
                    )}

                    {memberData.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="font-medium">Phone:</span>
                        <span className="text-muted-foreground truncate">{memberData.phone}</span>
                      </div>
                    )}
                  </div>

                  {memberData.bio && (
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                        <BookOpen className="w-4 h-4" />
                        Bio
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {memberData.bio}
                      </p>
                    </div>
                  )}

                  {memberData.hobbies && memberData.hobbies.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Hobi & Minat</h4>
                      <div className="flex flex-wrap gap-2">
                        {memberData.hobbies.map((hobby, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                          >
                            {hobby}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {memberData.socialNetworks && memberData.socialNetworks.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Connect With Me</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {memberData.socialNetworks.map(({ name, url }, index) => (
                          <Link
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all group"
                          >
                            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              {socialIcon(name)}
                            </div>
                            <div className="flex-1">
                              <span className="font-medium">{name}</span>
                              <p className="text-xs text-muted-foreground">Follow me on {name}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills Progress */}
                  {memberData.skills && memberData.skills.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Skill Level</h4>
                      <div className="space-y-4">
                        {memberData.skills.map((skill, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">{skill.name}</span>
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Contact Card */}
              <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-primary">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {memberData.email && (
                    <Button className="w-full gap-2" size="sm" asChild>
                      <Link href={`mailto:${memberData.email}`}>
                        <Mail className="w-4 h-4" />
                        Send Message
                      </Link>
                    </Button>
                  )}
                  {memberData.phone && (
                    <Button variant="outline" className="w-full gap-2" size="sm" asChild>
                      <Link href={`tel:${memberData.phone}`}>
                        <Phone className="w-4 h-4" />
                        Call Now
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* About Section */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="w-5 h-5 text-primary" />
                    Tentang {memberData.firstName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none p-6">
                  <MDXContent code={memberData.body} />
                </CardContent>
              </Card>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary mb-1">
                    {memberData.hobbies?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Hobi & Minat</p>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Share2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary mb-1">
                    {memberData.socialNetworks?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Social Networks</p>
                </Card>

                <Card className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary mb-1">
                    {memberData.achievements?.length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </Card>
              </div>

              {/* Achievements Section */}
              {memberData.achievements && memberData.achievements.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-primary" />
                      Prestasi & Pencapaian
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {memberData.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <Trophy className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Activities Timeline */}
              {memberData.activities && memberData.activities.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {memberData.activities.map((activity, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            {activity.description && (
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{formatDate(activity.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Joined the class</p>
                          <p className="text-sm text-muted-foreground">
                            {memberData.joinDate ? formatDate(memberData.joinDate) : '2 weeks ago'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-2 h-2 bg-primary/50 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Updated profile information</p>
                          <p className="text-sm text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Similar Members */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Members</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Other classmates with similar interests
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {member
                      .filter(m => m.slug !== memberData.slug)
                      .slice(0, 3)
                      .map((similarMember, index) => (
                      <Link
                        key={index}
                        href={`/member/${similarMember.slugAsParams}`}
                        className="flex flex-col items-center p-4 rounded-lg border hover:border-primary transition-colors group"
                      >
                        <Avatar className="w-16 h-16 mb-2 group-hover:scale-105 transition-transform">
                          <AvatarImage src={similarMember.imageUrl} />
                          <AvatarFallback>
                            {similarMember.firstName[0]}{similarMember.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-medium text-center">
                          {similarMember.firstName} {similarMember.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {similarMember.position || similarMember.hobbies?.[0] || 'Student'}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}