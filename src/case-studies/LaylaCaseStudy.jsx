import CaseStudyLayout from './CaseStudyLayout.jsx'
import ConfidentialityNotice from './ConfidentialityNotice.jsx'

/* Illustrative TypeScript written for this page, kept verbatim via innerHTML.
   Generic names only: no internal paths, keys, flags, tables or production values. */
const TURN_SNIPPET = `<span class="c">// Illustrative TypeScript, written for this page. Not production code.</span>
<span class="c">// One inbound chat message, from webhook to reply.</span>

<span class="k">async function</span> onInbound(msg: InboundMessage): Promise&lt;<span class="k">void</span>&gt; {
  <span class="k">if</span> (!verifySignature(msg)) <span class="k">return</span> reject(msg);
  <span class="k">if</span> (<span class="k">await</span> dedupe.seen(msg.id)) <span class="k">return</span>;            <span class="c">// redeliveries, other replicas</span>

  <span class="k">const</span> session = <span class="k">await</span> sessions.find(msg.from).catch(() =&gt; <span class="k">null</span>);
  <span class="c">// A failed lookup gets a holding reply, never a cold restart.</span>
  <span class="k">if</span> (!session) <span class="k">return</span> sendHoldingReply(msg);

  <span class="c">// One turn per conversation at a time. The message is already marked seen,</span>
  <span class="c">// so it won't be redelivered: back off and retry rather than drop it.</span>
  <span class="k">for</span> (<span class="k">let</span> attempt = <span class="n">0</span>; attempt &lt; MAX_ATTEMPTS; attempt++) {
    <span class="k">const</span> turn = <span class="k">await</span> withConversationLock(session.id, () =&gt; agent.handle(session, msg));
    <span class="k">if</span> (turn !== LOCKED) <span class="k">return</span> deliverOnce(turn);   <span class="c">// idempotent send + transcript</span>
    <span class="k">await</span> sleep(backoff(attempt));
  }
  recordUnanswered(msg);                              <span class="c">// visible, not silent</span>
}`

/* An illustrative exchange. Every line is written for this page; none of it
   is a real customer. Stage chips mark where the state machine is. */
const CHAT = [
  { who: 'l', stage: 'Greeting', text: 'Hi Sara, this is Layla from ASK Real Estate. You asked about property in Bahrain. Is now a good time for a few quick questions?', note: 'approved template' },
  { who: 'c', text: 'yes sure' },
  { who: 'l', stage: 'Qualify', text: 'Great. Are you looking to buy or rent, and is it to live in or to invest?' },
  { who: 'c', text: 'buy, to live in. budget around BHD 120k' },
  { who: 'l', stage: 'Qualify', text: 'Thanks. Which areas do you have in mind, and how many bedrooms?' },
  { who: 'c', text: 'Juffair or Seef, 2 bed' },
  { who: 'l', stage: 'Match', text: 'I found several options across Juffair and Seef in that range. A property specialist can walk you through them. What day and time suits you?' },
  { who: 'c', text: 'thursday evening' },
  { who: 'l', stage: 'Book', text: 'Thursday at 6:00 PM with a property specialist. Shall I confirm?' },
  { who: 'c', text: 'yes' },
  { who: 'l', stage: 'Booked', text: 'Confirmed for Thursday at 6:00 PM. Your specialist has your details.' },
]

