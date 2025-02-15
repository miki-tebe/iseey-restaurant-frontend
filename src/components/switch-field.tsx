import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SwitchFieldProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  onClick?: () => void;
}

export const SwitchField = ({
  id,
  checked,
  onCheckedChange,
  label,
  onClick,
}: SwitchFieldProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        onClick={onClick}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};
