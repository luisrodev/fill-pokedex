import { useState } from "react";
import { Button, Popup } from "pixel-retroui";
import constants from "~/constants";
import {
  useConfigurationActions,
  useSoundOn,
} from "~/stores/configurationStore";
import analytics from "~/lib/analytics";

const usePopUp = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggle = () => setIsPopupOpen((prev) => !prev);
  const close = () => setIsPopupOpen(false);
  const open = () => setIsPopupOpen(true);

  return { isOpen: isPopupOpen, toggle, open, close };
};

export function Footer() {
  const { isOpen, toggle } = usePopUp();
  const { toggleSound } = useConfigurationActions();
  const isSoundEnabled = useSoundOn();

  return (
    <>
      <div>
        <Button className="px-2 text-xs" onClick={toggle}>
          About
        </Button>
        <Button className="text-xs" onClick={toggleSound}>
          {isSoundEnabled ? "Audio Off" : "Audio On"}
        </Button>
      </div>

      <Popup isOpen={isOpen} onClose={toggle}>
        <div className="flex text-sm flex-col items-center gap-4">
          <span>
            Developed by{" "}
            <a
              className="underline"
              href={constants.developerByUrl}
              onClick={() => {
                analytics.sendEvent(analytics.events.DevelopedByClick, {
                  anchor_name: "developedby_button",
                });
              }}
            >
              {constants.developedBy}
            </a>
          </span>
          <span>version: {constants.applicationVersion}</span>
          <a
            className="underline"
            href={constants.repositoryUrl}
            onClick={() => {
              analytics.sendEvent(analytics.events.RepositoryClick, {
                anchor_name: "repository_button",
              });
            }}
          >
            Repository
          </a>
          <Button className="text-xs" onClick={toggle}>
            Close
          </Button>
        </div>
      </Popup>
    </>
  );
}
