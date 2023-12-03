import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/auth";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { TaskProvider } from "@/context/task";
import { FormProvider } from "@/context/form";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nied Goals",
  description: "Create goals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <TaskProvider>
            <FormProvider>
              <div>
                <div  className="min-h-screen	">{children}</div>

                <Footer />
              </div>
            </FormProvider>
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
