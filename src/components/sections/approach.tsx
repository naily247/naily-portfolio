import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const principles = [
  ['Clean architecture', 'Structure that remains understandable as a product grows.'],
  ['Good UX', 'Interfaces that make the next action clear and respect the user’s time.'],
  ['Performance', 'Fast, responsive experiences treated as a product requirement.'],
  ['Edge cases', 'Loading, empty, error, permissions, responsiveness, and recovery considered early.'],
];

export function Approach() {
  return (
    <section id="approach" className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="How I build"
          title="Quality comes from the decisions users may never consciously notice."
          description="I consider a project complete when it fulfills its intended scope, meets its requirements, and reaches the quality expected of the product."
        />
        <div className="mt-16 divide-y divide-foreground/10 border-y border-foreground/10">
          {principles.map(([title, description], index) => (
            <div key={title} className="grid gap-5 py-8 sm:grid-cols-[80px_0.75fr_1.25fr] sm:items-start">
              <span className="text-xs font-semibold text-accent">0{index + 1}</span>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="max-w-2xl leading-7 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
