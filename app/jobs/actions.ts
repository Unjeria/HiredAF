"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireActiveSubscription, requirePlanCapacity } from "@/lib/billing-access";

export async function createJob(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const department = String(formData.get("department") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const employmentType = String(formData.get("employmentType") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();
  const status = formData.get("status") === "open" ? "open" : "draft";
  if (title.length < 2) redirect("/jobs?error=Add%20a%20job%20title");

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims) redirect("/login");
  const { data: membership } = await supabase.from("organization_members").select("organization_id,role").order("created_at",{ascending:true}).limit(1).maybeSingle();
  if (!membership || !["owner","admin","recruiter"].includes(membership.role)) redirect("/dashboard?error=You%20do%20not%20have%20permission%20to%20create%20jobs");
  await requireActiveSubscription(membership.organization_id, "/jobs");
  if (status === "open") await requirePlanCapacity(membership.organization_id, "openJobs", "/jobs");

  const { error } = await supabase.from("jobs").insert({
    organization_id: membership.organization_id,
    title, department: department || null, location: location || null,
    employment_type: employmentType || null, description: description || null,
    requirements: requirements || null, status, created_by: auth.claims.sub,
  });
  if (error) redirect("/jobs?error=Could%20not%20save%20this%20job");
  revalidatePath("/jobs"); revalidatePath("/dashboard"); redirect("/jobs?success=Job%20created");
}

export async function updateJobStatus(formData: FormData) {
  const id = String(formData.get("jobId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["draft","open","paused","closed"].includes(status)) redirect("/jobs?error=Invalid%20job%20update");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims(); if (!auth?.claims) redirect("/login");
  const { data: membership } = await supabase.from("organization_members").select("organization_id,role").order("created_at",{ascending:true}).limit(1).maybeSingle();
  if (!membership) redirect("/dashboard");
  if (!["owner","admin","recruiter"].includes(membership.role)) redirect("/dashboard?error=You%20cannot%20update%20jobs");
  await requireActiveSubscription(membership.organization_id, "/jobs");
  const { error } = await supabase.from("jobs").update({status: status as "draft"|"open"|"paused"|"closed",updated_at:new Date().toISOString()}).eq("id",id).eq("organization_id",membership.organization_id);
  if(error) redirect("/jobs?error=Could%20not%20update%20job");
  revalidatePath("/jobs"); revalidatePath("/dashboard"); redirect("/jobs?success=Job%20updated");
}
