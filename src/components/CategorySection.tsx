import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/category";

type Props = {
  categories: Category[];
};

export default function CategorySection({ categories }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <p className="mt-2 text-zinc-400">
          Explore every collection.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group relative h-[420px] overflow-hidden rounded-2xl"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
              <h3 className="text-2xl font-semibold">
                {category.name}
              </h3>

              <ArrowRight className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}