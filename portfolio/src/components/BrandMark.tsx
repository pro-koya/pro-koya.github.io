interface BrandMarkProps {
  readonly size?: number;
  readonly tone?: 'ink' | 'paper' | 'rust';
  readonly className?: string;
}

export function BrandMark({
  size = 22,
  tone = 'ink',
  className = '',
}: BrandMarkProps) {
  const classes = ['brand-mark', `brand-mark--${tone}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <span
      aria-hidden="true"
      className={classes}
      style={{ width: size, height: size }}
    />
  );
}
