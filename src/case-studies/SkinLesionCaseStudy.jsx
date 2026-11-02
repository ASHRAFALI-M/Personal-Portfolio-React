import CaseStudyLayout from './CaseStudyLayout.jsx'

export default function SkinLesionCaseStudy() {
  return (
    <CaseStudyLayout
      title="Skin Lesion Classification · Case Study · Ashrafali M."
      wrapClass="cs-skin sig-scan"
      backHash="#work-skin-lesion"
    >
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Case study · Research internship · 2024-25</div>
          <h1 className="h1">Teaching a small model to<br/>read a <span className="accent">skin lesion</span></h1>
          <p className="deck">A seven-class skin lesion classifier built during my ML research internship at NIT Tiruchirappalli, on 35,000 skin lesion images, with PCA and t-SNE used to see what the features were actually learning.</p>

          <div className="meta">
            <div className="meta-item"><span className="meta-label">Context</span><span className="meta-val">ML research internship</span></div>
            <div className="meta-item"><span className="meta-label">Role</span><span className="meta-val">Research intern</span></div>
            <div className="meta-item"><span className="meta-label">Year</span><span className="meta-val">2024-25</span></div>
            <div className="meta-item"><span className="meta-label">Institution</span><span className="meta-val">NIT Tiruchirappalli</span></div>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-num">7</div><div className="stat-label">Lesion classes</div></div>
            <div className="stat"><div className="stat-num">84.5%</div><div className="stat-label">Accuracy</div></div>
            <div className="stat"><div className="stat-num">35K</div><div className="stat-label">Skin lesion images</div></div>
            <div className="stat"><div className="stat-num">95%</div><div className="stat-label">Variance retained by PCA</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">01 · The problem</div>
          <div className="prose reveal">
            <p>Skin cancer is the most common cancer worldwide, and with the aggressive types like melanoma, the gap between early and late diagnosis is the gap between a minor procedure and a life-threatening one. The clinical challenge is that many lesions look alike to an untrained eye, and dermatologists are not evenly distributed across the places that need them.</p>
          </div>
          <div className="prose reveal">
            <p>The goal for this project was narrow and honest: sort a skin lesion image into one of <b>seven classes</b>, and understand what the model was learning rather than just score it. A tool for a first look, not a replacement for a biopsy.</p>
          </div>
          <div className="quote reveal">An accuracy number tells you how often a model is right. It doesn't tell you why.</div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">02 · What I built</div>
          <div className="prose reveal">
            <p>The work used <b>35,000 skin lesion images</b> across seven classes. Image features are high-dimensional, far more than anyone can inspect directly, so the feature space was reduced with <b>PCA</b>, keeping <b>95% of the variance</b>, and then visualised with <b>t-SNE</b> to see how the classes sit relative to each other.</p>
          </div>
          <div className="prose reveal">
            <p>The classifier reached <b>84.5% accuracy</b> across the seven lesion classes.</p>
          </div>

          <div className="panel reveal">
            <div className="panel-label">The stack, honestly</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Data</div><div className="pi-val">35,000 skin lesion images, seven classes</div></div>
              <div className="panel-item"><div className="pi-label">Dimensionality reduction</div><div className="pi-val">PCA, 95% of the variance retained</div></div>
              <div className="panel-item"><div className="pi-label">Visualisation</div><div className="pi-val">t-SNE on the reduced feature space to inspect class separation</div></div>
              <div className="panel-item"><div className="pi-label">Result</div><div className="pi-val">84.5% accuracy across seven classes</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">One decision that mattered</div>
          <h2 className="section-title reveal">Using PCA and t-SNE to see the features, <span className="accent">not just score them</span></h2>
          <div className="prose reveal">
            <p>The easy version of this project stops at an accuracy number. But an accuracy number tells you nothing about <b>why</b> the model is right, or where it's about to be wrong. So before trusting any metric, I projected the learned feature space down with <b>PCA</b> for a fast linear overview and <b>t-SNE</b> for the non-linear structure, and looked at whether the seven classes actually formed separable clusters.</p>
          </div>
          <div className="prose reveal">
            <p>That visual check is what turns a black-box score into something you can reason about and defend: if the classes don't separate in the feature space, a good accuracy number deserves suspicion.</p>
          </div>
        </div>
      </section>

      <section className="section challenge">
        <div className="section-inner">
          <div className="chal-num">03</div>
          <h2 className="chal-title">The hard part</h2>
          <div className="cprob">Too many dimensions to see anything</div>
          <div className="chal-body reveal">
            <p>Image features live in a space with far more dimensions than a person can look at, and t-SNE run directly on raw high-dimensional features is slow and noisy. The question was how to shrink the space without throwing away what makes the classes different.</p>
          </div>
          <div className="chal-body reveal">
            <p>The answer was <span className="k">PCA</span> first, keeping <b>95% of the variance</b>, then <span className="k">t-SNE</span> on the reduced space. PCA keeps almost all of the information in far fewer dimensions; t-SNE then has a smaller, cleaner space in which to show whether the seven classes form separate groups.</p>
          </div>
        </div>
      </section>

      <section className="band reveal">
        <div className="band-cell"><div className="band-num">84.5%</div><div className="band-label">Accuracy</div></div>
        <div className="band-cell"><div className="band-num">7</div><div className="band-label">Lesion classes</div></div>
        <div className="band-cell"><div className="band-num">35K</div><div className="band-label">Skin lesion images</div></div>
      </section>

      <section className="section">
        <p className="footnote reveal">PCA retained 95% of the variance before the t-SNE visualisation.</p>
      </section>

      <section className="lessons">
        <div className="lessons-inner">
          <div className="chap">04 · What it taught me</div>
          <ol className="lessons-list">
            <li className="reveal">
              <span className="lesson-num">i.</span>
              <div className="lesson-text"><b>The number is the least interesting part.</b> A view of the feature space says more about a model than its accuracy does. I now reach for a visualization of the feature space before I trust any headline metric.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">ii.</span>
              <div className="lesson-text"><b>How much to throw away is a decision.</b> Dimensionality reduction always loses something. Choosing the line explicitly, 95% of the variance here, beats accepting a default and hoping it didn't matter.</div>
            </li>
          </ol>
        </div>
      </section>

      <section className="end">
        <div className="end-inner">
          <div className="end-eyebrow">If I built it again</div>
          <h2 className="end-title">I'd report per-class results alongside the headline accuracy, and test the classifier on images from outside the training sources before trusting the number.</h2>
          <div className="end-links">
            <a className="btn btn-fill" href="mailto:ashrafali31018@gmail.com">Get in touch</a>
            <a className="btn btn-ghost" href="#work-skin-lesion">&larr; All work</a>
          </div>
          <div className="end-meta">
            <span>ML research internship · NIT Tiruchirappalli · Sep 2024 to Mar 2025<br/>
            Research work · not a maintained production system</span>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
