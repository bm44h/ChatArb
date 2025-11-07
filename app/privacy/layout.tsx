import "./privacy.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="privacy-container">{children}</div>;
}
