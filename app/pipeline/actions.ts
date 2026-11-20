"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireActiveSubscription } from "@/lib/billing-access";

export async function updateApplicationStatus(formData: FormData) {
  const applicationId=String(formData.get("applicationId")??"");
  const status=String(formData.get("status")??"");
  const allowed=["new","reviewing","interview","offer","hired","rejected"];
  if(!applicationId||!allowed.includes(status)) redirect("/pipeline?error=Invalid%20application%20update");
  const supabase=await createClient(); const {data:auth}=await supabase.auth.getClaims(); if(!auth?.claims) redirect("/login");
  const {data:membership}=await supabase.from("organization_members").select("organization_id,role").order("created_at",{ascending:true}).limit(1).maybeSingle();
  if(!membership||!["owner","admin","recruiter"].includes(membership.role)) redirect("/dashboard?error=You%20cannot%20manage%20applications");
  await requireActiveSubscription(membership.organization_id, "/pipeline");
  const {error}=await supabase.from("applications").update({status:status as "new"|"reviewing"|"interview"|"offer"|"hired"|"rejected",updated_at:new Date().toISOString()}).eq("id",applicationId).eq("organization_id",membership.organization_id);
  if(error) redirect("/pipeline?error=Could%20not%20update%20application");
  revalidatePath("/pipeline"); revalidatePath("/dashboard"); redirect("/pipeline?success=Pipeline%20updated");
}
