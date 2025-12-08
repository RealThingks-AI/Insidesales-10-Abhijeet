import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface PagePermission {
  id: string;
  page_name: string;
  route: string;
  admin_access: boolean;
  manager_access: boolean;
  user_access: boolean;
}

export const usePageAccess = (route: string) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkAccess = useCallback(async () => {
    if (!user) {
      setHasAccess(false);
      setLoading(false);
      return;
    }

    try {
      // Get user role from user_roles table (more reliable than metadata)
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      // Fallback to metadata if no role in table
      const userRole = roleData?.role || user.user_metadata?.role || 'user';
      console.log('usePageAccess - User role:', userRole, 'for route:', route);

      // Get page permission for this route
      const { data: permissionData, error: permissionError } = await supabase
        .from('page_permissions')
        .select('*')
        .eq('route', route)
        .single();

      if (permissionError) {
        console.log('No permission found for route:', route, '- allowing access by default');
        // If no permission record exists, allow access
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check access based on user role
      let canAccess = false;
      switch (userRole) {
        case 'admin':
          canAccess = permissionData.admin_access;
          break;
        case 'manager':
          canAccess = permissionData.manager_access;
          break;
        case 'user':
        default:
          canAccess = permissionData.user_access;
          break;
      }

      console.log('usePageAccess - Permission check:', { route, userRole, canAccess, permissionData });
      setHasAccess(canAccess);
    } catch (error) {
      console.error('Error checking page access:', error);
      // On error, default to allowing access to prevent lockouts
      setHasAccess(true);
    } finally {
      setLoading(false);
    }
  }, [user, route]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return { hasAccess, loading, refetch: checkAccess };
};

export const useAllPagePermissions = () => {
  const [permissions, setPermissions] = useState<PagePermission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const { data, error } = await supabase
          .from('page_permissions')
          .select('*');

        if (error) throw error;
        setPermissions(data || []);
      } catch (error) {
        console.error('Error fetching page permissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  return { permissions, loading };
};
