index.d.ts

export {};

declare global {
  interface Window {
    JavaScriptChannel: any;
    myMessage: any;
    flutter_inappwebview: any;
  }
}