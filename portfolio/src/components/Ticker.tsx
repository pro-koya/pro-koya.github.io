const ITEMS = [
  'MOVE',
  'GROW',
  'SHARE',
  'BUILD',
  'よく動き、よく食べ、よくつくる',
  'EST. KOYA',
  'PERSONAL FIELD',
  'NO.001',
];

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker">
      <div className="ticker-inner">
        {doubled.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
}
