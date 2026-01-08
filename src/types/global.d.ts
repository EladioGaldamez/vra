// Google Analytics / Google Tag Manager type declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }

  var dataLayer: any[];
  function gtag(...args: any[]): void;
}

