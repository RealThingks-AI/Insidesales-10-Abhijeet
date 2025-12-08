
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useUserRole = () => {
  const [userRole, setUserRole] = useState<string>('user');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setUserRole('user');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching role for user:', user.id, user.email);
        
        // Query the user_roles table for the user's role
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user role from user_roles table:', error);
          // Fallback to user_metadata if table query fails
          const metadataRole = user.user_metadata?.role || 'user';
          console.log('Fallback to user_metadata role:', metadataRole);
          setUserRole(metadataRole);
        } else if (data) {
          console.log('User role from user_roles table:', data.role);
          setUserRole(data.role);
        } else {
          // No role found in table, fallback to metadata or default
          const metadataRole = user.user_metadata?.role || 'user';
          console.log('No role in table, fallback to metadata:', metadataRole);
          setUserRole(metadataRole);
        }
      } catch (error) {
        console.error('Error in fetchUserRole:', error);
        setUserRole('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  const isAdmin = userRole === 'admin';
  const isManager = userRole === 'manager';
  const canEdit = isAdmin || isManager;
  const canDelete = isAdmin;
  const canManageUsers = isAdmin;
  const canAccessSettings = isAdmin;

  return {
    userRole,
    isAdmin,
    isManager,
    canEdit,
    canDelete,
    canManageUsers,
    canAccessSettings,
    loading
  };
};
