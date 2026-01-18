"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

interface InstagramEmbedProps {
  url: string;
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  // Clean the URL (remove trailing slash)
  const cleanUrl = url.replace(/\/$/, "");

  useEffect(() => {
    // Check if Instagram embed script is already loaded
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      // Dynamically load the Instagram embed script
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [url]);

  return (
    <div className="flex justify-center my-8">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={cleanUrl}
        data-instgrm-version="14"
      />
    </div>
  );
}
