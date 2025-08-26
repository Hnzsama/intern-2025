import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, Crown, Shield, Briefcase, Users } from "lucide-react";

const socialIcon = (socialName: string) => {
  switch (socialName) {
    case "LinkedIn":
      return <LinkedInIcon />;
    case "Github":
      return <GithubIcon />;
    case "X":
      return <XIcon />;
    case "Instagram":
      return <InstagramIcon />;
    default:
      return null;
  }
};

const getPositionIcon = (position: string) => {
  if (position.includes("Ketua")) return <Crown className="w-3 h-3" />;
  if (position.includes("Sekretaris") || position.includes("Bendahara")) return <Shield className="w-3 h-3" />;
  if (position.includes("Koordinator")) return <Briefcase className="w-3 h-3" />;
  return <Users className="w-3 h-3" />;
};

const getPositionColor = (position: string) => {
  if (position.includes("Ketua")) return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
  if (position.includes("Sekretaris") || position.includes("Bendahara")) return "bg-blue-500/10 hover:bg-blue-600 text-blue-700 dark:text-blue-400 border-blue-500/20";
  if (position.includes("Koordinator")) return "bg-green-500/10 hover:bg-green-600 text-green-700 dark:text-green-400 border-green-500/20";
  return "bg-gray-500/10 hover:bg-gray-600 text-gray-700 dark:text-gray-400 border-gray-500/20";
};

interface MemberCardProps {
  memberData: {
    slug: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
    studentId: string;
    nickname?: string;
    position?: string;
    bio?: string;
    hobbies?: string[];
    socialNetworks?: Array<{
      name: string;
      url: string;
    }>;
    slugAsParams: string;
  };
  showBio?: boolean;
}

export default function MemberCard({ memberData, showBio = false }: MemberCardProps) {
  return (
    <Card className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 gap-0">
        <div className="h-full overflow-hidden relative">
          <Image
            src={memberData.imageUrl}
            alt={`${memberData.firstName} ${memberData.lastName}`}
            width={300}
            height={300}
            className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
          />
          {memberData.position && (
            <div className="absolute top-2 right-2">
              <Badge className={`${getPositionColor(memberData.position)} border text-xs`}>
                <span className="mr-1">
                  {getPositionIcon(memberData.position)}
                </span>
                {memberData.position}
              </Badge>
            </div>
          )}
        </div>
        <CardTitle className="py-6 pb-4 px-6">
          <Link
            href={`/member/${memberData.slugAsParams}`}
            className="hover:underline"
          >
            {memberData.firstName}
            <span className="text-primary ml-2">
              {memberData.lastName}
            </span>
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-2 text-muted-foreground">
        <div className="space-y-2">
          {memberData.nickname && (
            <div className="inline-flex items-center gap-2">
              <span className="text-xs bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded font-medium">
                "{memberData.nickname}"
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">
              {memberData.studentId}
            </span>
          </div>
        </div>
      </CardContent>

      {showBio && memberData.bio && (
        <CardContent className="pb-4 text-sm text-muted-foreground">
          <p className="line-clamp-2">{memberData.bio}</p>
        </CardContent>
      )}

      {memberData.hobbies && memberData.hobbies.length > 0 && (
        <CardContent className="pb-6 text-muted-foreground text-sm">
          <div className="flex flex-wrap gap-1">
            {memberData.hobbies.slice(0, 3).map((hobby, index) => (
              <span
                key={index}
                className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium"
              >
                {hobby}
              </span>
            ))}
            {memberData.hobbies.length > 3 && (
              <span className="text-xs text-muted-foreground font-medium">
                +{memberData.hobbies.length - 3} lainnya
              </span>
            )}
          </div>
        </CardContent>
      )}

      <CardFooter className="space-x-4 mt-auto">
        {memberData.socialNetworks?.map(({ name, url }, index) => (
          <Link
            key={index}
            href={url}
            target="_blank"
            className="hover:opacity-80 transition-all"
            rel="noopener noreferrer"
          >
            {socialIcon(name)}
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
}