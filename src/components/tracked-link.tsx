"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { type AnalyticsEvent, trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  event: AnalyticsEvent;
  eventDetail?: Record<string, string>;
}

export function TrackedLink({ event, eventDetail, onClick, ...props }: TrackedLinkProps) {
  return <Link {...props} onClick={(click) => { trackEvent(event, eventDetail); onClick?.(click); }} />;
}
