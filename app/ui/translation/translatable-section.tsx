'use client'
import { MouseEvent, ReactNode, useState } from "react";
import Translator from "./translator";
interface TranslatableSectionProps {
  children: ReactNode
}

export default function TranslatableSection({ children }: TranslatableSectionProps) {
  const [open, setOpen] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [showingTranslator, setShowingTranslator] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleSelection = (event: MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString();
    if (!text) {
      setShowingTranslator(false)
      return;
    }
    setSelectedText(text);
    setShowingTranslator(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };
  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <section className="translatable">
      {showingTranslator && <Translator position={position} textToTranslate={selectedText} />}
      <div onMouseUp={handleSelection}>
        {children}
      </div>
    </section>
  );
}