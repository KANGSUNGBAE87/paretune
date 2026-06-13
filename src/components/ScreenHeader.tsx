type ScreenHeaderProps = {
  title?: string;
  subtitle?: string;
  kicker?: string;
};

export function ScreenHeader({ title, subtitle, kicker }: ScreenHeaderProps) {
  return (
    <header className="screen-header">
      {kicker ? <p className="kicker">{kicker}</p> : null}
      {title ? <h1>{title}</h1> : null}
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  );
}
