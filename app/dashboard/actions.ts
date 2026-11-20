"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createWorkspace(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) redirect("/dashboard?error=Workspace%20name%20must%20be%20at%20least%202%20characters");

  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims) redirect("/login");

  const { error } = await supabase.rpc("create_organization", { org_name: name });
  if (error) redirect("/dashboard?error=Could%20not%20create%20workspace");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
