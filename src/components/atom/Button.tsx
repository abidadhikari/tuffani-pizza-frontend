import { Button as ShadCNButton } from "@/components/ui/button";
import { ComponentPropsWithoutRef } from "react";
import { Spinner } from "./Spinner";

interface IButton
  extends
    React.HTMLAttributes<HTMLButtonElement>,
    ComponentPropsWithoutRef<typeof ShadCNButton> {
  isLoading?: boolean;
}

export default function Button(props: IButton) {
  const { children, isLoading, ...rest } = props;

  if (rest.asChild) {
    return <ShadCNButton {...rest}>{children}</ShadCNButton>;
  }

  return (
    <ShadCNButton {...rest}>
      {isLoading ? <Spinner /> : null}
      {children}
    </ShadCNButton>
  );
}
