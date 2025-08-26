import { member } from "#site/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MemberCard from "@/components/member-card";

export default function MemberSection() {
  // Filter dan sort member, limit 8
  const displayedMembers = member
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .slice(0, 8);

  const hasMoreMembers = member.length > 8;

  return (
    <section id="member" className="container lg:w-[75%] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Member
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Anggota Kelas
        </h2>
        <Link href="/member">
          <Button 
            variant="outline" 
            className="group"
          >
            Lihat Semua Member
            <span className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedMembers.map((memberData) => (
          <MemberCard 
            key={memberData.slug} 
            memberData={memberData} 
          />
        ))}
      </div>

      {hasMoreMembers && (
        <div className="text-center mt-12">
          <Link href="/member">
            <Button 
              variant="default" 
              size="lg"
              className="group"
            >
              Jelajahi Semua Member
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}