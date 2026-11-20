"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireActiveSubscription, requirePlanCapacity } from "@/lib/billing-access";

export async function createCandidate(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const source = String(formData.get("source") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  if (fullName.length < 1) redirect("/candidates?error=Candidate%20name%20is%20required");

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims(); if (!auth?.claims) redirect("/login");
  const { data: membership } = await supabase.from("organization_members").select("organization_id,role").order("created_at",{ascending:true}).limit(1).maybeSingle();
  if (!membership || !["owner","admin","recruiter"].includes(membership.role)) redirect("/dashboard?error=You%20do%20not%20have%20permission%20to%20add%20candidates");
  await requirePlanCapacity(membership.organization_id, "candidates", "/candidates");

  const { error } = await supabase.from("candidates").insert({
    organization_id:membership.organization_id, full_name:fullName, email:email||null,
    phone:phone||null, location:location||null, source:source||null,
    summary:summary||null, created_by:auth.claims.sub,
  });
  if(error) redirect("/candidates?error=Could%20not%20save%20candidate.%20Check%20whether%20this%20email%20already%20exists.");
  revalidatePath("/candidates"); revalidatePath("/dashboard"); revalidatePath("/pipeline");
  redirect("/candidates?success=Candidate%20added");
}

export async function addApplication(formData: FormData) {
  const jobId=String(formData.get("jobId")??""); const candidateId=String(formData.get("candidateId")??"");
  if(!jobId||!candidateId) redirect("/pipeline?error=Choose%20a%20job%20and%20candidate");
  const supabase=await createClient(); const {data:auth}=await supabase.auth.getClaims(); if(!auth?.claims) redirect("/login");
  const {data:membership}=await supabase.from("organization_members").select("organization_id,role").order("created_at",{ascending:true}).limit(1).maybeSingle();
  if(!membership||!["owner","admin","recruiter"].includes(membership.role)) redirect("/dashboard?error=You%20cannot%20manage%20applications");
  await requireActiveSubscription(membership.organization_id, "/pipeline");
  const {error}=await supabase.from("applications").insert({organization_id:membership.organization_id,job_id:jobId,candidate_id:candidateId});
  if(error) redirect("/pipeline?error=Could%20not%20add%20application.%20It%20may%20already%20exist.");
  revalidatePath("/pipeline"); revalidatePath("/dashboard"); redirect("/pipeline?success=Application%20added");
}
