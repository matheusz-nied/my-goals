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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Goal, ScrollText } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {  useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const emptyStringToUndefined = z.literal("").transform(() => undefined);

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined);
}
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.enum(["profissional", "pessoal"], {
    required_error: "You need to select a notification type.",
  }),

  preview_date: z.date({
    required_error: "A date of birth is required.",
  }),
  urlImage: asOptionalField(z.string()),
});

const DialogForm = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession()
  const router = useRouter()

  const handleDialog = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });



  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    try {
    
      const body = values;
      handleDialog();
      
      await fetch("/api/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    } catch (error) {
      console.error(error);
 
    }
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")

    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialog}>
      <DialogTrigger className="flex justify-end mr-6">
       <Button className="rounded-[5px] gap-2">Criar meta  <Goal /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Meta</DialogTitle>
          <DialogDescription>
            Crie uma meta de vida que tenha para motivar e inspirar seu
            processo.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta</FormLabel>
                  <FormControl>
                    <Input placeholder="Ser rico" {...field} />
                  </FormControl>
                  <FormDescription>Qual é sua meta?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Qual tipo de meta?</FormLabel>
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
              name="preview_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Para quando é a meta?</FormLabel>
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
                    Seleciona quando deseja conquistar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urlImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem da sua Meta</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://my-goals-theta.vercel.app/urlImage"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Url da imagem</FormDescription>
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

export default DialogForm;
