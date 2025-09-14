'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export default function CopyButton({ text, className }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className={className}
      onClick={handleCopy}
    >
      <Copy className="w-4 h-4" />
    </Button>
  );
}