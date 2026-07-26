import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 bg-neutral-900 text-white">
      
      <div>
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-400">
          New Collection 2026
        </p>

        <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
          Minimal Streetwear.
          <br />
          Built for Everyday.
        </h1>

        <p className="mt-8 max-w-lg text-lg leading-8 text-gray-400">
          Discover timeless essentials inspired by Korean fashion,
          designed with clean silhouettes and premium materials.
        </p>

      </div>

      <div className="relative h-[650px]">
        <Image
          src="/images/hero.jpg"
          alt="Fashion Model"
          fill
          priority
          className="rounded-3xl object-cover"
        />
      </div>
    </section>
  );
}