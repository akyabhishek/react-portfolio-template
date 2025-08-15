declare module 'qrcode-reader' {
  interface QRCodeResult {
    result: string;
  }

  class QRCode {
    callback: ((err: Error | null, value?: QRCodeResult) => void) | null;
    decode(imageData: ImageData): void;
  }

  export = QRCode;
}
