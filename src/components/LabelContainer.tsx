import { PropsWithChildren } from "react";
import { Card } from "pixel-retroui";

export function LabelContainer({ children }: PropsWithChildren) {
  return <Card className="text-center">{children}</Card>;
}
