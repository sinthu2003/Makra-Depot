// components/QrCodeGenerator.tsx
import { QRCode } from 'react-qr-code';
import { useRef, useState, useEffect } from 'react';

interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  onImageLoad?: (dataUrl: string) => void;
}

const QrCodeGenerator = ({ value, size = 160, onImageLoad }: QrCodeGeneratorProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && qrRef.current && onImageLoad) {
      // Convert SVG to data URL
      const convertSvgToDataUrl = async () => {
        const svgElement = qrRef.current?.querySelector('svg');
        if (!svgElement) return;

        try {
          const svgString = new XMLSerializer().serializeToString(svgElement);
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
              // White background
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Draw QR code
              ctx.drawImage(img, 0, 0, size, size);
              
              const dataUrl = canvas.toDataURL('image/png');
              onImageLoad(dataUrl);
              
              // Clean up
              URL.revokeObjectURL(url);
            }
          };
          img.src = url;
        } catch (error) {
          console.error('Error converting QR code to image:', error);
        }
      };

      convertSvgToDataUrl();
    }
  }, [value, size, isClient, onImageLoad]);

  if (!isClient) {
    return (
      <div 
        ref={qrRef}
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#666'
        }}
      >
        Loading QR...
      </div>
    );
  }

  return (
    <div ref={qrRef}>
      <QRCode
        value={value}
        size={size}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        viewBox={`0 0 ${size} ${size}`}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="Q" // Quality level (L, M, Q, H)
      />
    </div>
  );
};

export default QrCodeGenerator;