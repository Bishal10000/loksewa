import Link from 'next/link';
import { exams } from '@/data/exams';
import { serviceOrder, serviceMeta } from '@/data/services';

export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#050810] px-6 py-[60px] pb-[30px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-[22px] font-extrabold tracking-tight text-[#F9FAFB]">
              Lok<span className="text-[#DC143C]">Sewa</span>
            </p>
            <p className="mt-3 text-[13px] text-[#6B7280]">लोकसेवाको सपना, हाम्रो मञ्च</p>
            <p className="mt-2 text-[12px] leading-6 text-[#4B5563]">Nepal&apos;s trusted civil service exam preparation platform.</p>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-[#F9FAFB]">Quick Links</p>
            <div className="space-y-2.5">
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/">
                Home
              </Link>
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/syllabus">
                Syllabus
              </Link>
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/notes">
                Notes
              </Link>
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/results">
                Admin
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-[#F9FAFB]">Exam Levels</p>
            <div className="space-y-2.5">
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/exams/kharidar">
                Kharidar
              </Link>
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/exams/nasu">
                Nayab Subba
              </Link>
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/exams/sakha-adhikrit">
                Sakha Adhikrit
              </Link>
              <Link className="block text-[14px] text-[#6B7280] transition hover:text-[#DC143C]" href="/exams/prabidhik-sahayak">
                Technical Posts
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[1px] text-[#F9FAFB]">Info</p>
            <div className="space-y-2 text-[13px] text-[#4B5563]">
              <p>Updated: 2081 Ashadh 20</p>
              <p>Powered by PSC Nepal</p>
              <p>© 2082 BS LokSewa Pathshala</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[rgba(255,255,255,0.04)] pt-5 text-center text-[12px] text-[#4B5563]">
          लोकसेवाको तयारीलाई एकै ठाउँमा ल्याउने polished study experience.
        </div>
      </div>
    </footer>
  );
}