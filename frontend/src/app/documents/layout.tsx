import { Toaster } from "@/components/ui/sonner";
export default function DocumentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto pt-12 min-h-screen">
      <Toaster />
      <div className="w-full">{children}</div>
    </main>
  );
}
