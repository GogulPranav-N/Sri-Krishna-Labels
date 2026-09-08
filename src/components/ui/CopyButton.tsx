'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: number;
  title?: string;
}

export default function CopyButton({
  text,
  className = '',
  size = 14,
  title = 'Copy phone number',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Copied to clipboard!' : title}
      aria-label={copied ? 'Copied' : title}
      className={`inline-flex items-center justify-center p-1.5 rounded-md transition-all duration-200 relative group ${
        copied
          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          : 'text-gray-400 hover:text-[#C5961A] hover:bg-black/5 dark:hover:bg-white/10 active:scale-95'
      } ${className}`}
    >
      {copied ? (
        <Check size={size} className="text-emerald-500 animate-in fade-in zoom-in-75 duration-150" />
      ) : (
        <Copy size={size} className="transition-transform duration-150 group-hover:scale-110" />
      )}

      {copied && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
          Copied!
        </span>
      )}
    </button>
  );
}
