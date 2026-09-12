import { useState } from 'react';
import Icon from '../common/Icon';

export default function FAQAccordion({ items, initialOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(initialOpen);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div className={`acc-item ${open ? 'open' : ''}`} key={item.q}>
            <button className="acc-q" aria-expanded={open} onClick={() => setOpenIndex(open ? -1 : i)}>
              <span>{item.q}</span>
              <span className="pm">
                <Icon name="cdown" className="icon icon-sm" />
              </span>
            </button>
            <div className="acc-a">
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
