import "./dashboard.css";
import { Toaster } from 'react-hot-toast';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dashboard-container">
    {children}
    <Toaster position="top-center" reverseOrder={false} />
    </div>;
}
