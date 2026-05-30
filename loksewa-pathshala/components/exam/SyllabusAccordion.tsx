import { Exam } from '@/data/exams';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export function SyllabusAccordion({ exam }: { exam: Exam }): JSX.Element {
  return (
    <Accordion>
      {exam.papers.map((paper, index) => (
        <AccordionItem defaultOpen={index === 0} key={`${exam.slug}-${paper.number}`} title={`${paper.name} · ${paper.totalMarks} marks · ${paper.duration}`}>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge className="border-none bg-white/10 text-text">Paper {paper.number}</Badge>
            <Badge className="border-none bg-white/10 text-muted">{paper.type}</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {paper.topics.map((topic) => (
              <div className="rounded-2xl border border-border bg-black/10 p-4" key={topic.title}>
                <p className="font-medium text-text">{topic.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {topic.subtopics.map((subtopic) => (
                    <li className="flex items-start gap-2" key={subtopic}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{subtopic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
}