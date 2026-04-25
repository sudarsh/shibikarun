import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./Studio"), { ssr: false });

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return <Studio />;
}
