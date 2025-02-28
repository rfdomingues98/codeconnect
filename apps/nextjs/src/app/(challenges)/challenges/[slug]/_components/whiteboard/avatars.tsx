"use client";

import React, { useMemo } from "react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Avatar, AvatarFallback, AvatarImage } from "@codeconnect/ui/avatar";

// Utility function to get initials from a name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Memoized Avatar component to prevent unnecessary rerenders
const MemoizedAvatar = React.memo(
  ({ src, alt, fallback }: { src: string; alt: string; fallback: string }) => (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
);

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex justify-end p-[1px_4px]">
      {users.map(({ connectionId, info }) => {
        const initials = useMemo(() => getInitials(info.name), [info.name]);
        return (
          <MemoizedAvatar
            key={connectionId}
            src={info.avatar}
            alt={`@${info.name}`}
            fallback={initials}
          />
        );
      })}

      {currentUser && (
        <MemoizedAvatar
          src={currentUser.info.avatar}
          alt={`@${currentUser.info.name}`}
          fallback={getInitials(currentUser.info.name)}
        />
      )}
    </div>
  );
}
