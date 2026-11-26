import React from 'react';

interface BrowserUrlTooltipProps {
  url: string | null;
}

export const BrowserUrlTooltip: React.FC<BrowserUrlTooltipProps> = ({ url }) => {
  if (!url) return null;

  return (
    <div className="fixed bottom-0 left-0 max-w-xl z-50 pointer-events-none select-none animate-in fade-in duration-75">
      <div className="bg-[#f8f9fa] text-[#3c4043] border border-[#dadce0] border-b-0 border-l-0 rounded-tr-md px-3 py-1 text-[11px] font-sans shadow-sm truncate max-w-lg">
        {url}
      </div>
    </div>
  );
};

