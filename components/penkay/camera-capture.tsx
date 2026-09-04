'use client';

import { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function CameraCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Inicia la cámara cuando se abre el modal
  useEffect(() => {
    if (isOpen && !photoTaken) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, photoTaken]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setPhotoTaken(true);
      stopCamera();
    }, 150); // Duración del flash
  };

  const resetCamera = () => {
    setPhotoTaken(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button variant="secondary" />}>
        <Camera className="mr-2 size-4" /> Capturar muestra
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registro Fotográfico</DialogTitle>
        </DialogHeader>
        
        <div className="relative aspect-[4/3] bg-black rounded-md overflow-hidden flex items-center justify-center">
          {!photoTaken ? (
            <>
              {/* Video en vivo */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
              {/* Efecto de Flash */}
              {isFlashing && (
                <div className="absolute inset-0 bg-white z-10 animate-pulse" />
              )}
            </>
          ) : (
            // Foto "Tomada" simulada (imagen local)
            <img 
              src="/PencoAndinoDetalle.png" 
              alt="Muestra capturada" 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          {!photoTaken ? (
            <Button onClick={takePhoto} size="lg" className="rounded-full w-16 h-16 p-0 border-4 border-white shadow-lg bg-red-500 hover:bg-red-600">
              <span className="sr-only">Tomar Foto</span>
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={resetCamera}>Volver a intentar</Button>
              <Button onClick={() => setIsOpen(false)}>Guardar foto</Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
