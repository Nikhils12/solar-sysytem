import React from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Info } from 'lucide-react';

export default function Controls() {
  return (
    <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 text-white border border-white/20 shadow-2xl">
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
        <Info size={16} />
        Controls
      </h3>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <Move3D size={14} />
          <span>Click and drag to rotate view</span>
        </div>
        <div className="flex items-center gap-2">
          <ZoomIn size={14} />
          <span>Scroll to zoom in/out</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw size={14} />
          <span>Right-click and drag to pan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <span>Click planets for information</span>
        </div>
      </div>
    </div>
  );
}