import { Toaster } from "sonner";

export function SonnerToast() {
  return (
    <Toaster
      richColors={true}
      position="top-right"
      toastOptions={{
        classNames: {
          title: "font-bold! font-sans!",
          description: "text-[0.94rem]! font-sans!",
        },
      }}
    />
  );
}
