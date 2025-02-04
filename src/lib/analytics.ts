import config from "~/config";
import constants from "~/constants";

class Analytics {
  events = constants.analyticsEvents;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendEvent(name: string, props: Record<string, any>) {
    if (config.isDevelopment) {
      console.log("sendEvent", {
        name,
        props,
      });
      return;
    }

    if (window.plausible) {
      const opts = { props };

      window.plausible(name, opts);
    }
  }
}

export default new Analytics();
