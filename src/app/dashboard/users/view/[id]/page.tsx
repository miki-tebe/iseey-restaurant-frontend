"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ViewUser({ params }: { params: { id: string } }) {
  console.log(params.id);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Profile</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center space-y-4 pt-5">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/images/logo4.png" alt="Profile picture" />
                <AvatarFallback>KA</AvatarFallback>
              </Avatar>
            </div>
            <h2 className="text-2xl font-bold">Kaleb-Admin</h2>
          </CardContent>
        </Card>
        <div className="grid gap-4 col-span-2">
          <Card>
            <CardContent className="space-y-5 pt-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>First Name</Label>
                  <Input disabled />
                </div>
                <div className="grid gap-1.5">
                  <Label>Last Name</Label>
                  <Input disabled />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Description</Label>
                <Textarea disabled />
              </div>
              <div className="grid gap-1.5">
                <Label>Address</Label>
                <Input disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <Label>Date of Birth</Label>
                  <Input type="date" disabled />
                </div>
                <div className="grid gap-1.5">
                  <Label>Gender</Label>
                  <Input disabled />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label>Email Address</Label>
                <Input type="email" disabled />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
