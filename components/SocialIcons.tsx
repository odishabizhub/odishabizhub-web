import { SOCIAL_LINKS } from "@/lib/site-config";

const ICON_PATHS: Record<string, string> = {
  Facebook: "M13 22v-8h2.7l.4-3H13V9c0-.9.2-1.5 1.6-1.5H16V4.8C15.7 4.8 14.7 4.7 13.6 4.7 11.3 4.7 9.7 6.1 9.7 8.7V11H7v3h2.7v8h3.3z",
  Instagram: "M12 8.2A3.8 3.8 0 1012 15.8 3.8 3.8 0 0012 8.2zm0 6.3A2.5 2.5 0 1112 9.5a2.5 2.5 0 010 5zM16.5 6.9a.9.9 0 11-.9-.9.9.9 0 01.9.9zM21 7.8a5.4 5.4 0 00-1.5-3.8 5.4 5.4 0 00-3.8-1.5c-1.5-.1-6-.1-7.5 0A5.4 5.4 0 004.4 4a5.4 5.4 0 00-1.5 3.8c-.1 1.5-.1 6 0 7.5A5.4 5.4 0 004.4 19a5.4 5.4 0 003.8 1.5c1.5.1 6 .1 7.5 0a5.4 5.4 0 003.8-1.5 5.4 5.4 0 001.5-3.8c.1-1.5.1-5.9 0-7.4zM19.2 15.8a3 3 0 01-1.7 1.7c-1.2.5-4 .4-5.5.4s-4.2.1-5.5-.4a3 3 0 01-1.7-1.7c-.5-1.2-.4-4-.4-5.5s-.1-4.2.4-5.5a3 3 0 011.7-1.7c1.2-.5 4-.4 5.5-.4s4.2-.1 5.5.4a3 3 0 011.7 1.7c.5 1.2.4 4 .4 5.5s.1 4.3-.4 5.5z",
  LinkedIn: "M6.9 8.4H3.6V20H6.9V8.4zM5.3 3.5a1.9 1.9 0 100 3.9 1.9 1.9 0 000-3.9zM20.4 20h-3.3v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H9.7V8.4H13v1.6h.05c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.1 2.3 4.1 5.3V20z",
  YouTube: "M22 12s0-3.2-.4-4.7a2.7 2.7 0 00-1.9-1.9C18.2 5 12 5 12 5s-6.2 0-7.7.4A2.7 2.7 0 002.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.7 2.7 0 001.9 1.9C5.8 19 12 19 12 19s6.2 0 7.7-.4a2.7 2.7 0 001.9-1.9c.4-1.5.4-4.7.4-4.7zM10 15.3V8.7l5.8 3.3z",
  WhatsApp: "M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.7.8-.9 1-.3.2-.6.1a6.7 6.7 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5s.3-.3.4-.5a.6.6 0 00.1-.6c0-.1-.6-1.5-.8-2s-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-1 2.3c0 1.3.9 2.6 1.1 2.8s1.7 2.6 4.2 3.7a5 5 0 002.9.6c.5-.1 1.4-.6 1.6-1.1s.2-1 .1-1.1-.2-.2-.4-.3z",
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map((social) => {
        const isLive = social.href !== "#";
        const iconClass = "flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink/50 ring-1 ring-brand-100 transition-colors";
        const icon = (
          <>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d={ICON_PATHS[social.label]} />
            </svg>
            <span className="sr-only">{social.label}</span>
          </>
        );

        // Not live yet: render a non-interactive span rather than a dead link with a
        // client-side click-blocker, so this stays a plain server component.
        if (!isLive) {
          return (
            <span
              key={social.label}
              title={`${social.label} — coming soon`}
              className={`${iconClass} cursor-default opacity-40`}
            >
              {icon}
            </span>
          );
        }

        return (
          <a
            key={social.label}
            href={social.href}
            title={social.label}
            className={`${iconClass} hover:bg-brand-50 hover:text-brand-700`}
          >
            {icon}
          </a>
        );
      })}
    </div>
  );
}
