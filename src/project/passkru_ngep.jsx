import { CasePage, CaseHero, CaseSection, Stats, Cards, ExternalBtn, InternalBtn } from "./CaseStudy.jsx";

const PHOTOS = [
  { name: "passkru-ngep-1", w: 1080, h: 1440, alt: "Holding the champion trophy and the 1st Place Award board", caption: "Champion trophy, medal and certificate" },
  { name: "passkru-ngep-2", w: 1080, h: 810, alt: "The PassKru team with their medals and the 1st Place Award", caption: "Team PassKru at Next-Gen's Day" },
  { name: "passkru-ngep-3", w: 1080, h: 810, alt: "PassKru team at the NGEP award ceremony", caption: "Showcase and award ceremony" },
];
const src = (n) => ({ src: `/img/${n}-1080.webp`, srcSet: `/img/${n}-480.webp 480w, /img/${n}-1080.webp 1080w` });

export default function PassKruNgep() {
  return (
    <CasePage
      title="PassKru, 1st Place at NGEP"
      accent="#2f5bea"
      crumb="Achievement · 01"
      end={{
        title: <>From pitch<br />to product.</>,
        sub: "The prototype that won NGEP is now PassKru, a teacher-exam prep platform in development.",
        actions: (
          <>
            <InternalBtn to="/project/passkru_startup" solid>The startup</InternalBtn>
            <ExternalBtn href="https://pass-kru67.vercel.app/">Try PassKru</ExternalBtn>
          </>
        ),
      }}
    >
      <CaseHero
        eyebrow="Competition winner · 2026"
        title={<>1st place<br /><em>NGEP Batch 3</em></>}
        lede="Our team PassKru won 1st place in the Next-Gen Engagement Program (NGEP) Batch 3, pitching our MVP and business plan against teams from three departments at CADT."
        tags={["Startup", "Competition", "Ed-tech", "2026"]}
        actions={
          <>
            <InternalBtn to="/project/passkru_startup" solid>About PassKru</InternalBtn>
            <ExternalBtn href="https://ngep.idt.edu.kh/">NGEP program</ExternalBtn>
          </>
        }
        media={
          <figure className="case-media">
            <div className="case-frame">
              <img {...src("passkru-ngep-2")} sizes="(max-width: 960px) 92vw, 45vw" width="1080" height="810" alt="The PassKru team with their medals and the 1st Place Award" fetchPriority="high" />
            </div>
          </figure>
        }
      />

      <Stats
        items={[
          { value: "1st", label: "Place, out of every team in the batch" },
          { value: "B3", label: "Next-Gen Engagement Program, Batch 3" },
          { value: "3", label: "Departments competing" },
          { value: "25.09", label: "Next-Gen's Day, Innovation Center, CADT" },
        ]}
      />

      <CaseSection label="The win" title="What we pitched" sub="A working prototype and a business plan, judged at the Next-Gen's Day showcase and award ceremony.">
        <Cards
          items={[
            { icon: "target", title: "The problem", desc: "Teacher-exam candidates had no single place to prepare. Practice, past papers and exam news were spread across many sources." },
            { icon: "plan", title: "The product", desc: "PassKru: practice questions, quizzes, flashcards, mock exams and a study plan built around each learner." },
            { icon: "chart", title: "The plan", desc: "An MVP we could demo live, plus the business plan for taking it to candidates across Cambodia." },
          ]}
        />
      </CaseSection>

      <CaseSection label="Gallery" title="On the day" sub="Friday 25 September 2026, Cosmos Hall, Innovation Center, CADT.">
        <div className="case-gallery">
          {PHOTOS.map((p, i) => (
            <figure key={p.name}>
              <img {...src(p.name)} sizes={i === 0 ? "(max-width: 600px) 92vw, 40vw" : "(max-width: 600px) 92vw, 52vw"} width={p.w} height={p.h} alt={p.alt} loading="lazy" decoding="async" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </CaseSection>
    </CasePage>
  );
}
