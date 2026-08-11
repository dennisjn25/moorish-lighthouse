import { ButtonLink, Container } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="route-error">
      <Container size="narrow">
        <p className="eyebrow">404 · Not found</p>
        <h1>This path is beyond the current chart.</h1>
        <p>
          The page may have moved, or the preview catalog may not contain this
          entry.
        </p>
        <ButtonLink href="/search">Search the lighthouse</ButtonLink>
      </Container>
    </section>
  );
}
