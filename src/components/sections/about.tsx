import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';

const traits = ['Product-minded', 'UX-oriented', 'Architecture-focused', 'Detail-oriented'];

export function About() {
  return (
    <section id="about" className="border-y border-foreground/10 bg-surface py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="I care about the whole product, not only the code that makes it run."
          description="My work sits at the intersection of product thinking, user experience, architecture, and implementation. I aim to make every inclusion reasonable, every interaction useful, and every edge case considered."
        />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {traits.map((trait, index) => (
            <div key={trait} className="rounded-3xl border border-foreground/10 bg-background/60 p-6">
              <span className="text-xs text-accent">0{index + 1}</span>
              <p className="mt-12 text-lg font-medium text-foreground">{trait}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
