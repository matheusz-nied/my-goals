"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };
  return (
    <div className="flex flex-col justify-center gap-10 text-center">
      <header className="mb-24 mt-16">
        <h1 className="text-5xl	">
          Lembre-se sempre dos seus <span className="text-primary">Sonhos</span>{" "}
          e <span className="text-primary">Metas</span>
        </h1>
        <p className="text-lg	">
          Uma plataforma para realizar seus sonhos e gerenciar suas tarefas.
        </p>
      </header>

      <section id="sonhos">
        <h2 className="text-4xl font-bold text-primary">Meus Sonhos</h2>
        <p className="m-12">
          Aqui você pode criar e gerenciar seus sonhos de vida. Defina seus
          objetivos e trabalhe para alcançá-los.
        </p>
      </section>

      <section id="tarefas ">
        <h2 className="text-3xl font-bold text-primary">Tarefas a Fazer</h2>
        <p className="m-12">
          Organize suas tarefas diárias e mantenha o controle do que precisa ser
          feito.
        </p>
        {status === "unauthenticated" && (
          <Button
            onClick={handleLoginClick}
            variant="outline"
            className="w-full max-w-xs gap-2 bg-primary text-center"
          >
            <LogInIcon size={16} />
            Crie sua conta
          </Button>
        )}
      </section>
    </div>
  );
}
