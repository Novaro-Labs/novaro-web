import { Icon } from "@iconify/react";

export default function SpaceHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold text-black">Space</div>
      <div className="relative h-12 flex items-center rounded-xl px-4 bg-[#f7f7f7]">
        <Icon icon="mynaui:search" className="size-6 text-[#A2A5B1]" />
        <input
          placeholder="Search or Type a command"
          className="px-3 text-base min-w-[240px] bg-transparent"
        />
      </div>
    </div>
  );
}
