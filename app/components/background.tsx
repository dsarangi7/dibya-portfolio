import React from "react";

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="tech-grid absolute inset-0 opacity-30" />
      <div className="particles absolute inset-0" />
    </div>
  );
}
