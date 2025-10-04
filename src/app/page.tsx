
"use client";

import { useEffect, useRef, useActionState } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToMainSite() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/main-site');
  }, [router]);

  return null;
}
