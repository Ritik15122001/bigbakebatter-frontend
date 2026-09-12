import { useReveal } from '../../hooks/useReveal';

export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useReveal();
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
