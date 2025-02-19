"use client";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionHook {
  isRecording: boolean;
  transcript: string;
  error: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  isSupported: boolean;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript: string = '';
          let interimTranscript: string = '';

          for (let i = 0; i < event.results.length; i++) {
            const result: SpeechRecognitionResult = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            } else {
              interimTranscript += result[0].transcript;
            }
          }

          if (finalTranscript) {
            setTranscript((prev: string) => {
              const newTranscript: string = prev ? `${prev} ${finalTranscript}` : finalTranscript;
              return newTranscript.trim();
            });
          }
          setInterimTranscript(interimTranscript);
        };

        interface SpeechRecognitionErrorEvent extends Event {
          error: string;
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          setError(event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
          setInterimTranscript('');
        };

        setRecognition(recognition);
        setIsSupported(true);
      } else {
        setError('Speech recognition is not supported in this browser.');
        setIsSupported(false);
      }
    }
  }, []);

  const startRecording = useCallback(async () => {
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    
    try {
      const permission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (permission && recognition) {
        recognition.start();
        setIsRecording(true);
      }
    } catch (err) {
      setError('Microphone permission denied');
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      setInterimTranscript('');
    }
  }, [recognition]);

  return {
    isRecording,
    transcript: transcript + (interimTranscript ? ` ${interimTranscript}` : ''),
    error,
    startRecording,
    stopRecording,
    isSupported,
  };
}