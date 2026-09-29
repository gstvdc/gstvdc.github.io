"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Split from "@/components/ui/Split";
import type { StationId } from "@/components/ui/stack-machine-3d";
import StackExpand from "@/components/StackExpand";

export default function Skills() {
  const [active, setActive] = useState<StationId>("engine");

  function pick(id: StationId) {
    setActive(id);
    window.__machine?.focusStation(id);
  }

  return (
    <section id="skills" className="skills section">
      <div className="section-watermark" aria-hidden="true">
        STACK
      </div>
      <SectionTitle
        eyebrow="// CAIXA DE FERRAMENTAS"
        title="Stack atual"
        text="Uma máquina que mostra as camadas que uma funcionalidade atravessa até chegar ao ar."
      />

      <div className="container stack-wide">
        <div className="stack-banner" data-reveal>
          <div>
            <span className="stack-banner-label">// FOCO ATUAL</span>
            <Split as="h3" text="SvelteKit + Laravel em aplicações corporativas reais" />
          </div>
          <p>
            Desenvolvimento e manutenção de sistemas, automações internas, integração entre
            frontend, backend e MySQL, além de infraestrutura com Nginx e colaboração com Git e
            code review.
          </p>
        </div>

        <StackExpand active={active} onStation={setActive} onPick={pick} />
      </div>
    </section>
  );
}
