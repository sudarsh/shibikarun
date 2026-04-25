import nextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const Studio = nextDynamic(() => import("./Studio"), { ssr: false });

export default function StudioPage() {
  return <Studio />;
}
