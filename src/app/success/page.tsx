import SuccessContent from "@/components/SuccessContent";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading success page...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
