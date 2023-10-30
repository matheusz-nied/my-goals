"use client";

import { Plus } from "lucide-react";

const FloatButton = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <button className="rounded-full bg-primary px-3 py-3 font-bold text-white shadow-lg hover:bg-accent">
      <Plus size={24} />
      </button>
    </div>
  );
};
export default FloatButton;
