"use client";

import type React from "react";

import { useState, useRef } from "react";
import { X, Paperclip, XIcon, ChevronsUpDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchEmails } from "@/app/actions";
import {
  AttachmentFile,
  EmailModalProps,
  SendEmailRequest,
} from "@/types/type";
import { sendEmailMutation } from "@/hooks/use-send-newsletter";
import { useGetEmailMutation } from "@/hooks/use-get-emails";
import { toast } from "sonner";

export function EmailModal({
  isOpen,
  onClose,
  restaurantName = "Restaurant Name",
}: EmailModalProps) {
  const mutation = sendEmailMutation();
  const { mutateAsync, isPending } = useGetEmailMutation();

  const [emails, setEmails] = useState<string[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: AttachmentFile[] = Array.from(e.target.files).map(
        (file) => ({
          id: crypto.randomUUID(),
          file,
        })
      );
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  };

  const handleSend = async () => {
    const formData = new FormData();
    formData.append("subject", subject.trim());
    formData.append("content", message.trim());
    attachments.map((attachment) => formData.append("files", attachment.file));

    mutation.mutate(formData);
    // onClose();
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fetchEmailsAndSetState = async () => {
    try {
      const data = await mutateAsync();
      if (!data.isError) {
        setEmails(data.emails);
      } else {
        toast.error(data.errorMessage ?? "Failed to fetch emails");
      }
    } catch (err) {
      console.error("Failed to fetch emails:", err);
    }
  };

  const selectEmail = (email: string) => {
    // setTo(email);
    setIsEmailDropdownOpen(false);
  };

  if (mutation.isSuccess) {
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-zinc-900 text-white border-zinc-800">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{restaurantName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="to" className="block text-sm font-medium mb-1">
              To:
            </label>
            <Popover
              open={isEmailDropdownOpen}
              onOpenChange={(open) => {
                setIsEmailDropdownOpen(open);
                if (open && emails.length === 0) {
                  fetchEmailsAndSetState();
                }
              }}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isEmailDropdownOpen}
                  className="w-full justify-between bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                >
                  {"List of email address..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 bg-zinc-800 border-zinc-700">
                <Command className="bg-zinc-800">
                  <CommandList>
                    {isPending && (
                      <CommandEmpty>Loading emails...</CommandEmpty>
                    )}
                    {!isPending && emails.length === 0 && (
                      <CommandEmpty>No emails available.</CommandEmpty>
                    )}
                    {emails.length > 0 && (
                      <CommandGroup>
                        {emails.map((email, index) => (
                          <CommandItem
                            key={index}
                            value={email}
                            onSelect={() => selectEmail(email)}
                            className="text-white hover:bg-zinc-700"
                          >
                            <Check className="opacity-0" />
                            {email}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {/* <div>
            <label htmlFor="to" className="block text-sm font-medium mb-1">
              To:
            </label>
            <Input
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div> */}

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject:
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          {attachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Attachments:</p>
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded text-sm"
                  >
                    <span className="truncate max-w-[150px]">
                      {attachment.file.name}
                    </span>
                    <button
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-zinc-400 hover:text-white"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              className="text-white border-zinc-700 hover:bg-zinc-800"
              disabled={mutation.isPending}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Attach Files
            </Button>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white hover:bg-zinc-800"
            disabled={mutation.isPending}
          >
            Close
          </Button>
          <Button
            onClick={handleSend}
            className="bg-orange-600 hover:bg-orange-700 text-white"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
