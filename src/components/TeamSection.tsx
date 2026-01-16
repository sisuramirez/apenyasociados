"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Briefcase, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
  key: "marlon" | "rocio";
  image: string;
  credentialType: "accreditations" | "experience";
}

const teamMembers: TeamMember[] = [
  { key: "marlon", image: "/assets/marlon-apen.webp", credentialType: "accreditations" },
  { key: "rocio", image: "/assets/rocio-solis.webp", credentialType: "experience" },
];

interface MemberData {
  name: string;
  role: string;
  bio: string;
  credentials: string[];
}

interface TeamCardProps {
  member: TeamMember;
  data: MemberData;
  onExpand: () => void;
}

function TeamCard({ member, data, onExpand }: TeamCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={onExpand}
    >
      {/* Image Container */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={member.image}
          alt={data.name}
          fill
          className="object-cover object-[center_15%] transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17383F]/90 via-[#17383F]/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white mb-1">{data.name}</h3>
        <p className="text-[#12ACA4] font-medium mb-4">{data.role}</p>
        <button className="inline-flex items-center gap-2 text-white font-medium text-sm bg-[#12ACA4] px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#0e918a] group-hover:translate-x-1">
          {t.team.viewProfile}
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

interface ProfileModalProps {
  member: TeamMember;
  data: MemberData;
  onClose: () => void;
}

function ProfileModal({ member, data, onClose }: ProfileModalProps) {
  const { t } = useLanguage();
  const credentialLabel =
    member.credentialType === "accreditations"
      ? t.team.accreditations
      : t.team.experience;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto md:overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg transition-colors hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full h-[550px] md:w-2/5 md:h-auto md:min-h-[500px]">
            <Image
              src={member.image}
              alt={data.name}
              fill
              className="object-cover object-[center_15%] md:object-top"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-8 md:overflow-y-auto md:max-h-[500px]">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#17383F] mb-2">
                {data.name}
              </h2>
              <p className="text-[#12ACA4] font-semibold text-lg">
                {data.role}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{data.bio}</p>

            {/* Credentials */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                {member.credentialType === "accreditations" ? (
                  <Award className="w-5 h-5 text-[#12ACA4]" />
                ) : (
                  <Briefcase className="w-5 h-5 text-[#12ACA4]" />
                )}
                <h3 className="text-lg font-bold text-[#17383F]">
                  {credentialLabel}
                </h3>
              </div>
              <ul className="space-y-3">
                {data.credentials.map((credential, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#12ACA4] mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{credential}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection() {
  const { t } = useLanguage();
  const [expandedMember, setExpandedMember] = useState<TeamMember | null>(null);

  const getMemberData = (key: "marlon" | "rocio"): MemberData => {
    return t.team.members[key] as MemberData;
  };

  return (
    <>
      <section id="equipo" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-[#17383F] text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.team.title}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {teamMembers.map((member) => (
              <TeamCard
                key={member.key}
                member={member}
                data={getMemberData(member.key)}
                onExpand={() => setExpandedMember(member)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Portal */}
      <AnimatePresence>
        {expandedMember && (
          <ProfileModal
            member={expandedMember}
            data={getMemberData(expandedMember.key)}
            onClose={() => setExpandedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
