import config from "~/config";

class Analytics {
  sendEvent(name: string, props: Record<string, any>) {
    if (config.isDevelopment) {
      console.log("sendEvent", {
        name,
        props,
      });
    }

    if (window.plausible) {
      const opts = { props };

      window.plausible(name, opts);
    }
  }
}

export default new Analytics();
