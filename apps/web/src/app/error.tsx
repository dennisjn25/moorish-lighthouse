"use client";
import Link from "next/link";
import { Container } from "@/components/ui";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="route-error">
      <Container size="narrow">
        <p className="eyebrow">Page unavailable</p>
        <h1>The light reached a temporary obstruction.</h1>
        <p>
          Try loading this page again. If the problem continues, return to the
          home page.
        </p>
        <div className="button-group">
          <button
            className="button button--primary"
            onClick={reset}
            type="button"
          >
            Try again
          </button>
          <Link className="button button--secondary" href="/">
            Return home
          </Link>
        </div>
      </Container>
    </section>
  );
}
