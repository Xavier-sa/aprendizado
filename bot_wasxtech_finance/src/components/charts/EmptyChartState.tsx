export function EmptyChartState({ message }: { message: string }) {
  return (
    <p className="flex h-72 items-center justify-center px-6 text-center text-sm text-text-muted">
      {message}
    </p>
  );
}
