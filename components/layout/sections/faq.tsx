import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Apa itu Kelas Internasional Manajemen Informatika?",
    answer: "Kelas Internasional Manajemen Informatika adalah program studi yang menggabungkan ilmu manajemen dengan teknologi informasi, dengan kurikulum berstandar internasional dan penggunaan bahasa Inggris sebagai bahasa pengantar.",
    value: "item-1",
  },
  {
    question: "Apa saja persyaratan masuk ke kelas internasional ini?",
    answer:
      "Persyaratan meliputi nilai akademik yang baik, kemampuan bahasa Inggris (TOEFL/IELTS), tes masuk khusus, dan wawancara. Kandidat juga harus menunjukkan minat yang kuat terhadap teknologi informasi dan manajemen.",
    value: "item-2",
  },
  {
    question:
      "Bagaimana kurikulum kelas internasional berbeda dengan kelas reguler?",
    answer:
      "Kurikulum menggunakan standar internasional dengan mata kuliah diajarkan dalam bahasa Inggris, ada program pertukaran mahasiswa, sertifikasi internasional, dan kolaborasi dengan universitas luar negeri.",
    value: "item-3",
  },
  {
    question: "Apakah ada program magang atau kerja sama industri?",
    answer: "Ya, kami memiliki kerja sama dengan berbagai perusahaan multinasional untuk program magang, project-based learning, dan kesempatan karir langsung setelah lulus.",
    value: "item-4",
  },
  {
    question:
      "Bagaimana prospek karir lulusan Kelas Internasional Manajemen Informatika?",
    answer: "Lulusan dapat berkarir sebagai IT Manager, Business Analyst, Project Manager, Digital Transformation Consultant, atau melanjutkan studi S2 di universitas ternama dalam dan luar negeri.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Pertanyaan Umum
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};