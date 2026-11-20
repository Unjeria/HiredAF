"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Users } from "lucide-react";

type Candidate = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  source: string | null;
  summary: string | null;
  created_at: string;
};

export default function CandidateDirectory({ candidates }: { candidates: Candidate[] }) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");

  const sources = useMemo(
    () => [...new Set(candidates.map((candidate) => candidate.source).filter((value): value is string => Boolean(value)))].sort(),
    [candidates],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const matchesSource = source === "all" || candidate.source === source;
      const searchable = [candidate.full_name, candidate.email, candidate.phone, candidate.location, candidate.source, candidate.summary]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesSource && (!normalized || searchable.includes(normalized));
    });
  }, [candidates, query, source]);

  return (
    <section className="rounded-3xl border border-black/10 bg-white p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">Talent pool</h2>
          <p className="mt-1 text-sm text-[#77796F]">Search and filter the people saved by your team.</p>
        </div>
        <span className="rounded-full bg-[#F0F8E2] px-3 py-1.5 text-xs font-bold text-[#557A24]">
          {filtered.length} of {candidates.length} shown
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_210px]">
        <label className="relative block">
          <span className="sr-only">Search candidates</span>
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#92948A]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, skills, location..."
            className="w-full rounded-xl border border-black/15 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#86B52F]"
          />
        </label>
        <label className="relative block">
          <span className="sr-only">Filter by source</span>
          <SlidersHorizontal size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#92948A]" />
          <select value={source} onChange={(event) => setSource(event.target.value)} className="w-full appearance-none rounded-xl border border-black/15 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#86B52F]">
            <option value="all">All sources</option>
            {sources.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      {filtered.length ? (
        <div className="mt-5 divide-y divide-black/10">
          {filtered.map((candidate) => (
            <article key={candidate.id} className="flex gap-4 py-5 first:pt-1">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F0F8E2] text-sm font-black text-[#557A24]">
                {candidate.full_name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold">{candidate.full_name}</h3>
                <p className="mt-1 break-all text-sm text-[#77796F]">
                  {[candidate.email, candidate.phone, candidate.location].filter(Boolean).join(" · ") || "No contact details yet"}
                </p>
                {candidate.summary && <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#686A61]">{candidate.summary}</p>}
                <div className="mt-2 flex flex-wrap gap-2">
                  {candidate.source && <span className="rounded-full bg-[#F7F7F2] px-3 py-1 text-xs font-semibold">{candidate.source}</span>}
                  <span className="rounded-full bg-[#F7F7F2] px-3 py-1 text-xs text-[#77796F]">Added {new Date(candidate.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-[#F7F7F2] p-8 text-center">
          <Users size={22} className="mx-auto text-[#92948A]" />
          <p className="mt-3 font-semibold">{candidates.length ? "No candidates match those filters" : "Your talent pool is empty"}</p>
          <p className="mt-1 text-sm text-[#77796F]">{candidates.length ? "Try a different search or clear the source filter." : "Add your first candidate to start building a shortlist."}</p>
          {(query || source !== "all") && <button type="button" onClick={() => { setQuery(""); setSource("all"); }} className="mt-4 text-sm font-bold underline underline-offset-4">Clear filters</button>}
        </div>
      )}
    </section>
  );
}
