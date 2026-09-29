"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Split from "@/components/ui/Split";
import type { StationId } from "@/components/ui/stack-machine-3d";
import StackExpand from "@/components/StackExpand";
import { useI18n } from "@/lib/i18n";

export default function Skills() {
  const { t } = useI18n();
  const [active, setActive] = useState<StationId>("engine");

  function pick(id: StationId) {
    setActive(id);
    window.__machine?.focusStation(id);
  }

  return (
    <section id="skills" className="skills section">
      <div className="section-watermark" aria-hidden="true">
        {t.skills.watermark}
      </div>
      <SectionTitle
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        text={t.skills.text}
      />

      <div className="container stack-wide">
        <div className="stack-banner" data-reveal>
          <div>
            <span className="stack-banner-label">{t.skills.bannerLabel}</span>
            <Split as="h3" text={t.skills.bannerTitle} />
          </div>
          <p>{t.skills.bannerText}</p>
        </div>

        <StackExpand active={active} onStation={setActive} onPick={pick} />
      </div>
    </section>
  );
}
