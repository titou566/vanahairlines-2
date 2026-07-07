import Chip from './Chip.jsx';

/** En-tête de section : eyebrow mono + titre display + sous-titre. */
export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center';
  return (
    <div className={`flex flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <Chip>{eyebrow}</Chip>}
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="max-w-2xl text-foam/60 leading-relaxed">{subtitle}</p>}
    </div>
  );
}
