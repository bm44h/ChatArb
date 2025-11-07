import "./use.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="use-container">{children}</div>;
}
