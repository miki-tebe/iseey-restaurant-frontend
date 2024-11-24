"use client";

import { useSubscribePlan } from "@/hooks/use-subscribe-plan";
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
import { changePlan } from "@/app/actions";

export default function SubscribePlan() {
  const { isOpen, onClose, plan, priceId, setLoading } = useSubscribePlan();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const data = await changePlan({ plan, priceId });
      if (data.url) {
        window.open(data.url);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Upgrade</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to upgrade to the {plan} plan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
