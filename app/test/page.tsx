'use client'
import Container from '@/components/layout/container';
import React, { useEffect, useState } from 'react'

const TestingComponent = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };
  const convertTextToSpeech = async () => {
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error('Failed to convert text to speech');
      }
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error converting text to speech:', error);
    }
  };
  // useEffect(() => {
  //   convertTextToSpeech()
  // }, []);
  return (
    <Container>
      <div>
        <textarea value={text} onChange={handleTextChange} />
        <button onClick={convertTextToSpeech}>Convert to Speech</button>
        {audioUrl && <audio controls src={audioUrl} />}
        <div>
          
        </div>
      </div>
    </Container>
  )
}

export default TestingComponent