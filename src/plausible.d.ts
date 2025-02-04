declare global {
  interface Window {
    plausible: (
      event: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options?: { props?: Record<string, any> }
    ) => void;
  }
}

export {};
