import { PropsWithChildren } from "react";

export default function Container(props: PropsWithChildren) {
  return (
    <div className="mx-auto min-h-dvh max-h-dvh flex items-center justify-center">
      {props.children}
    </div>
  );
}
