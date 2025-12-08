import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Shield, FileText, Lock, Database } from "lucide-react";
import UserManagement from "@/components/UserManagement";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AuditLogsSettings from "@/components/settings/AuditLogsSettings";
import PageAccessSettings from "@/components/settings/PageAccessSettings";
import BackupRestoreSettings from "@/components/settings/BackupRestoreSettings";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("user-management");
  return <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-foreground mb-2 text-2xl">Admin Panel</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 gap-1">
          <TabsTrigger value="user-management" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">User & Access Management</span>
          </TabsTrigger>
          <TabsTrigger value="page-access" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Page Access</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            <span className="hidden sm:inline">Backup</span>
          </TabsTrigger>
          <TabsTrigger value="audit-logs" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Logs</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="user-management" className="mt-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="page-access" className="mt-6">
          <PageAccessSettings />
        </TabsContent>

        <TabsContent value="backup" className="mt-6">
          <BackupRestoreSettings />
        </TabsContent>

        <TabsContent value="audit-logs" className="mt-6">
          <AuditLogsSettings />
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>;
};
export default Settings;