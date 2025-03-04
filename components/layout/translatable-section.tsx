'use client'
import { MouseEvent, ReactNode, useState } from "react";
import Translator from "../translator";
import { useAuth } from "@/providers/auth";
import { LoginDialog } from "../dialog";
interface TranslatableSectionProps {
  children: ReactNode
}

export default function TranslatableSection({ children }: TranslatableSectionProps) {
  const { userInfo, googleAuthenticate } = useAuth();
  const [isTranslatorVisible, setIsTranslatorVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleSelection = (event: MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString();
    if (!text) {
      setIsTranslatorVisible(false);
      return;
    }
    setSelectedText(text);
    setIsTranslatorVisible(true);
    setPosition({ x: event.pageX, y: event.pageY });
  };

  const renderTranslator = () => {
    if (isTranslatorVisible) {
      if (userInfo) {
        return <Translator position={position} textToTranslate={selectedText} />;
      }
      return (
        <LoginDialog
          onConfirm={googleAuthenticate}
          OpenButton={
            <div style={{ position: "absolute", left: position.x, top: position.y }} />
          }
          open={true}
        />
      );
    }
    return null;
  };

  return (
    <section className="translatable text-black">
      <div onMouseUp={handleSelection}>
        {children}
        {renderTranslator()}
      </div>
    </section>
  );
}
