"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface TestimonialProps {
  image: string;
  name: string;
  position: string;
  subject: string;
  comment: string;
  rating: number;
}

const testimonialList: TestimonialProps[] = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Ahmad Fauzi, M.Kom",
    position: "Dosen Pemrograman Web",
    subject: "Mata Kuliah: Pemrograman Web",
    comment: "Kelas ini menunjukkan antusiasme luar biasa dalam pembelajaran. Mahasiswa sangat aktif bertanya dan mampu mengerjakan proyek-proyek web yang kompleks dengan kreativitas tinggi.",
    rating: 5.0,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b194?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Sari Indrawati, M.T",
    position: "Dosen Basis Data",
    subject: "Mata Kuliah: Basis Data",
    comment: "Kemampuan analisis dan pemecahan masalah mahasiswa di kelas ini sangat mengesankan. Mereka mampu mendesain database yang efisien dan memahami konsep normalisasi dengan baik.",
    rating: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Prof. Budi Santoso, Ph.D",
    position: "Dosen Algoritma",
    subject: "Mata Kuliah: Algoritma & Struktur Data",
    comment: "Mahasiswa kelas ini memiliki kemampuan berpikir logis yang tajam. Mereka tidak hanya menghafal algoritma, tetapi juga memahami kapan dan mengapa menggunakan algoritma tertentu.",
    rating: 5.0,
  },
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Maya Sari, M.Kom",
    position: "Dosen Keamanan Informasi",
    subject: "Mata Kuliah: Keamanan Informasi",
    comment: "Kesadaran akan pentingnya keamanan siber di kelas ini sangat tinggi. Mahasiswa selalu update dengan tren keamanan terbaru dan mampu mengimplementasikan solusi keamanan yang tepat.",
    rating: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Rizki Pratama, M.T",
    position: "Dosen Jaringan Komputer",
    subject: "Mata Kuliah: Jaringan Komputer",
    comment: "Kelas ini menunjukkan pemahaman mendalam tentang infrastruktur jaringan. Kemampuan troubleshooting dan konfigurasi jaringan mahasiswa sangat memuaskan.",
    rating: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    name: "Dr. Lia Rahmawati, M.Kom",
    position: "Dosen Mobile Development",
    subject: "Mata Kuliah: Pemrograman Mobile",
    comment: "Kreativitas dalam mengembangkan aplikasi mobile di kelas ini luar biasa. Mahasiswa tidak hanya fokus pada coding, tetapi juga mempertimbangkan user experience yang baik.",
    rating: 5.0,
  },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex gap-1 pb-6">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={i} className="size-4 fill-primary text-primary" />
      ))}
      {hasHalfStar && <Star className="size-4 fill-primary/50 text-primary" />}
      {Array.from({ length: 5 - Math.ceil(rating) }, (_, i) => (
        <Star key={`empty-${i}`} className="size-4 text-muted-foreground" />
      ))}
    </div>
  );
};

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Testimoni
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Kata Dosen Tentang Kelas Kami
        </h2>
        
        <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
          Pendapat dan penilaian dari para dosen pengajar terhadap kualitas 
          dan antusiasme mahasiswa di kelas kami.
        </h3>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-[80%] sm:w-[90%] lg:max-w-screen-xl mx-auto"
      >
        <CarouselContent>
          {testimonialList.map((testimonial) => (
            <CarouselItem
              key={testimonial.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-background hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                <CardContent className="pt-6 pb-0">
                  {renderStars(testimonial.rating)}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1]?.[0] || ''}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="font-medium">
                        {testimonial.position}
                      </CardDescription>
                      <CardDescription className="text-sm text-primary/70">
                        {testimonial.subject}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};