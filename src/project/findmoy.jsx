import { CasePage, CaseHero, CaseSection, Stats, Cards, ExternalBtn } from "./CaseStudy.jsx";

// Translated from the live product page at findmoy.app
const STEPS = [
  { title: "A comment arrives", desc: "A customer asks about stock under your post. It lands in one queue with everything else from your Page.", live: true },
  { title: "Scams get held", desc: "A link promising money is flagged as a likely scam, with the reason shown. You hide it or keep it.", live: true },
  { title: "Reply in one tap", desc: "For everyday questions, one of your saved answers is suggested. You read it, then send it." },
  { title: "Stock beside the chat", desc: "The item the customer means shows up next to the conversation, with when you last checked it." },
  { title: "The order is recorded", desc: "Turn the conversation into an order and mark it paid, without opening another app." },
];

const PRINCIPLES = [
  { icon: "lang", title: "Khmer as people write it", desc: "Khmer script, Khmerlish and a mix of both, read directly. Nothing is translated to English first, so the meaning survives." },
  { icon: "flag", title: "A reason with every flag", desc: "Each comment arrives marked safe, offensive or harmful, with the words that triggered it. You see why before you decide." },
  { icon: "hand", title: "You still decide", desc: "FindMoy never hides or replies on its own. A person on your team makes the call, and every action can be undone." },
  { icon: "queue", title: "Busy pages, fully read", desc: "Every comment is checked as it arrives. Scams and abuse rise to the top; criticism of your shop is never hidden for you." },
];

const CHANNELS = [
  { name: "Facebook comments", status: "Live", live: true },
  { name: "Messenger", status: "Building" },
  { name: "TikTok", status: "Soon" },
  { name: "Telegram", status: "Soon" },
  { name: "Website chat", status: "Soon" },
];

const FAQ = [
  { q: "Do I need to install anything?", a: "No. You connect your Facebook Page once in the browser and FindMoy starts reading new comments. Nothing goes on your phone." },
  { q: "Does it delete comments by itself?", a: "No. FindMoy flags comments and shows the reason. Hiding, replying or leaving a comment is up to a person on your team, and a hide can always be reversed." },
  { q: "What if a customer complains about my shop?", a: "Business criticism stays visible. The blocklist targets insults aimed at people and scams, not customers who are unhappy with you." },
  { q: "Does it understand Khmerlish?", a: "Yes. Khmer script, Khmer written in Latin letters, and both mixed in one sentence are read as written, including everyday misspellings." },
  { q: "When do stock and orders arrive?", a: "They are on the roadmap, not live yet. Moderation works today, the shared inbox is being built, and products, stock and orders come after." },
];

export default function FindMoy() {
  return (
    <CasePage
      title="FindMoy, how it works"
      accent="#0a7a8c"
      crumb="SaaS · FindMoy"
      end={{
        title: <>Try it on<br />your Page.</>,
        sub: "Connect one Facebook Page, label a few comments, and see what a day on your Page really holds. Free, no card needed.",
        actions: <ExternalBtn href="https://findmoy.app" solid>Visit findmoy.app</ExternalBtn>,
      }}
    >
      <CaseHero
        eyebrow="Founder · SaaS · Early access"
        title={<>FindMoy<br /><em>comment to order</em></>}
        lede="Khmer-first AI for Facebook sellers. FindMoy reads Page comments in Khmer, Khmerlish and English, flags scams and abuse with the reason, and leaves every decision to a person on your team."
        tags={["Facebook Pages", "AI moderation", "Khmer NLP", "Dashboard"]}
        actions={
          <>
            <ExternalBtn href="https://findmoy.app" solid>Visit site</ExternalBtn>
            <a href="#how" className="cut-btn">How it works</a>
          </>
        }
        media={
          <figure className="case-media case-media-poster">
            <div className="case-frame">
              <img src="/img/findmoy-poster-1080.webp" srcSet="/img/findmoy-poster-640.webp 640w, /img/findmoy-poster-1080.webp 1080w" sizes="(max-width: 960px) 92vw, 440px" width="1080" height="1350" alt="FindMoy poster: from comment to order, in one place" fetchPriority="high" />
            </div>
          </figure>
        }
      />

      <Stats
        items={[
          { value: "4→1", label: "Apps per sale: comments, notebook, Messenger and order book in one place" },
          { value: "3", label: "Ways to write one question, understood as one meaning" },
          { value: "0", label: "Actions taken on your Page without a person deciding" },
        ]}
      />
      <p className="case-note">These numbers describe how the product works, not customer results. FindMoy is early, and moderation is the part that is live today.</p>

      <div id="how" style={{ scrollMarginTop: 72 }}>
        <CaseSection label="How it works" title="From comment to sale" sub="Without leaving the chat. The first two steps work today; the rest are on the way.">
          <ol className="case-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="case-step">
                <span className="cond case-step-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="cond">{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <span className={`case-pill${s.live ? " is-live" : ""}`}>{s.live ? "Live" : "Soon"}</span>
              </li>
            ))}
          </ol>
        </CaseSection>
      </div>

      <CaseSection label="Principles" title="Built for sellers" sub="Sellers work from their phones between customers. The queue, the reason and the decision all sit on one screen.">
        <Cards items={PRINCIPLES} cols={2} />
      </CaseSection>

      <CaseSection label="Channels" title="Where customers write" sub="FindMoy works where your customers already message you.">
        <ul className="case-channels">
          {CHANNELS.map((c) => (
            <li key={c.name}>{c.name}<span className={`case-pill${c.live ? " is-live" : ""}`}>{c.status}</span></li>
          ))}
        </ul>
      </CaseSection>

      <CaseSection label="FAQ" title="Sellers ask first">
        <div className="case-faq">
          {FAQ.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary><b>{String(i + 1).padStart(2, "0")}</b>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </CaseSection>
    </CasePage>
  );
}
