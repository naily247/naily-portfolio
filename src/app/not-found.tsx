import Link from 'next/link';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center py-32">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="mt-6 max-w-3xl font-serif text-6xl leading-none tracking-[-0.05em] text-foreground sm:text-8xl">This route reached an edge case.</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">Fortunately, this one has a recovery path.</p>
        <Link href="/" className="mt-9 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background">Return home</Link>
      </Container>
    </main>
  );
}
