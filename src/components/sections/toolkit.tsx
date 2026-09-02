import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const groups = [
  { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive UI'] },
  { title: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Validation'] },
  { title: 'Data', items: ['PostgreSQL', 'MongoDB', 'Prisma', 'SQL', 'Schema design'] },
  { title: 'Workflow', items: ['Git', 'Testing', 'Docker', 'Vercel', 'Accessibility'] },
];

export function Toolkit() {
  return (
    <section id="toolkit" className="bg-surface py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="Toolkit" title="Technologies are tools. The product decisions around them matter more." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title} className="bg-surface p-7 sm:p-8">
              <h3 className="font-semibold text-foreground">{group.title}</h3>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
