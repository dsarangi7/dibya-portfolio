import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-grain flex min-h-svh items-center px-6 sm:px-10 lg:pr-16 lg:pl-40">
      <div className="mx-auto w-full max-w-[1096px]">
        <p className="font-mono text-sm tracking-[0.3em] text-primary uppercase">404 / signal lost</p>
        <h1 className="mt-6 max-w-3xl text-5xl leading-tight font-medium tracking-tight text-title sm:text-7xl">
          This page isn&apos;t on the map.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-body">The link may be incomplete, or the page may have moved.</p>
        <Link href="/" className="accent-link mt-10 inline-block text-lg text-title">
          ← Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
