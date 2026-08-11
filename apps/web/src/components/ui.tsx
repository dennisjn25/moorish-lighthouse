import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "quiet";
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link className={`button button--${variant}`} href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} weight="regular" />
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <article className={`card ${className}`.trim()}>{children}</article>;
}

export function Container({
  children,
  className = "",
  size = "content",
}: {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "content" | "wide";
}) {
  return (
    <div className={`container container--${size} ${className}`.trim()}>
      {children}
    </div>
  );
}

export function Field({
  hint,
  label,
  ...props
}: ComponentPropsWithoutRef<"input"> & {
  hint?: string;
  label: string;
}) {
  const id = props.id ?? props.name;
  const hintId = hint && id ? `${id}-hint` : undefined;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input {...props} aria-describedby={hintId} id={id} />
      {hint ? (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: ReadonlyArray<{ href?: string; label: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              item.label
            )}
            {index < items.length - 1 ? (
              <span aria-hidden="true">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
