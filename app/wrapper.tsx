'use client'

import React, { useState } from 'react'
import translateText from './lib/actions';

const Wrapper = () => {
  const [selectedText, setSelectedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  translateText(selectedText || "Hello Doan Tien Phat").then((response) => setTranslatedText(response))
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      const text = selection.toString();
      setSelectedText(text);
    }
  };
  return (
    <>
      <div>
        <p onMouseUp={handleSelection}>
          Select some text in this paragraph.
        </p>
        <p>Selected text: {selectedText}</p>
        <p>Vietnamese: {translatedText}</p>
      </div>
    </>
  )
}

export default Wrapper