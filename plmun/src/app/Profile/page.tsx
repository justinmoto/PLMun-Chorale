import ProtectedRoute from '@/components/ProtectedRoute'
import ApplicationDashboard from '@/components/UserProfile'

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ApplicationDashboard />
    </ProtectedRoute>
  )
}