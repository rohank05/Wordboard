import ProtectedRoute from "../auth-guard/ProtectedRoute";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
	return (
		<ProtectedRoute allowedRoles={['admin','user']}>
			<Dashboard />
		</ProtectedRoute>
	);
}
