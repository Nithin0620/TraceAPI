"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  side: "left" | "right";
  initialWidth: number;
  minWidth?: number;
  maxWidth?: number;
  collapsedWidth?: number;
  collapsed: boolean;
  onCollapsedChange: (v: boolean) => void;
  title: string;
  children: React.ReactNode;
};

export function ResizableSidebar({
  side,
  initialWidth,
  minWidth = 260,
  maxWidth = 520,
  collapsedWidth = 56,
  collapsed,
  onCollapsedChange,
  title,
  children,
}: Props) {
  const [width, setWidth] = useState(initialWidth);
  const dragRef = useRef<{ startX: number; startW: number } | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      dragRef.current = { startX: e.clientX, startW: width };
      document.body.style.userSelect = "none";
    },
    [width],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const next = side === "left" ? dragRef.current.startW + dx : dragRef.current.startW - dx;
      setWidth(Math.max(minWidth, Math.min(maxWidth, next)));
    };
    const onUp = () => {
      dragRef.current = null;
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [maxWidth, minWidth, side]);

  const actualWidth = collapsed ? collapsedWidth : width;

  return (
    <aside
      className={[
        "relative h-full shrink-0 border msp-border bg-base-100",
        side === "left" ? "border-r" : "border-l",
      ].join(" ")}
      style={{ width: actualWidth }}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b msp-border">
        <div className="text-sm font-medium truncate">{collapsed ? "" : title}</div>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => onCollapsedChange(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {side === "left"
            ? collapsed ? "»" : "«"
            : collapsed ? "«" : "»"
          }
        </button>
      </div>

      <div className={collapsed ? "hidden" : "h-[calc(100%-41px)] overflow-auto"}>{children}</div>

      <div
        onMouseDown={onMouseDown}
        className={[
          "absolute top-0 h-full w-2 cursor-col-resize",
          side === "left" ? "-right-1" : "-left-1",
        ].join(" ")}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
      />
    </aside>
  );
}

