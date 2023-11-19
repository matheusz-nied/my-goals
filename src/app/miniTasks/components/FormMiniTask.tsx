import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FloatButton from "@/components/ui/floatButton";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ScrollText } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Task } from "@/model/Task";

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
const FormTask = ({idTask}:IdTaskProps) => {
  const [open, setOpen] = useState(false);

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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogTrigger className="mr-6 flex justify-end">
        <Button className="gap-2 rounded">
          Criar Mini Task <ScrollText />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar mini Task</DialogTitle>
          <DialogDescription>
            Crie uma mini tarefa
          </DialogDescription>
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
                    <Input placeholder="Terminar relatório" defaultValue={idTask} {...field} />
                  </FormControl>
                  <FormDescription>O que você precisa fazer?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

   
            <DialogFooter>
              <Button type="submit">Criar Meta</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormTask;
