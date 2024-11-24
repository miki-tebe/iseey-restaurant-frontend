"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePurchaseTableStand } from "@/hooks/use-purchase-table-stand";
import { useSubscribePlan } from "@/hooks/use-subscribe-plan";
import { createTableStand } from "@/app/actions";

export function PurchaseAlertDialog() {
  const { isOpen, onClose, priceId, product_id, unit_amount, quantity } =
    usePurchaseTableStand();
  const { setLoading } = useSubscribePlan();
  const [description, setDescription] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const data = {
        priceId,
        product_id,
        unit_amount,
        quantity,
        description,
      };
      const response = await createTableStand(data);
      if (response.url) {
        window.open(response.url);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error processing your purchase. Please try again.");
    } finally {
      setDescription("");
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <span>Confirm Your Purchase</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            You are about to complete your purchase. Would you like to add a
            description?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Label htmlFor="description" className="text-sm font-medium">
            Purchase Description (Optional)
          </Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2"
            placeholder="Enter a description for your purchase"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Confirm Purchase
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