export default function LaylaCaseStudy() {
  return (
    <CaseStudyLayout
      title="Layla · Case Study · Ashrafali M."
      wrapClass="cs-layla sig-scan"
      backHash="#work-layla"
      brandLink
    >
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Featured case study · № 01</div>
          <h1 className="h1">A sales agent that<br/><span className="accent">qualifies, books,</span><br/>and knows when<br/>to stop.</h1>
          <p className="deck">Layla is ASK Real Estate's AI sales agent on WhatsApp. Assign it a lead and it <span className="em">opens the conversation, qualifies the customer, checks live inventory, and books a meeting with a human specialist at the time the customer names</span>, then hands that specialist the client's details. Deterministic code runs the conversation; the model writes the sentences.</p>

          <div className="meta">
            <div className="meta-item"><span className="meta-label">Case study</span><span className="meta-val">№ 01</span></div>
            <div className="meta-item"><span className="meta-label">Domain</span><span className="meta-val">Real-estate sales · Conversational AI</span></div>
            <div className="meta-item"><span className="meta-label">Role</span><span className="meta-val">AI Developer · Design &amp; Implementation</span></div>
            <div className="meta-item"><span className="meta-label">Status</span><span className="meta-val live">In production since spring 2026</span></div>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-num">10</div><div className="stat-label">Live conversation stages</div></div>
            <div className="stat"><div className="stat-num">24<span className="em">h</span></div><div className="stat-label">WhatsApp window, enforced in code</div></div>
            <div className="stat"><div className="stat-num">7</div><div className="stat-label">Outcomes recorded per conversation</div></div>
            <div className="stat"><div className="stat-num">50</div><div className="stat-label">Test files on the agent</div></div>
          </div>
        </div>
      </section>
      <ConfidentialityNotice />

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 01 · The problem</div>
          <h2 className="section-title reveal">The first stretch of every sale <span className="accent">is the same five questions.</span></h2>
          <div className="prose reveal">
            <p className="lede">A real-estate lead cools quickly. Before it is worth a salesperson's time, someone has to answer it, find out <span className="accent">buy or rent, live in or invest, what budget, where, how many bedrooms</span>, and agree a time to talk.</p>
            <p>That stretch is repetitive, it arrives at all hours, and it happens on WhatsApp, which is where customers in Bahrain already are. It is also the part of the sale where a slow or clumsy reply costs the most.</p>
            <p>The requirement I built to fits in one sentence: <strong>assign a lead to Layla, and she messages them straight away, qualifies them properly, books the meeting at the customer's own stated time, picks the agent round-robin, and sends that agent the meeting and the client's details.</strong> No human in the loop until the meeting.</p>
          </div>
          <div className="quote reveal">The goal was never a bot that chats. It was a salesperson's calendar with <span className="em">qualified meetings already in it</span>.</div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 02 · One conversation</div>
          <h2 className="section-title reveal">What the customer sees, <span className="accent">and where the machine is.</span></h2>
          <div className="prose reveal">
            <p>A fictional exchange, written for this page: no real customer, property or agent. The chips show the stage the agent is in when it sends each message.</p>
          </div>

          <div className="chat reveal" role="list" aria-label="Illustrative WhatsApp conversation">
            {CHAT.map((m, i) => (
              <div key={i} role="listitem" className={`bubble-row ${m.who === 'l' ? 'from-l' : 'from-c'}`}>
                {m.stage && <span className="chip">{m.stage}</span>}
                <div className="bubble">
                  <span className="sr-only">{m.who === 'l' ? 'Layla: ' : 'Customer: '}</span>
                  {m.text}
                  {m.note && <span className="bubble-note">{m.note}</span>}
                </div>
              </div>
            ))}
            <div className="chat-handoff" role="listitem">
              Specialist picked round-robin · WhatsApp to the agent with name, phone, requirements, slot and a CRM link · lead converted to a contact
            </div>
          </div>
        </div>
      </section>

      <section className="arch">
        <div className="arch-inner">
          <div className="chap">// 03 · The workflow</div>
          <h2 className="section-title reveal">Ten live stages, <span className="accent">four ways out.</span></h2>

          <div className="prose reveal">
            <p>The conversation is a state machine. Six stages carry a lead forward, and four are outcomes any stage can exit to. Opt-out is handled separately and is not a stage: it clears the session and answers in English or Arabic.</p>
          </div>

          <div className="arch-diagram">
            <svg viewBox="0 0 1100 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="larr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(46, 230, 168, 0.9)"/>
                </marker>
                <marker id="larr-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(244, 238, 229, 0.4)"/>
                </marker>
              </defs>

              <g fontFamily="ui-monospace, Menlo, monospace" fontSize="11">
                <text x="30" y="34" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">FORWARD · ONE LEAD, ONE PATH</text>

                <rect x="30" y="50" width="150" height="52" rx="4" fill="rgba(46, 230, 168, 0.1)" stroke="rgba(46, 230, 168, 0.6)"/>
                <text x="105" y="73" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Greeting</text>
                <text x="105" y="89" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">approved template</text>

                <rect x="210" y="50" width="150" height="52" rx="4" fill="rgba(46, 230, 168, 0.1)" stroke="rgba(46, 230, 168, 0.6)"/>
                <text x="285" y="73" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Qualify</text>
                <text x="285" y="89" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">purpose + budget first</text>

                <rect x="390" y="50" width="150" height="52" rx="4" fill="rgba(46, 230, 168, 0.1)" stroke="rgba(46, 230, 168, 0.6)"/>
                <text x="465" y="73" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Match</text>
                <text x="465" y="89" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">live inventory search</text>

                <rect x="570" y="50" width="150" height="52" rx="4" fill="rgba(46, 230, 168, 0.1)" stroke="rgba(46, 230, 168, 0.6)"/>
                <text x="645" y="73" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Book</text>
                <text x="645" y="89" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">customer's time + YES</text>

                <rect x="750" y="50" width="150" height="52" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(46, 230, 168, 0.5)" strokeDasharray="3 3"/>
                <text x="825" y="73" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Email (optional)</text>
                <text x="825" y="89" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">optional · invite</text>

                <rect x="930" y="50" width="150" height="52" rx="4" fill="rgba(46, 230, 168, 0.22)" stroke="rgba(46, 230, 168, 0.95)" strokeWidth="1.5"/>
                <text x="1005" y="73" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Booked</text>
                <text x="1005" y="89" textAnchor="middle" fill="rgba(244, 238, 229, 0.6)" fontSize="9">confirmed, not yet held</text>

                <text x="30" y="196" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">OUTCOMES · REACHABLE FROM ANY STAGE</text>

                <rect x="30" y="250" width="240" height="56" rx="4" fill="rgba(46, 230, 168, 0.12)" stroke="rgba(46, 230, 168, 0.7)"/>
                <text x="150" y="274" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Handoff</text>
                <text x="150" y="291" textAnchor="middle" fill="rgba(244, 238, 229, 0.55)" fontSize="9">a human takes over, with a summary</text>

                <rect x="300" y="250" width="240" height="56" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="420" y="274" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Qualified</text>
                <text x="420" y="291" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">interested · converted to a contact</text>

                <rect x="570" y="250" width="240" height="56" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="690" y="274" textAnchor="middle" fill="#f4f1ec" fontWeight="500">On hold</text>
                <text x="690" y="291" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">"talk later" · parked</text>

                <rect x="840" y="250" width="240" height="56" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.3)"/>
                <text x="960" y="274" textAnchor="middle" fill="#f4f1ec" fontWeight="500">Cold close</text>
                <text x="960" y="291" textAnchor="middle" fill="rgba(244, 238, 229, 0.5)" fontSize="9">not interested · AI stops</text>

                <text x="30" y="360" fill="rgba(244, 238, 229, 0.45)" fontSize="10">Handoff triggers: customer asks for a person · negative or declining sentiment · turn limit</text>
                <text x="30" y="378" fill="rgba(244, 238, 229, 0.45)" fontSize="10">repeated model failure · low confidence · compliance block · messaging window closed · no matching inventory</text>
              </g>

              <g stroke="rgba(46, 230, 168, 0.75)" strokeWidth="1.2" fill="none">
                <path d="M180 76 L205 76" markerEnd="url(#larr)"/>
                <path d="M360 76 L385 76" markerEnd="url(#larr)"/>
                <path d="M540 76 L565 76" markerEnd="url(#larr)"/>
                <path d="M720 76 L745 76" markerEnd="url(#larr)"/>
                <path d="M900 76 L925 76" markerEnd="url(#larr)"/>
                <path d="M645 102 Q645 128 830 128 Q1005 128 1005 106" markerEnd="url(#larr)" strokeDasharray="3 3"/>
              </g>
              <g stroke="rgba(244, 238, 229, 0.3)" strokeWidth="1" fill="none" strokeDasharray="2 3">
                <path d="M30 216 L1080 216"/>
                <path d="M150 216 L150 245" markerEnd="url(#larr-s)"/>
                <path d="M420 216 L420 245" markerEnd="url(#larr-s)"/>
                <path d="M690 216 L690 245" markerEnd="url(#larr-s)"/>
                <path d="M960 216 L960 245" markerEnd="url(#larr-s)"/>
              </g>
            </svg>
          </div>

          <div className="arch-legend">
            <span><i style={{ background: '#2EE6A8' }}></i>Forward path</span>
            <span><i style={{ background: 'transparent', border: '1px dashed rgba(46, 230, 168, 0.8)' }}></i>Optional step</span>
            <span><i style={{ background: 'rgba(244, 238, 229, 0.35)' }}></i>Exit to an outcome</span>
          </div>
          <p className="diagram-note">Recreated conceptual diagram for this page. Component names are generic; this is not the internal service map.</p>

          <div className="prose" style={{ marginTop: '3rem' }}>
            <p><strong>Qualification has a floor and a ceiling.</strong> A lead counts as qualified once purpose and budget are known. Layla then gets one attempt each at area, property type and bedrooms, asks once whether the customer is the decision-maker, and has a backstop so a lead who won't answer doesn't loop forever. The counters are separate on purpose: with one shared counter, the mandatory questions can use up the budget and leave the specialist with a brief that is only a budget and a purpose.</p>
            <p><strong>Five more states are defined but never entered.</strong> One is kept on purpose (see the decisions below); the others are no longer reached by any path. The page says ten because ten is what a customer can actually pass through.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 04 · WhatsApp &amp; ERP</div>
          <h2 className="section-title reveal">Two integrations, <span className="accent">each with its own rules.</span></h2>

          <div className="prose reveal">
            <p className="lede">WhatsApp decides <span className="accent">when you may speak</span>. The ERP decides <span className="accent">what counts as done</span>. Layla sits between them and has to respect both.</p>
          </div>

          <div className="panel reveal">
            <div className="panel-label">WhatsApp · Meta Cloud API</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Opening</div><div className="pi-val">Free text is not allowed to a customer who hasn't written in the last 24 hours, so the opener is an <span className="accent">approved template</span>. No template configured means no send, not an improvised message.</div></div>
              <div className="panel-item"><div className="pi-label">24-hour window</div><div className="pi-val">Measured from the customer's last message, not Layla's. When it has closed, Layla stops and hands off, telling the human a template is needed.</div></div>
              <div className="panel-item"><div className="pi-label">Inbound</div><div className="pi-val">Webhook signatures are verified and inbound traffic is rate-limited. Each message ID is de-duplicated across replicas, so a redelivered message never produces a second reply.</div></div>
              <div className="panel-item"><div className="pi-label">Outbound</div><div className="pi-val">Every reply goes through an idempotent send keyed on the turn and its content, so a retry can't send the same message twice. Delivery and read receipts are matched back to each message.</div></div>
              <div className="panel-item"><div className="pi-label">Hours</div><div className="pi-val">New conversations open only inside business hours, Bahrain time.</div></div>
              <div className="panel-item"><div className="pi-label">Two entry points</div><div className="pi-val">Assigned leads get the outbound flow above. A customer who writes in first meets a separate inbound capture flow, capped at a small number of AI turns before it falls back to a plain form.</div></div>
            </div>
          </div>

          <div className="panel reveal">
            <div className="panel-label">ERP · what Layla writes back</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Transcript</div><div className="pi-val">Both sides of every turn, filed against the lead record the CRM's history views actually read.</div></div>
              <div className="panel-item"><div className="pi-label">Booking</div><div className="pi-val">The meeting as a CRM activity, the lead's status and stage, and the source record, all in <span className="accent">one transaction</span>.</div></div>
              <div className="panel-item"><div className="pi-label">Conversion</div><div className="pi-val">The lead becomes a contact, owned by the assigned salesperson and tagged as sourced by Layla.</div></div>
              <div className="panel-item"><div className="pi-label">Outcome</div><div className="pi-val">Every conversation ends with a recorded outcome and a quality score on the lead, so results can be counted from the CRM, not from logs.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 05 · Matching &amp; booking</div>
          <h2 className="section-title reveal">The customer names the time. <span className="accent">Code reads it.</span></h2>

          <div className="prose reveal">
            <p><strong>Matching.</strong> The qualified brief becomes an inventory search: type, area, budget, bedrooms, buy or rent. If it comes back thin, the search widens in a fixed order: neighbouring areas, then an adjusted budget, then wider market listings, then a broader property type. Layla tells the customer what she found across which areas and moves to a time; she doesn't paste listings into the chat.</p>
            <p><strong>Booking.</strong> Layla doesn't offer a menu of slots. She asks when suits the customer and reads the answer with a <strong>rule-based time parser</strong>, not a model: "thursday evening" resolves to Thursday at 6:00 PM, a bare date to 10:00 AM. Then she reads the time back and waits for an explicit yes.</p>
            <p>Before anything is written, a booking validator checks the prerequisites, and runs again defensively at the point of confirmation. If it fails, a manager is alerted and Layla proposes again. <strong>A failed booking never tells the customer "confirmed".</strong> A set-if-absent guard means two concurrent confirmations can't both run the booking.</p>
            <p>The confirmation itself is a fixed template, not generated text. A generated confirmation can name a property the customer was never shown, and the confirmation is the one message that must not be wrong.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 06 · State &amp; concurrency</div>
          <h2 className="section-title reveal">Customers send three messages <span className="accent">before you've answered one.</span></h2>

          <div className="prose reveal">
            <p>People don't wait for a reply on WhatsApp. They send "hi", then "I'm looking for a flat", then "2 bed" in three seconds, sometimes to different server replicas. Each lead's conversation state lives in Redis, and every turn runs under a <strong>per-lead lock</strong>.</p>
          </div>

          <pre className="codeblock" dangerouslySetInnerHTML={{ __html: TURN_SNIPPET }} />

          <div className="panel reveal">
            <div className="panel-label">The details that made it hold</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">The lock</div><div className="pi-val">Set-if-absent with a short expiry, so a crashed worker can't hold a conversation forever. Release is compare-and-delete, so one worker can't release another's lock. If the lock store errors, the turn is declined, not run unlocked.</div></div>
              <div className="panel-item"><div className="pi-label">The retry</div><div className="pi-val">A message that loses the race can't simply be dropped: it is already marked seen, so the platform won't resend it. It backs off with increasing delays, and if it still can't get in, it is recorded as unanswered.</div></div>
              <div className="panel-item"><div className="pi-label">The state</div><div className="pi-val">Stage, the qualified brief, what's been shown, the booking, turn counters and a capped history, with an expiry refreshed on every turn and a phone-to-conversation index alongside.</div></div>
              <div className="panel-item"><div className="pi-label">Surviving handoff</div><div className="pi-val">Terminal stages are marked and kept rather than deleted, so a customer who writes again after a handoff is not greeted as a stranger. Only opt-out deletes the session.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 07 · Failure &amp; handoff</div>
          <h2 className="section-title reveal">Knowing when to stop <span className="accent">is the feature.</span></h2>

          <div className="layers">
            <div className="layer reveal">
              <div className="layer-num">01</div>
              <div>
                <div className="layer-title">Model <span className="accent">timeouts.</span></div>
                <div className="layer-body">Each generation has a timeout. The first timeout sends a holding message; a repeat within a short window hands the conversation to a person and alerts a manager.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">02</div>
              <div>
                <div className="layer-title">Output <span className="accent">checks.</span></div>
                <div className="layer-body">Every reply passes PII masking, then hallucination, content, compliance and real-estate rules, and is grounded against the listings actually shown. A low-confidence draft gets one regeneration with a tighter constraint. A serious violation forces a handoff and pages a manager.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">03</div>
              <div>
                <div className="layer-title">Handoff <span className="accent">triggers.</span></div>
                <div className="layer-body">The customer asks for a person, a single strongly negative message, sentiment sliding over several turns, the turn cap, a repeated timeout, a compliance block, a closed 24-hour window, or no inventory to discuss. Every handoff carries a summary: stage, budget, areas, what was shown, objections, the reason, and the sentiment trail.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">04</div>
              <div>
                <div className="layer-title">Who gets <span className="accent">the meeting.</span></div>
                <div className="layer-body">A round-robin cursor, advanced under a row lock so two bookings can't pick the same turn. Behind it, ordered fallbacks so a booking always has an owner, and the AI's own sales identity is rejected at every tier. Every decision is audited, including when a fallback was used and when the pick differs from the lead's existing owner.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">05</div>
              <div>
                <div className="layer-title">Telling <span className="accent">the agent.</span></div>
                <div className="layer-body">A WhatsApp message to the agent with the client's name, phone, requirements, slot and a CRM link. An in-app notification always. Email only if neither landed. If WhatsApp refuses because the agent's own window has closed, it falls back automatically.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">06</div>
              <div>
                <div className="layer-title">Stale <span className="accent">conversations.</span></div>
                <div className="layer-body">A periodic sweep hands off conversations that went quiet mid-funnel. It skips finished ones, so a conversation that ended in a booking is never mistaken for one that stalled.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 08 · Decisions</div>
          <h2 className="section-title reveal">Choices that <span className="accent">kept it predictable.</span></h2>

          <div className="decision reveal">
            <div className="decision-label">Decision · Control</div>
            <div className="decision-title">The model writes sentences. Code decides what happens.</div>
            <div className="decision-body">Layla's model has no tools. Stage handlers are ordinary code, and the model is called for narrow jobs only: classifying the customer's intent (low temperature, a few tokens), extracting fields from what the customer said and from agent notes, and wording the reply. Every transition is readable in the source and testable without a model in the loop.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Time</div>
            <div className="decision-title">Rules for the one thing that must be exact.</div>
            <div className="decision-body">A misread time is a missed meeting with a real person waiting. Times are parsed by rules with explicit defaults, read back, and confirmed with a yes. The model never decides when a meeting is.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Configuration</div>
            <div className="decision-title">Operators can shape the funnel, within an allow-list.</div>
            <div className="decision-body">Sales operations can switch middle stages off, and every config save is a new version with the old one kept. But only the middle of the funnel is skippable. The stages that record a booking can never be configured away, because skip logic that can reach them can undo a confirmed meeting.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Migration</div>
            <div className="decision-title">Retire a state; don't delete it.</div>
            <div className="decision-body">Conversation sessions outlive deploys. Deleting a retired stage would send every session still parked in it down the default branch, which greets them as a brand-new contact. So the retired stage stays, with an explicit route back into the funnel, until no live session can hold it.</div>
          </div>

          <div className="decision reveal">
            <div className="decision-label">Decision · Platform</div>
            <div className="decision-title">Prompts and models live outside the code.</div>
            <div className="decision-body">Prompts load from the database with an in-code fallback, so wording can change without a deploy and a missing row doesn't take Layla down. The model for each job is chosen at runtime by per-agent policy through the same LLM gateway as the rest of the AI layer.</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 09 · The hard part</div>
          <h2 className="section-title reveal">Every test passes. <span className="accent">The flow can still be broken.</span></h2>

          <div className="prose reveal">
            <p className="lede">An agent's test suites can be green while the end-to-end flow is broken. Tests that check call order and helper logic pass happily. <span className="accent">None of them run the live transition table against the real config.</span></p>
            <p>The defects worth testing for have that shape: correct-looking code, a passing test, and the wrong outcome at the other end of the conversation. Four rules came out of it:</p>
            <p><strong>Assert every write against the real schema.</strong> The ORM drops unknown fields without an error, so a write can create the record, store its IDs and keep read receipts working while the message text never lands. Transcripts go through one shared writer, and tests assert the payload against the model's real schema.</p>
            <p><strong>Measure the window from the customer.</strong> The 24-hour messaging window is counted from the customer's last message, not the agent's, so a reply that arrives a day after the opener still gets an answer.</p>
            <p><strong>Make "booked" a real stage.</strong> A stage between confirmation and the meeting means a booked customer who writes again is not treated as a returning lead or offered slots for a meeting that already exists.</p>
            <p><strong>Stop selling after the sale.</strong> Once a meeting is booked, buying questions are answered, not used to restart the pitch.</p>
          </div>

          <div className="quote reveal">A green test suite tells you the code does what the tests say. <span className="em">Only the live config tells you what the customer gets.</span></div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 10 · Outcomes</div>
          <h2 className="section-title reveal">What's measured, <span className="accent">and what isn't claimed yet.</span></h2>

          <div className="prose reveal">
            <p>I'd rather publish no number than an unverified one. Layla records everything needed to measure it, and outcome figures will appear here once they've been checked against production.</p>
          </div>

          <div className="panel reveal">
            <div className="panel-label">Recorded for every conversation</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Outcome</div><div className="pi-val">One of seven: meeting booked, qualified handoff, human handoff, on hold, cold close, opt-out, or error fallback. Plus a quality score.</div></div>
              <div className="panel-item"><div className="pi-label">Assignment</div><div className="pi-val">Who got each meeting, why, and whether a fallback tier was used.</div></div>
              <div className="panel-item"><div className="pi-label">Delivery</div><div className="pi-val">Sent, delivered and read, per message, from WhatsApp's own receipts.</div></div>
              <div className="panel-item"><div className="pi-label">Cost</div><div className="pi-val">Every model call in the gateway's cost ledger, with the prompt version that produced it.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="lessons">
        <div className="lessons-inner">
          <div className="chap">// 11 · Reflections</div>
          <h2 className="section-title reveal">What Layla <span className="accent">taught me.</span></h2>
          <ol className="lessons-list">
            <li className="reveal">
              <span className="lesson-num">i.</span>
              <div className="lesson-text">Give the model the words and keep the decisions. A customer-facing agent you can't trace through ordinary code is an agent you can't fix at 11 PM.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">ii.</span>
              <div className="lesson-text"><span className="accent">Test against the live config, not the defaults.</span> The bugs that matter live in the gap between the two.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iii.</span>
              <div className="lesson-text">Silent failure is the expensive kind. A dropped message, an incomplete transcript or an unanswered late reply all look like success from the inside, so design them to be loud.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iv.</span>
              <div className="lesson-text">Handoff is not where the agent failed. Handing a person a qualified customer, a summary and a booked slot is the job.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">v.</span>
              <div className="lesson-text">Count what's reachable. The code defines fifteen stages; ten are live. Knowing the difference is part of knowing the system.</div>
            </li>
          </ol>
        </div>
      </section>

      <section className="end">
        <div className="end-inner">
          <span className="end-eyebrow">End of case study · № 01</span>
          <h2 className="end-title">Want an agent that <span className="accent">knows when to stop</span>?</h2>
          <div className="end-links">
            <a className="btn btn-fill" href="mailto:ashrafali31018@gmail.com">Email</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/ashrafali-m-769b25246" target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn btn-ghost" href="#/case/askre">The AI platform</a>
            <a className="btn btn-ghost" href="#work-layla">More work</a>
          </div>
          <div className="end-meta">
            <span>© {new Date().getFullYear()} · Ashrafali M.</span>
            <span>Layla · Case Study № 01</span>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
