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
import { useContext, useState } from "react";
import { FormContext } from "@/context/form";
import ObjectFormContext from "@/app/tasks/interface/ObjectFormContext";
import { useRouter } from "next/navigation";
import { TaskContext } from "@/context/task";
import ObjectTaskContext from "@/app/tasks/interface/ObjectTaskContext";

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
const formSchema = z.object({
  toDo: z.string({
    required_error: "Task is required",
  }),
  category: z.enum(["profissional", "pessoal"], {
    required_error: "You need to select a notification type.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "You need to select a priority type.",
  }),
});

interface IdTaskProps {
  idTask: string;
}

const FormEditTask = ({ idTask }: IdTaskProps) => {
  const [open, setOpen] = useState(false);
  const formContext = useContext(FormContext) as ObjectFormContext;
  const { formState, setFormState } = formContext;
  const router = useRouter()
  const taskContext = useContext(TaskContext) as ObjectTaskContext;
  const { tasks, setTasks } = taskContext;
  const task = tasks.find((task) => {
    return task.id === idTask;
  });

  const handleDialog = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const body = values;
      handleDialog();
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setFormState(!formState);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteTask(id: string | undefined) {
          handleDialog();

    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id),
    });
    router.push("/tasks")
    
  }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogTrigger asChild className="mr-6 flex justify-end">
        <Button variant="outline" className="w-max gap-2 rounded	">
          Editar Task <ScrollText />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Task</DialogTitle>
          <DialogDescription>
            Crie de tarefa importante que precisa fazer hoje.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="toDo"
              defaultValue={task?.toDo}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
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
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Qual tipo de tarefa?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="profissional" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Profissional
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="pessoal" />
                        </FormControl>
                        <FormLabel className="font-normal">Pessoal</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              defaultValue={task?.date}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Que dia deseja executar a tarefa?</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        
                      />
                    </PopoverContent>
                  </Popover>

                  <FormDescription>
                    Seleciona quando deve executar a tarefa.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Qual a prioridade da tarefa?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"

>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Low"         checked={task?.priority === "Low"}
/>
                        </FormControl>
                        <FormLabel className="font-normal">Baixa</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Medium"        checked={task?.priority === "Medium"}
 />
                        </FormControl>
                        <FormLabel className="font-normal">Media</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="High"         checked={task?.priority === "High"}
/>
                        </FormControl>
                        <FormLabel className="font-normal">Alta</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center gap-4">
              <Button className="w-9/12	" onClick={() => deleteTask(idTask)}>
                Deletar Task
              </Button>
              <Button variant="outline" className="w-9/12	" type="submit">
                Editar Task
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEditTask;
