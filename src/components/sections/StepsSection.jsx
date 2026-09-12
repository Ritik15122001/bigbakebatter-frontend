import Reveal from '../common/Reveal';
import SectionHead from '../common/SectionHead';

const STEPS = [
  { n: '01', title: 'Pick your cake', text: 'Thirty-two signature bakes across twelve categories.' },
  { n: '02', title: 'Choose weight & date', text: 'Add a message, pick a date and a two-hour slot.' },
  { n: '03', title: 'Pay securely', text: 'UPI, card, net banking, or cash at the door.' },
  { n: '04', title: 'Freshly delivered', text: 'Baked that morning, boxed cold, on time.' },
];

export default function StepsSection() {
  return (
    <section className="section-tight">
      <div className="container">
        <Reveal>
          <SectionHead kicker="How it works" title="From cart to candles in four steps" />
        </Reveal>
        <Reveal className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <span className="n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
