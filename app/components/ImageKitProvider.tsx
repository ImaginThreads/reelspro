"use client";

import { ReactNode } from "react";
import { IKContext } from "imagekitio-react";

export default function ImageKitProvider({ children }: { children: ReactNode }) {
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

  if (!publicKey || !urlEndpoint) {
    console.error('ImageKit configuration missing');
    return <>{children}</>;
  }

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticationEndpoint="/api/imagekit-auth"
    >
      {children}
    </IKContext>
  );
} 