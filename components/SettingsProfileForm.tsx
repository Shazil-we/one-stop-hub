"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requestRoleAction, updateProfileNameAction } from "@/app/actions/settingsActions";
import type { Requests } from "@/Queries/Requests";

interface SettingsProfileFormProps {
  fullName: string;
  email: string;
  role: "Student" | "SocietyHead" | "Administrator";
  requestHistory: Requests[];
}

export default function SettingsProfileForm({
  fullName,
  email,
  role,
  requestHistory,
}: SettingsProfileFormProps) {
  const [nameStatus, setNameStatus] = useState<string>("");
  const [roleStatus, setRoleStatus] = useState<string>("");

  const pendingAdmin = requestHistory.some(
    (request) => request.requested_role === "Administrator" && request.status === "Pending"
  );
  const pendingSocietyHead = requestHistory.some(
    (request) => request.requested_role === "SocietyHead" && request.status === "Pending"
  );

  const handleNameSubmit = async (formData: FormData) => {
    const result = await updateProfileNameAction(formData);
    setNameStatus(result.success ? "Profile updated." : result.error || "Could not update profile.");
  };

  const handleRoleSubmit = async (formData: FormData) => {
    const result = await requestRoleAction(formData);
    setRoleStatus(result.success ? "Role request submitted." : result.error || "Could not submit request.");
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your account name used across the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleNameSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" defaultValue={fullName} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled readOnly />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Save profile</Button>
              {nameStatus && <p className="text-sm text-muted-foreground">{nameStatus}</p>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Requests</CardTitle>
          <CardDescription>Request elevated access as Administrator or Society Head.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <form action={handleRoleSubmit}>
              <input type="hidden" name="requestedRole" value="Administrator" />
              <Button type="submit" disabled={role === "Administrator" || pendingAdmin}>
                Request Administrator
              </Button>
            </form>
            <form action={handleRoleSubmit}>
              <input type="hidden" name="requestedRole" value="SocietyHead" />
              <Button type="submit" variant="outline" disabled={role === "SocietyHead" || pendingSocietyHead}>
                Request Society Head
              </Button>
            </form>
            {role === "Administrator" && (
              <Link href="/dashboard/settings/manage-user">
                <Button variant="secondary">Manage Users</Button>
              </Link>
            )}
          </div>
          {roleStatus && <p className="text-sm text-muted-foreground">{roleStatus}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
