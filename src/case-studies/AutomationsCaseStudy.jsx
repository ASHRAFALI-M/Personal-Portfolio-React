import CaseStudyLayout from './CaseStudyLayout.jsx'
import ConfidentialityNotice from './ConfidentialityNotice.jsx'

/* Every entry below is one feature in the ERP's own AI catalogue, reworded for
   this page. No internal table names, flags, counts of company records, or
   people. `nomodel` marks the ones that call no model at all. */
const GROUPS = [
  {
    key: 'radars',
    chap: 'Signal radars',
    title: <>Fifteen radars that <span className="accent">read what staff write.</span></>,
    lede: 'Status columns say where a record is. The notes say why it is stuck. Each radar runs a free SQL pre-filter, sends only the records that pass to a model, and puts a tag and a stall flag on the list people already use.',
    items: [
      ['Work Order Signal', 'Awaiting customer, quote rejected, parts pending, access blocked, invoice stuck or at risk, plus a flag for anything past its SLA.'],
      ['Work Order Task Signal', 'The same stall detection one level down, on individual tasks.'],
      ['Observation Signal', 'Needs a work order, safety risk, awaiting owner, in hand or informational. Can read the site photographs as well as the text.'],
      ['Incident Signal', 'Separates the three things still open on an incident: the escalation, the money (who should be charged or which insurer told) and the repair.'],
      ['Defect Signal', 'Whose obligation a defect is (warranty claim or our own team), whether it is a hazard, and whether a claimed fix was ever verified.'],
      ['Snagging Signal', 'Whether a handover walk was finished, the failures put right, and the owner countersigned.', false, 'awaiting data'],
      ['Inspection Signal', 'Reads a technician\'s remark on one checklist line. Rules own pass or fail; the radar surfaces the disagreements, like a passed line whose remark says the unit is not working.'],
      ['Billing Signal', 'Separates a job lost to a competitor from one that was never needed, which look identical as a rejected quotation. The invoice half runs in SQL, with no model.'],
      ['Procurement Signal', 'The argument on a requisition: already committed, VAT issue, split quotation, price check, scope change. Purchase orders are tagged in SQL.'],
      ['Renewal Signal', 'The blocker on an expiring lease: price gap, wants changes, unreachable, likely to leave. Flags renewals that have run out of runway.'],
      ['Lead Signal', 'Tags partner-portal leads from agent notes, so the list sorts by who actually needs chasing.'],
      ['Ops Lead Signal', 'The same for ops CRM leads, read from calls, WhatsApp and follow-up notes.'],
      ['Contact Signal', 'Tags every CRM contact from its activity log, with separate reasons for owners, agents, banks and companies.'],
      ['Offer Signal', 'Negotiating, price concern, awaiting reply, follow-up or not interested, from the agent\'s own notes.'],
      ['Booking Signal', 'On track, payment pending, docs pending, awaiting client or at risk, so a stalling booking surfaces before its deadline.'],
    ],
  },
  {
    key: 'facts',
    chap: 'Facts & checks',
    title: <>The parts that <span className="accent">check the model.</span></>,
    lede: 'A radar reads notes and cannot see the tables. These derive the facts in SQL, cost nothing to run, and mark a verdict as contradicted when the record disagrees with it.',
    items: [
      ['Work Order Signal Detail', 'Which quotation or invoice, for how much, how long it has sat, and whether the customer has in fact already replied.', true],
      ['Contact Signal Detail', 'How often a contact was really called or messaged, whether they answered, whether a viewing happened. Catches a contact closed as "no response" when the log shows no attempt to reach them.', true],
      ['Task Closure Check', 'Flags a task marked reviewed while the technician\'s notes still say the work is not done.', true],
      ['Inspection Remark Check', 'Before a technician saves: "you answered Pass but wrote \'leaking at flange\', is that right?" Never blocks the save, and reuses radar verdicts so only unseen text reaches a model.'],
      ['Approval Health', 'Whether the approval queue is moving: depth, age, who holds it, and which pending items are stale paperwork rather than real decisions.', true],
      ['Attendance Integrity Worklist', 'Separates absences that are a defect in the record from facts about a person, such as days marked absent inside approved leave.', true],
      ['AI Work Queue', 'Everything the radars flagged across FM, CRM, procurement and PM in one list: safety first, then money at stake, then backlog. It empties as it is worked.'],
    ],
  },
  {
    key: 'investigators',
    chap: 'Investigators',
    title: <>Agents that answer <span className="accent">"why is this one stuck?"</span></>,
    lede: 'Tool-using agents that run only when someone clicks. Each chooses its next lookup from what the last one returned, and every tool it holds is a query: they explain and recommend, and cannot change or send anything.',
    items: [
      ['FM Investigator', 'Traces a stuck work order across its quotation, invoice, task and asset history, up to five hops, and names the one action that would move it.'],
      ['Receivables Investigator', 'Tells apart an invoice nobody sent, a customer disputing the amount, and a customer who simply is not paying: three different actions.'],
      ['HR Investigator', 'Separates days nobody punched in, leave that was requested and never actioned, and genuine unexplained absence.'],
      ['Contact Investigator', 'Reads the notes on a closed contact, on top of the SQL facts, to say whether the closure holds and what the person wanted and did not get.'],
      ['Approval Investigator', 'Explains why one approval is undecided. Refuses to spend a token on dead paperwork, and will not suggest chasing an approver who has not decided anything recently.'],
      ['Interview Answer Grader', 'Marks the free-text answers in candidate assessments, which nothing else scored. Proposes a mark and a rationale; a reviewer accepting it is what writes the grade.'],
      ['Agent Assessment', 'A written assessment of one sales agent from their own activity: strengths, concerns and recommended actions.'],
    ],
  },
  {
    key: 'drafters',
    chap: 'Drafters',
    title: <>The message nobody was writing, <span className="accent">and when not to write it.</span></>,
    lede: 'Detection is only half the job: a tagged record still needs someone to compose the message. Every drafter hands text to a person, and the most important behaviour of several is a refusal.',
    items: [
      ['Quotation Chase Drafter', 'Reads how long a quote has been silent, whether the price lapsed and how this customer responds, then drafts in that register. Refuses when a customer has several quotes all unanswered.'],
      ['Quotation Chase Send', 'Queues the draft for a second person to release. The recipient is resolved server-side; do-not-contact and missing emails refuse before anything is queued.'],
      ['PO Chase Drafter', 'Chases a vendor who has not acknowledged an order. Refuses when the job already reached invoicing and tells the buyer to reconcile the record instead.'],
      ['Rent Reminder Drafter', 'Writes in the register of the tenant\'s rung on the dunning ladder. Text only, with no send path, and refuses to draft when the payment data behind it can\'t be trusted.'],
      ['Renewal Offer Drafter', 'Every figure is computed in code from the lease; the model only phrases them, and a read-back flags any figure that was not in the facts.'],
      ['Renewal Rent Suggester', 'The comparable range and midpoint are computed in code; the model explains the basis. With too little data it says so and makes no call.'],
      ['Work Order Writer', 'Writes the summary, trade and priority for automatically raised work orders. Priority can only go up, and a draft with any number not in the record is discarded.'],
      ['SOP Drafter', 'Drafts missing method text for planned maintenance for an engineer to edit and tick. Writes no figures, cites no standards, fills only empty fields.'],
      ['Listing Title Writer', 'House-style titles and a restructured description, checked against the marketing guidelines in code before they are shown.'],
    ],
  },
  {
    key: 'act',
    chap: 'Automations that act',
    title: <>The ones that <span className="accent">do the work.</span></>,
    lede: 'Scheduled, with no one watching. Each starts in dry run or behind a second switch, and none of them contacts a customer, vendor or tenant on its own.',
    items: [
      ['Inspection → Work Order', 'Raises a work order from a failed inspection that has none, through the same conversion path staff use by hand. Rules decide it failed; the radar decides whether it still needs work.'],
      ['Observation → Work Order', 'The same for observation reports read as needing work or a safety risk. Dry run first; work orders land unassigned so nobody outside is notified.'],
      ['Goal Agents', 'Give it a goal and it works through it every morning, then hands what it cannot settle to a person. Nothing reaches a customer, vendor, tenant or partner without an approval.'],
      ['Approved Work Start Nudges', 'Finds work whose quotation was approved but which has not started, nudges the supervisor, and escalates if it still has not moved.', true],
      ['Staff Document Reminders', 'Reminds employees to renew a CPR or passport before it lapses; visas go to HR.', true],
      ['Leave Approval Reminders', 'Reminds whoever\'s turn it is on a stuck leave request. It approves nothing.', true],
      ['Stuck Approval Reminders', 'The same for FM request updates and gate passes, oldest first.', true],
      ['AI Approval Digest', 'Each morning, what AI actions are waiting for a decision and how old the oldest is. Sends nothing when nothing is waiting.', true],
      ['Work Order Stall Digest', 'Weekly, each supervisor\'s own long-idle work orders. Detection is SQL; the model only explains each one, and the digest still sends if that call fails.'],
      ['Daily HOD Summary', 'A 09:00 briefing for each department head, written from that morning\'s figures.'],
    ],
  },
  {
    key: 'readers',
    chap: 'Document readers',
    title: <>The model transcribes. <span className="accent">Code checks.</span></>,
    lede: 'Readers for the paper that arrives every day. They suggest; a person applies the suggestion and saves, and none of them writes a record on its own.',
    items: [
      ['Supplier Bill Reader', 'Holds a supplier invoice against its purchase order: amount, VAT for the tax treatment, supplier TRN, the invoice\'s own arithmetic, and duplicate invoice numbers. Every check is arithmetic in code.'],
      ['HR Document Reader', 'Reads a CPR, passport or visa scan and suggests the type and expiry, and checks a stored record against its own scan.'],
      ['Lease Analyze', 'Suggests the lease fields OCR missed: rent, dates, tenant, deposit, utilities and who pays.'],
      ['Lease PDF Backfill', 'Runs that scan over every active lease in the background and queues findings for review. Applying fills blanks only and never overwrites.'],
      ['Utility Bill Extraction', 'Meter, period, consumption and amount from electricity and district-cooling bills.'],
      ['Valuation Document Parsing', 'Fills the valuation form from a title deed, valuer licence or rent schedule.'],
      ['Valuation AI Pipeline', 'OCR, field extraction, comparable search and the estimate behind a valuation report.'],
    ],
  },
  {
    key: 'helpers',
    chap: 'In-app helpers',
    title: <>A button inside <span className="accent">the screen people already use.</span></>,
    lede: 'A person asks; it answers in place.',
    items: [
      ['Work Order Insights', 'A written read on one work order for the supervisor: where it stands, the risk, what to do next.'],
      ['Technician Guidance', 'On-site steps, safety notes and materials for the technician, translated into Hindi and Urdu.'],
      ['Listing Pre-Publish Review', 'Catches wrong prices and self-contradicting fields before a listing publishes. Advisory; it never blocks a save.'],
      ['Agent Performance Briefing', 'The written briefing behind the sales leaderboard, including an AI-versus-human benchmark.'],
      ['Meeting AI Summary', 'A summary and owned action items from a recorded meeting\'s transcript.'],
      ['Market Intelligence', 'Area prices, listings, distress deals, trends and a daily briefing from the company\'s market data.'],
    ],
  },
  {
    key: 'platform',
    chap: 'Platform controls',
    title: <>What keeps the rest <span className="accent">honest.</span></>,
    lede: 'The pieces that answer "what is the AI doing, and what does it cost?"',
    items: [
      ['Action Checkpoint', 'One gate in front of every AI write and customer send. Diagrams in the platform case study.'],
      ['Autonomous Action Log', 'Every action the executor handled, dispatched, blocked, throttled or failed, with the payload that would have been sent.'],
      ['Ledger Reconciliation', 'Checks every day that the AI cost ledger matches what Anthropic counted, and marks a gap instead of quietly skewing totals.'],
      ['Spend Runway', 'Remaining AI budget, daily burn and runway, derived from billed spend because the provider offers no balance endpoint.'],
      ['MCP Connectors', 'Connectors that let staff query ERP data from a chat client, scoped by department.'],
    ],
  },
  {
    key: 'dealrooms',
    chap: 'DealRooms',
    title: <>An anonymous marketplace, <span className="accent">moderated by a model.</span></>,
    lede: 'DealRooms is a separate product: buyers and sellers negotiate under pseudonyms, with a broker watching.',
    items: [
      ['Message Moderation', 'Reads every message before it sends and blocks contact details or anything else that would break anonymity.'],
      ['Analysis & Escalation', 'Triages each message on a queue behind the chat and escalates what a broker should see. A slow model never delays a message.'],
      ['Convergence Nudges', 'Nudges both sides when their positions converge, with a cooldown so no pair is nudged repeatedly.'],
      ['Terms Sheet Confirmation', 'Reads the agreed terms out of the negotiation and puts them in front of both parties to confirm.'],
      ['Deal Summary', 'The state of a deal in a paragraph, for a broker picking up a room.'],
      ['Ask', 'Answers questions about the marketplace, metered against a daily token budget.'],
    ],
  },
]

