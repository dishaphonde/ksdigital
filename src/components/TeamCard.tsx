"use client";

import { useState } from "react";
import Image from "next/image";
import { Linkedin, Mail, X, ArrowRight } from "lucide-react";

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  slug: string;
  bio: string;
  shortBio?: string | null;
  photo?: string | null;
  initials: string;
  linkedinUrl?: string | null;
  email?: string | null;
}

export default function TeamCard({ member }: { member: TeamMemberData }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="glass-card p-6 flex flex-col justify-between h-full group hover:border-brand-blue/40 transition-all duration-300">
        <div>
          {/* Avatar / Photo */}
          <div className="relative mb-6 flex justify-center">
            {member.photo ? (
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-brand-blue/30 shadow-glowSm">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role} at KS Digital`}
                  fill
                  sizes="128px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-violet to-brand-blue flex items-center justify-center font-heading font-bold text-3xl text-white shadow-glowSm border-2 border-white/20">
                {member.initials}
              </div>
            )}
          </div>

          {/* Member Details */}
          <div className="text-center">
            <h3 className="font-heading text-xl font-bold text-foreground mb-1">
              {member.name}
            </h3>
            <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-3">
              {member.role}
            </p>
            <p className="text-sm text-muted line-clamp-3 leading-relaxed mb-4">
              {member.shortBio || member.bio}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={() => setModalOpen(true)}
            className="text-xs font-medium text-brand-blue hover:underline inline-flex items-center gap-1 group/btn"
          >
            Read Full Bio <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn Profile`}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-blue/20 text-muted hover:text-brand-blue flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-blue/20 text-muted hover:text-brand-blue flex items-center justify-center transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bio Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#101018] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close bio details modal"
              className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              {member.photo ? (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-brand-blue/30 shrink-0">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-violet to-brand-blue flex items-center justify-center font-heading font-bold text-2xl text-white shrink-0 shadow-glowSm">
                  {member.initials}
                </div>
              )}
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-brand-blue uppercase tracking-wider">
                  {member.role}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-muted text-sm sm:text-base leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>{member.bio}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs py-2 px-3"
                  >
                    <Linkedin className="w-3.5 h-3.5 mr-1" /> LinkedIn Profile
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="btn-secondary text-xs py-2 px-3"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1" /> Send Email
                  </a>
                )}
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="btn-primary text-xs py-2 px-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
