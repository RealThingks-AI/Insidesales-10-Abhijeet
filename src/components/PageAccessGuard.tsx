import { Navigate, useLocation } from 'react-router-dom';
import { usePageAccess } from '@/hooks/usePageAccess';
import { ShieldAlert } from 'lucide-react';

interface PageAccessGuardProps {
  children: React.ReactNode;
}

const PageAccessGuard = ({ children }: PageAccessGuardProps) => {
  const location = useLocation();
  const { hasAccess, loading } = usePageAccess(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  if (hasAccess === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <ShieldAlert className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageAccessGuard;
