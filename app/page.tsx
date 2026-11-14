import { redirect } from "next/navigation";
import { CONFIG } from "@/lib/contig";

export default function Home() {
  redirect(CONFIG.ROUTES.LOGIN);
}
