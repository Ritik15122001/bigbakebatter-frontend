import { useState } from 'react';
import Modal from '../common/Modal';
import Icon from '../common/Icon';
import { SLOTS } from '../../store/orderStore';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function buildDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

export default function DeliveryCalendarModal({ open, onClose, date, slot, onPick }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [monthDate, setMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [pickedDate, setPickedDate] = useState(date);
  const [pickedSlot, setPickedSlot] = useState(slot);

  const days = buildDays(monthDate);
  const monthLabel = monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <Modal
      open={open}
      onClose={onClose}
      kicker="Delivery"
      title="Choose date & slot"
      foot={
        <button className="btn btn-primary btn-block" disabled={!pickedDate || !pickedSlot} onClick={() => onPick(pickedDate, pickedSlot)}>
          Confirm delivery slot
        </button>
      }
    >
      <div className="cal">
        <div className="cal-head">
          <button className="btn-icon" aria-label="Previous month" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1))}>
            <Icon name="cleft" className="icon icon-sm" />
          </button>
          <b className="small">{monthLabel}</b>
          <button className="btn-icon" aria-label="Next month" onClick={() => setMonthDate(new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1))}>
            <Icon name="cright" className="icon icon-sm" />
          </button>
        </div>
        <div className="cal-grid">
          {DOW.map((d, i) => (
            <span className="cal-dow" key={i}>{d}</span>
          ))}
          {days.map((d, i) => {
            if (!d) return <span key={i} />;
            const isPast = d < today;
            const isToday = d.getTime() === today.getTime();
            const isOn = pickedDate && d.getTime() === new Date(pickedDate).setHours(0, 0, 0, 0);
            return (
              <button
                key={i}
                className={`cal-day ${isOn ? 'on' : ''} ${isToday ? 'today' : ''}`}
                disabled={isPast}
                onClick={() => setPickedDate(d)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="field" style={{ marginTop: 20 }}>
        <label>Delivery slot</label>
        <div className="opt-row">
          {SLOTS.map((s) => (
            <button key={s} className={`opt ${pickedSlot === s ? 'on' : ''}`} onClick={() => setPickedSlot(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
