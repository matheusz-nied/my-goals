import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {  ScrollText } from "lucide-react";
import { useContext, useState } from "react";
import { FormContext } from "@/context/form";
import ObjectFormContext from "@/app/tasks/interface/ObjectFormContext";

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
const formSchema = z.object({
  description: z.string({
    required_error: "Task is required",
  }),
  taskId: z.string({
    required_error: "Task is required",
  }),
});

interface IdTaskProps {
  idTask: string;
}
const FormMiniTask = ({ idTask }: IdTaskProps) => {
  const [open, setOpen] = useState(false);
  const formContext = useContext(FormContext) as ObjectFormContext;
  const { formState, setFormState } = formContext;

  const handleDialog = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskId: idTask,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = values;
      handleDialog();
      await fetch("/api/miniTasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setFormState(!formState);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogTrigger asChild className="mr-6 flex justify-end">
        <Button className="w-max gap-2 rounded	">
          Criar Mini Task <ScrollText />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar mini Task</DialogTitle>
          <DialogDescription>Crie uma mini tarefa</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mini Task</FormLabel>
                  <FormControl>
                    <Input placeholder="Terminar relatório" {...field} />
                  </FormControl>
                  <FormDescription>O que você precisa fazer?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taskId"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Terminar relatório"
                      defaultValue={idTask}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>O que você precisa fazer?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button className="w-9/12	" type="submit">
                Criar Mini Task
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormMiniTask;
