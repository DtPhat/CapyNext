'use client'
import { MouseEvent, ReactNode, useState } from "react";
import Translator from "../translator";
import { useAuth } from "@/providers/auth";
import { LoginDialog } from "../dialog";
interface TranslatableSectionProps {
  children: ReactNode
}

export default function TranslatableSection({ children }: TranslatableSectionProps) {
  const { userInfo } = useAuth()
  const [open, setOpen] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [showingTranslator, setShowingTranslator] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { googleAuthenticate } = useAuth()
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

  return (
    <section className="translatable text-black">
      {showingTranslator
        ? userInfo
          ? <Translator position={position} textToTranslate={selectedText} />
          : <LoginDialog
            onConfirm={googleAuthenticate}
            OpenButton={<div
              style={{ position: 'absolute', left: position?.x, top: position?.y }}>
            </div>
            }
            open={true}
          />
        : null
      }
      <div onMouseUp={handleSelection}>
        {children}
      </div>
    </section>
  );
}