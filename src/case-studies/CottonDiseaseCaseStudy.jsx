import CaseStudyLayout from './CaseStudyLayout.jsx'

export default function CottonDiseaseCaseStudy() {
  return (
    <CaseStudyLayout
      title="Cotton Leaf Disease Classification · Case Study · Ashrafali M."
      wrapClass="cs-cotton sig-heat"
      backHash="#work-cotton"
    >
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Case study · Academic · Smart Agriculture</div>
          <h1 className="h1">Reading disease off a<br/><span className="accent">cotton leaf</span></h1>
          <p className="deck">A four-class cotton leaf disease classifier built on ResNet101V2 transfer learning, then made to show its work with Grad-CAM heatmaps, so a diagnosis comes with a reason a farmer can see.</p>

          <div className="meta">
            <div className="meta-item"><span className="meta-label">Context</span><span className="meta-val">Smart-agriculture project</span></div>
            <div className="meta-item"><span className="meta-label">Role</span><span className="meta-val">Model &amp; explainability</span></div>
            <div className="meta-item"><span className="meta-label">Domain</span><span className="meta-val">Crop disease detection</span></div>
            <div className="meta-item"><span className="meta-label">Aim</span><span className="meta-val">Low-cost field diagnosis</span></div>
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-num">4</div><div className="stat-label">Disease classes</div></div>
            <div className="stat"><div className="stat-num">~95%</div><div className="stat-label">Validation accuracy</div></div>
            <div className="stat"><div className="stat-num">1,709</div><div className="stat-label">Leaf images</div></div>
            <div className="stat"><div className="stat-num">Grad-CAM</div><div className="stat-label">Explainability</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">01 · The problem</div>
          <div className="prose reveal">
            <p>Cotton is one of the most disease-sensitive crops a smallholder can grow, and the difference between catching bacterial blight early and catching it late is often the difference between a treatable patch and a lost field. The people who most need fast diagnosis are the least likely to have an agronomist on call, or reliable connectivity to reach one.</p>
          </div>
          <div className="prose reveal">
            <p>The goal was a model that could look at a photo of a cotton leaf and name the disease, across four classes including <b>bacterial blight</b>, accurately enough to be useful and light enough to eventually run on a cheap phone in a field. But accuracy alone isn't trust: a farmer shown only a label has no reason to believe it. So the real target was a diagnosis <b>plus a visible reason</b>.</p>
          </div>
          <div className="quote reveal">A label a farmer can't question is a label a farmer won't trust. The heatmap is the part that earns belief.</div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">02 · What I built</div>
          <div className="prose reveal">
            <p>The dataset was a public cotton leaf collection of <b>1,709 images across four classes</b>, split 80/20 into 1,369 training and 340 validation images. That's a small dataset by deep-learning standards, which drove the central choice: rather than train a network from scratch and overfit almost immediately, I used <b>transfer learning</b> on a <span className="s">ResNet101V2</span> pre-trained on ImageNet, froze its convolutional base, and trained only a lightweight head, a global-average-pooling layer, a 128-unit dense layer, and a softmax over the four classes.</p>
          </div>
          <div className="prose reveal">
            <p>To stretch the small dataset I augmented with horizontal flips, rotation, and zoom, and used <span className="k">early stopping</span> on validation loss so the model kept its best weights rather than its last. Training with Adam at a deliberately low <span className="k">1e-4</span> learning rate, it settled around <b>95% validation accuracy</b> with the loss still trending down when stopping kicked in.</p>
          </div>

          <div className="panel reveal">
            <div className="panel-label">The stack, honestly</div>
            <div className="panel-grid">
              <div className="panel-item"><div className="pi-label">Data</div><div className="pi-val">Public cotton leaf dataset, 4 classes, 1,709 images, 80/20 split</div></div>
              <div className="panel-item"><div className="pi-label">Model</div><div className="pi-val">ResNet101V2 transfer learning, frozen base + custom head, TensorFlow / Keras</div></div>
              <div className="panel-item"><div className="pi-label">Training</div><div className="pi-val">Adam 1e-4, augmentation, early stopping on val loss</div></div>
              <div className="panel-item"><div className="pi-label">Interpretability</div><div className="pi-val">Grad-CAM heatmaps over the final conv block</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="chap">One decision that mattered</div>
          <h2 className="section-title reveal">Grad-CAM, so the model has to <span className="accent">point at the lesion</span></h2>
          <div className="prose reveal">
            <p>A 95% classifier is easy to fool yourself with. On a small dataset it can quietly learn the <b>wrong</b> thing, lighting, leaf angle, a watermark, and still score well, right up until it meets a real photo. The only honest way to know what it learned is to make it show where it looked.</p>
          </div>
          <div className="prose reveal">
            <p>So I added <b>Grad-CAM</b>, which projects the gradient of the predicted class back onto the last convolutional layer and produces a heatmap of the pixels that drove the decision. Overlaid on the leaf, a correct model lights up the <b>diseased tissue itself</b>, not the background. That turns the tool from "trust the number" into "look where it's looking", which is exactly the reason a farmer, or an agronomist checking it, would believe a diagnosis.</p>
          </div>
        </div>
      </section>

      <section className="section challenge">
        <div className="section-inner">
          <div className="chal-num">03</div>
          <h2 className="chal-title">The hard part</h2>
          <div className="cprob">A heatmap that came back as garbage</div>
          <div className="chal-body reveal">
            <p>Getting the classifier to 95% was the easy half. The Grad-CAM was where it fought back. The first runs produced a broken heatmap, an <span className="k">invalid value in cast</span> warning and a map full of NaNs instead of a clean overlay. Two bugs were stacked on top of each other.</p>
          </div>
          <div className="chal-body reveal">
            <p>The first was mundane but blocking: the predicted class came out of <span className="k">argmax</span> as a NumPy array, and it had to be forced to a true Python integer before it could index the class-specific loss, otherwise the gradient tape was computing against the wrong target. The second was numerical: when the raw heatmap's maximum was zero or negative, normalizing by it divided by zero and poisoned the whole array. Fixing it meant clamping to positive activations before the normalize, and being careful about the exact convolutional layer <span className="k">(conv5_block3_out)</span> the gradients were pulled from. Only once both were right did the overlay actually land on the lesion.</p>
          </div>
        </div>
      </section>

      <section className="band reveal">
        <div className="band-cell"><div className="band-num">~95%</div><div className="band-label">Validation accuracy</div></div>
        <div className="band-cell"><div className="band-num">4</div><div className="band-label">Disease classes</div></div>
        <div className="band-cell"><div className="band-num">0.169</div><div className="band-label">Best validation loss</div></div>
      </section>

      <section className="section">
        <p className="footnote reveal">Measured on the 20% held-out validation set (340 images). Peak 95.6% at epoch 19; best weights restored by early stopping.</p>
      </section>

      <section className="lessons">
        <div className="lessons-inner">
          <div className="chap">04 · What it taught me</div>
          <ol className="lessons-list">
            <li className="reveal">
              <span className="lesson-num">i.</span>
              <div className="lesson-text"><b>Transfer learning is how you win on a small dataset.</b> With 1,700 images, a frozen ImageNet backbone plus a small trainable head reached 95% where a from-scratch network would have overfit. Knowing when <i>not</i> to train the whole model is the skill.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">ii.</span>
              <div className="lesson-text"><b>Explainability is a debugging tool, not just a UI feature.</b> Grad-CAM's whole value is confirming the model looks at the disease and not the background. Building it also taught me that interpretability code has its own sharp edges, the NaN heatmap took longer to fix than the model took to train.</div>
            </li>
            <li className="reveal">
              <span className="lesson-num">iii.</span>
              <div className="lesson-text"><b>The last mile is deployment.</b> A high-accuracy <span className="k">.h5</span> model in a notebook isn't a tool a farmer can use. The gap between "works on Kaggle" and "runs on a phone in a field" is where the real engineering, and the honest scope of this project, sits.</div>
            </li>
          </ol>
        </div>
      </section>

      <section className="end">
        <div className="end-inner">
          <div className="end-eyebrow">If I built it again</div>
          <h2 className="end-title">I'd collect real field photos in the conditions the model will actually meet, then finish the last mile, converting to a mobile-ready format and validating that the accuracy survives the phone.</h2>
          <div className="end-links">
            <a className="btn btn-fill" href="mailto:ashrafali31018@gmail.com">Get in touch</a>
            <a className="btn btn-ghost" href="#work-cotton">&larr; All work</a>
          </div>
          <div className="end-meta">
            <span>Academic smart-agriculture project<br/>
            ResNet101V2 transfer learning · Grad-CAM explainability · TensorFlow / Keras<br/>
            Research prototype · not a deployed production system</span>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  )
}
