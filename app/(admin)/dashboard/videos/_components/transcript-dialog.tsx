// TranscriptDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button, DialogFooter } from "@material-tailwind/react";
import React, { useState } from "react";

interface TranscriptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rawText: string) => Promise<void>;
  loading: boolean; // new prop
}
const TranscriptDialog = ({ open, onOpenChange, onSubmit, loading }: TranscriptDialogProps) => {
  const [transcriptText, setTranscriptText] = useState("");

  const handleSubmit = async () => {
    await onSubmit(transcriptText);
    setTranscriptText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste transcript from YouTube</DialogTitle>
          <DialogDescription>
            <Textarea
              className="min-h-72 !text-black"
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder={`0:05
the cool thing about these guys is that they have really...
0:07
really really long trunks
0:12
and that's cool
0:14
(baaaaaaaaaaahhh!!)
0:16
and that's pretty much all there is to say`}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading} loading={loading}>
            Parse transcript
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export default TranscriptDialog;
