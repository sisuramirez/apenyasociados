"use client";

interface InstagramEmbedProps {
  url: string;
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  // Clean the URL and ensure it has the /embed suffix
  const cleanUrl = url
    .replace(/\/$/, "") // Remove trailing slash
    .replace(/\/embed$/, ""); // Remove /embed if already present

  const embedUrl = `${cleanUrl}/embed`;

  return (
    <div className="flex justify-center my-8">
      <iframe
        src={embedUrl}
        width={400}
        height={520}
        frameBorder={0}
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
        title="Instagram embed"
        className="border-0 rounded-lg shadow-md"
      />
    </div>
  );
}
