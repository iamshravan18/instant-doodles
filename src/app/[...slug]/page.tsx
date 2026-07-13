import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageTemplate } from "@/components/page-template";
import { allPages, pageByPath, pageMetadata } from "@/lib/site";

export const dynamicParams = false;

interface RouteProps { params: Promise<{ slug: string[] }> }

export function generateStaticParams() { return allPages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pageByPath.get(slug.join("/"));
  return page ? pageMetadata(page) : {};
}

export default async function MarketingPage({ params }: RouteProps) {
  const { slug } = await params;
  const page = pageByPath.get(slug.join("/"));
  if (!page) notFound();
  return <PageTemplate page={page} />;
}