const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0)
const NO_MODEL = GROUPS.reduce((n, g) => n + g.items.filter((i) => i[2]).length, 0)

export default function AutomationsCaseStudy() {
  return (
    <CaseStudyLayout
      title="ERP AI Automations · Case Study · Ashrafali M."
      wrapClass="cs-auto sig-scan"
      backHash="#work-automations"
      brandLink
    >
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Case study · № 03</div>
          <h1 className="h1">{TOTAL} AI features,<br/><span className="accent">one operating loop.</span></h1>
          <p className="deck">The AI I built into ASK Real Estate's ERP beyond Layla and the platform: <span className="em">radars that read what staff write, facts that check them, agents that explain, drafters that write the message, and automations that raise the work</span>, across facility management, CRM, procurement, property management, HR and DealRooms. The ERP and its business modules are the wider engineering team's work; these features are the AI I added to them.</p>

          <div className="meta">
            <div className="meta-item"><span className="meta-label">Case study</span><span className="meta-val">№ 03</span></div>
            <div className="meta-item"><span className="meta-label">Domain</span><span className="meta-val">Enterprise ERP · Applied AI</span></div>
            <div className="meta-item"><span className="meta-label">Role</span><span className="meta-val">AI Developer · Design &amp; Implementation</span></div>
            <div className="meta-item"><span className="meta-label">Scope</span><span className="meta-val">6 departments + DealRooms</span></div>
            <div className="meta-item"><span className="meta-label">Status</span><span className="meta-val">Implemented · activation set per feature</span></div>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-num">{TOTAL}</div><div className="stat-label">AI features built</div></div>
            <div className="stat"><div className="stat-num">15</div><div className="stat-label">Signal radars, 14 active and 1 awaiting data</div></div>
            <div className="stat"><div className="stat-num">7</div><div className="stat-label">Read-only investigators</div></div>
            <div className="stat"><div className="stat-num">{NO_MODEL}</div><div className="stat-label">Call no model at all</div></div>
          </div>
        </div>
      </section>
      <ConfidentialityNotice />

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 01 · Context</div>
          <h2 className="section-title reveal">The work wasn't hidden. <span className="accent">It was unwritten.</span></h2>
          <div className="prose reveal">
            <p className="lede">An ERP knows a quotation is "sent" and an invoice is "open". It doesn't know the customer said the contract ended, or that a technician wrote <span className="accent">"unit not working"</span> on a line the checklist passed.</p>
            <p>That knowledge sits in free-text notes, scanned documents and remarks nobody reads twice. The automations here read it, put it where people already look, and do the follow-up nobody was getting round to, without handing the model a decision it shouldn't make.</p>
            <p>Every one of them is listed in the ERP's own AI catalogue with its own switch. Not all are switched on in production: this page lists what I built, not what runs today.</p>
          </div>
          <div className="panel reveal">
            <div className="panel-label">How to read this catalogue</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Implemented</div><div className="pi-val">Every feature listed is built and registered in the ERP's AI catalogue with its own switch.</div></div>
              <div className="panel-item"><div className="pi-label">Enabled in production</div><div className="pi-val">Switched on per feature by the company. This page does not claim any individual item is running unless it says so.</div></div>
              <div className="panel-item"><div className="pi-label">Awaiting data or activation</div><div className="pi-val">Marked with a badge where known. Automations that create records start in dry run.</div></div>
              <div className="panel-item"><div className="pi-label">Illustrative</div><div className="pi-val">Diagrams, the traced quotation and all examples are recreated for this page. No customer, vendor or employee data appears here.</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="arch">
        <div className="arch-inner">
          <div className="chap">// 02 · The loop</div>
          <h2 className="section-title reveal">One chain, traced: <span className="accent">a quotation nobody answered.</span></h2>

          <div className="prose reveal">
            <p>Most of the features fit one loop. Here it is end to end, for a maintenance quotation the customer has gone quiet on.</p>
            <p>In one line: <strong>operational data → signal detection → AI investigation → recommendation → human review → action</strong>, with every model call costed on the way.</p>
          </div>

          <div className="arch-diagram">
            <svg viewBox="0 0 1100 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="loop-title">
              <title id="loop-title">The operating loop: a signal radar tags the record, SQL facts check it, the work queue ranks it, an investigator explains it, a drafter writes the chase, a second person approves it, it is dispatched through the Action Checkpoint, and the ledger records cost and outcome.</title>
              <defs>
                <marker id="lp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M0 0 L10 5 L0 10 z" fill="rgba(184, 255, 60, 0.9)"/>
                </marker>
              </defs>
              <g fontFamily="ui-monospace, Menlo, monospace" fontSize="11">
                <text x="30" y="34" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">DETECT · FREE WHERE POSSIBLE</text>
                <text x="1070" y="34" textAnchor="end" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">EXPLAIN</text>

                <rect x="30" y="50" width="230" height="84" rx="4" fill="rgba(184, 255, 60, 0.08)" stroke="rgba(184, 255, 60, 0.6)"/>
                <text x="46" y="74" fill="#f4f1ec" fontWeight="600">1 · Signal radar</text>
                <text x="46" y="96" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">reads the notes: "awaiting customer"</text>
                <text x="46" y="114" fill="rgba(244, 238, 229, 0.45)" fontSize="9">SQL pre-filter, then the model</text>

                <rect x="300" y="50" width="230" height="84" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.35)"/>
                <text x="316" y="74" fill="#f4f1ec" fontWeight="600">2 · Signal detail</text>
                <text x="316" y="96" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">which quote, how much, how long</text>
                <text x="316" y="114" fill="rgba(244, 238, 229, 0.45)" fontSize="9">SQL facts · marks wrong verdicts</text>

                <rect x="570" y="50" width="230" height="84" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.35)"/>
                <text x="586" y="74" fill="#f4f1ec" fontWeight="600">3 · AI Work Queue</text>
                <text x="586" y="96" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">safety, then money, then backlog</text>
                <text x="586" y="114" fill="rgba(244, 238, 229, 0.45)" fontSize="9">take · snooze · close · dismiss</text>

                <rect x="840" y="50" width="230" height="84" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.35)"/>
                <text x="856" y="74" fill="#f4f1ec" fontWeight="600">4 · Investigator</text>
                <text x="856" y="96" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">"why is this one stuck?"</text>
                <text x="856" y="114" fill="rgba(244, 238, 229, 0.45)" fontSize="9">read-only tools · up to five hops</text>

                <text x="30" y="194" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">RECORD</text>
                <text x="1070" y="194" textAnchor="end" fill="rgba(244, 238, 229, 0.35)" fontSize="9" letterSpacing="2">ACT · A PERSON IN THE LOOP</text>

                <rect x="840" y="210" width="230" height="84" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.35)"/>
                <text x="856" y="234" fill="#f4f1ec" fontWeight="600">5 · Drafter</text>
                <text x="856" y="256" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">writes in the customer's register</text>
                <text x="856" y="274" fill="rgba(255, 184, 77, 0.85)" fontSize="9">or refuses: more silence won't help</text>

                <rect x="570" y="210" width="230" height="84" rx="4" fill="rgba(184, 255, 60, 0.08)" stroke="rgba(184, 255, 60, 0.6)"/>
                <text x="586" y="234" fill="#f4f1ec" fontWeight="600">6 · Approval</text>
                <text x="586" y="256" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">a second person reads the text</text>
                <text x="586" y="274" fill="rgba(244, 238, 229, 0.45)" fontSize="9">named approver · single-use</text>

                <rect x="300" y="210" width="230" height="84" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.35)"/>
                <text x="316" y="234" fill="#f4f1ec" fontWeight="600">7 · Dispatch</text>
                <text x="316" y="256" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">through the Action Checkpoint</text>
                <text x="316" y="274" fill="rgba(244, 238, 229, 0.45)" fontSize="9">recipient resolved server-side</text>

                <rect x="30" y="210" width="230" height="84" rx="4" fill="rgba(244, 238, 229, 0.04)" stroke="rgba(244, 238, 229, 0.35)" strokeDasharray="3 3"/>
                <text x="46" y="234" fill="#f4f1ec" fontWeight="600">8 · Ledger &amp; log</text>
                <text x="46" y="256" fill="rgba(244, 238, 229, 0.6)" fontSize="9.5">every call costed and logged</text>
                <text x="46" y="274" fill="rgba(244, 238, 229, 0.45)" fontSize="9">reconciled daily against Anthropic</text>
              </g>
              <g stroke="rgba(184, 255, 60, 0.75)" strokeWidth="1.2" fill="none">
                <path d="M260 92 L294 92" markerEnd="url(#lp-arr)"/>
                <path d="M530 92 L564 92" markerEnd="url(#lp-arr)"/>
                <path d="M800 92 L834 92" markerEnd="url(#lp-arr)"/>
                <path d="M955 134 L955 204" markerEnd="url(#lp-arr)"/>
                <path d="M840 252 L806 252" markerEnd="url(#lp-arr)"/>
                <path d="M570 252 L536 252" markerEnd="url(#lp-arr)"/>
                <path d="M300 252 L266 252" markerEnd="url(#lp-arr)" strokeDasharray="3 3"/>
              </g>
            </svg>
          </div>
          <p className="diagram-note">Recreated conceptual diagram. The quotation example is fictional.</p>

          <div className="prose" style={{ marginTop: '3rem' }}>
            <p>Steps 1 to 4 inform: they flag, explain and recommend, and a person decides. Steps 5 to 7 act, and each has a person in it. Step 8 is why the AI spend on all of it is a number someone can trust.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">// 03 · Rules</div>
          <h2 className="section-title reveal">Six rules <span className="accent">that recur in all of it.</span></h2>

          <div className="layers">
            <div className="layer reveal">
              <div className="layer-num">01</div>
              <div>
                <div className="layer-title">Detect in SQL, <span className="accent">explain with a model.</span></div>
                <div className="layer-body">Where a column can answer, a query answers, for free and the same way twice. The stall digest finds idle work orders with a status filter and asks the model only to say why. If that call fails, the digest still sends.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">02</div>
              <div>
                <div className="layer-title">Code computes, <span className="accent">the model phrases.</span></div>
                <div className="layer-body">Renewal offers, rent suggestions and supplier bill checks compute every figure in code. A read-back flags any number in the text that was not in the facts, and the work order writer throws a draft away for the same reason.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">03</div>
              <div>
                <div className="layer-title">Facts that can <span className="accent">contradict the model.</span></div>
                <div className="layer-body">A radar reads notes and can't see the tables, so the SQL detail under it marks a wrong verdict as contradicted rather than dressing it in convincing facts.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">04</div>
              <div>
                <div className="layer-title">Refusal is <span className="accent">a feature.</span></div>
                <div className="layer-body">The PO chase drafter won't write to a vendor whose job already reached invoicing. The quotation chaser won't add one more message to a customer ignoring several. The approval investigator won't investigate dead paperwork. The rent drafter won't run on payment data it can't trust.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">05</div>
              <div>
                <div className="layer-title">Suggest, <span className="accent">never write.</span></div>
                <div className="layer-body">Readers, graders and reviewers propose; a person applies and saves. Backfills fill blanks and never overwrite a stored value.</div>
              </div>
            </div>
            <div className="layer reveal">
              <div className="layer-num">06</div>
              <div>
                <div className="layer-title">Dry run, <span className="accent">then a second switch.</span></div>
                <div className="layer-body">Automations that create records log what they would have done before they are allowed to do it, and land their work unassigned so nobody outside the company is notified by a mistake.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {GROUPS.map((g, gi) => (
        <section className="section" key={g.key}>
          <div className="section-inner">
            <div className="chap">// {String(gi + 4).padStart(2, '0')} · {g.chap} · {g.items.length}</div>
            <h2 className="section-title reveal">{g.title}</h2>
            <div className="prose reveal"><p>{g.lede}</p></div>
            <div className="panel reveal">
              <div className="panel-grid">
                {g.items.map(([name, line, nomodel, status]) => (
                  <div className="panel-item" key={name}>
                    <div className="pi-label">{name}{nomodel && <span className="nomodel">no model</span>}{status && <span className="status-badge">{status}</span>}</div>
                    <div className="pi-val">{line}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="lessons">
        <div className="lessons-inner">
          <div className="chap">// {String(GROUPS.length + 4).padStart(2, '0')} · Reflections</div>
          <h2 className="section-title reveal">What building <span className="accent">{TOTAL} of these taught me.</span></h2>
          <ol className="lessons-list">
            <li className="reveal">
              <span className="lesson-num">i.</span>
              <div className="lesson-text">The gap is rarely detection. A flag says a record needs attention; value comes from doing the next step: writing the message, raising the work order, naming the one action.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">ii.</span>
              <div className="lesson-text"><span className="accent">Some of the best AI features call no model.</span> {NO_MODEL} of these are SQL and templates, and they are the ones that check the others.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iii.</span>
              <div className="lesson-text">Teach an agent when to refuse before you teach it to write. One more message into the same silence changes nothing.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iv.</span>
              <div className="lesson-text">Put the answer where people already look: a chip on the list they use every day beats a dashboard nobody opens.</div>
            </li>
          </ol>
        </div>
      </section>

      <section className="end">
        <div className="end-inner">
          <span className="end-eyebrow">End of case study · № 03</span>
          <h2 className="end-title">Have records nobody is <span className="accent">reading twice</span>?</h2>
          <div className="end-links">
            <a className="btn btn-fill" href="mailto:ashrafali31018@gmail.com">Email</a>
            <a className="btn btn-ghost" href="https://www.linkedin.com/in/ashrafali-m-769b25246" target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn btn-ghost" href="#/case/askre">The AI platform</a>
            <a className="btn btn-ghost" href="#work-automations">More work</a>
          </div>
          <div className="end-meta">
            <span>© {new Date().getFullYear()} · Ashrafali M.</span>
            <span>ERP AI Automations · Case Study № 03</span>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
