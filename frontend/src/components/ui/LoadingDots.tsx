export function LoadingDots() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <span className="animate-dot h-2.5 w-2.5 rounded-full bg-current" />
      <span className="animate-dot h-2.5 w-2.5 rounded-full bg-current" />
      <span className="animate-dot h-2.5 w-2.5 rounded-full bg-current" />
    </div>
  );
}
