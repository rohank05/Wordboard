import ProtectedRoute from "../auth/authGuard/protectedRoute";
import Dashboard from "./_partials/dashboard";

export default function DashboardPage() {
	return (
		<ProtectedRoute allowedRoles={['admin','user']}>
			<Dashboard />
		</ProtectedRoute>
	);
}
