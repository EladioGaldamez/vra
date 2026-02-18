declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function trackEvent(event: string, properties: Record<string, any>) {
  if (typeof window !== "undefined") {
    window.gtag("event", event, properties);
  }
}