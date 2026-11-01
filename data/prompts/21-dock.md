---
id: "res_meez_21_dock"
slug: "21-dock"
title: "macOS Dock"
category: "Navigation"
categorySlug: "navigation"
routeCollection: "sections"
videoUrl: "/media/videos/21-dock.mp4"
posterUrl: "/media/posters/21-dock.jpg"
chars: 3370
tier: "premium"
likes: 59
---

# macOS Interactive Floating Dock Specification
Magnification Physics, Spring Transitions & Accessible Floating Dock

════════════════════════════════════════════════════════════════════════
1. OVERVIEW & INTERACTION MODEL
════════════════════════════════════════════════════════════════════════
The macOS style floating dock provides an icon bar that expands seamlessly as the cursor hovers across neighboring items, mimicking Apple's legendary macOS Cocoa magnification physics.

Features:
• Cursor proximity distance curve calculation (`useMotionValue`, `useTransform`).
• Smooth Framer Motion spring damping (`stiffness: 400`, `damping: 25`).
• Glassmorphic dock shelf with subtle border reflection and backdrop blur.

════════════════════════════════════════════════════════════════════════
2. PRODUCTION REACT & FRAMER MOTION IMPLEMENTATION
════════════════════════════════════════════════════════════════════════
```tsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Home, Compass, Layers, MessageSquare, Terminal, Settings } from 'lucide-react';

export function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { title: 'Home', icon: <Home className="w-5 h-5 text-neutral-300" /> },
    { title: 'Explore', icon: <Compass className="w-5 h-5 text-neutral-300" /> },
    { title: 'Components', icon: <Layers className="w-5 h-5 text-neutral-300" /> },
    { title: 'Chat', icon: <MessageSquare className="w-5 h-5 text-neutral-300" /> },
    { title: 'Terminal', icon: <Terminal className="w-5 h-5 text-neutral-300" /> },
    { title: 'Settings', icon: <Settings className="w-5 h-5 text-neutral-300" /> },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-3 rounded-2xl border border-white/10 bg-neutral-900/80 px-4 pb-3 backdrop-blur-xl shadow-2xl"
    >
      {items.map((item, idx) => (
        <DockIcon key={idx} mouseX={mouseX} icon={item.icon} title={item.title} />
      ))}
    </motion.div>
  );
}

function DockIcon({ 
  mouseX, 
  icon, 
  title 
}: { 
  mouseX: MotionValue; 
  icon: React.ReactNode; 
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="relative flex aspect-square items-center justify-center rounded-xl bg-neutral-800/80 border border-white/10 hover:bg-neutral-700 transition-colors shadow-lg cursor-pointer group"
    >
      <div className="flex items-center justify-center pointer-events-none">
        {icon}
      </div>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-neutral-950 px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10">
        {title}
      </span>
    </motion.div>
  );
}
```

