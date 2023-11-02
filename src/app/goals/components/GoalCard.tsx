import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Goal } from "@/model/Goal";
import { Check, Trash } from "lucide-react";
import Image from "next/image";
import defaultImage from "../../../../public/money.jpg";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface CardProps {
  goal: Goal;
}

const GoalCard = ({ goal }: CardProps) => {
  const previewDate = goal.preview_date ? new Date(goal.preview_date) : null;
  const currentDate = goal.current_date ? new Date(goal.current_date) : null;
  const created_at = goal.created_at ? new Date(goal.created_at) : null;
  const today = new Date();
  let diffDays;
  let totalDiffDays;
  let percentDays;
  if (created_at && currentDate) {
    const timeDiff = Math.abs(currentDate.getTime() - today.getTime());
    const totalTimeDiff = Math.abs(
      currentDate.getTime() - created_at.getTime(),
    );

    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalDiffDays = Math.ceil(totalTimeDiff / (1000 * 3600 * 24));
    totalDiffDays = timeDiff / totalTimeDiff;
    percentDays = totalDiffDays * 100;
  }

  async function deleteGoal(id: string) {
    console.log(id);
    await fetch("/api/goal", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: id,
    });
  }

  return (
    <Card className="w-4/5 max-w-3xl" id={goal.id}>
      <CardHeader>
        <CardTitle className="text-center text-primary">{goal.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {goal.urlImage ? (
          <img src={goal.urlImage} />
        ) : (
          <Image src={defaultImage} alt="Gold money" />
        )}

        <div className=" flex items-center space-x-4 rounded-md p-4">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium leading-none">
              Quando pretendo ter: {previewDate?.toLocaleDateString()}
            </p>
            <p className="text-sm font-medium leading-none">
              Quando vou ter: {previewDate?.toLocaleDateString()}
            </p>
            <p>Dias que falta: {diffDays}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-4">
        <Progress value={percentDays} />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="gap-2 rounded hover:bg-primary"
              disabled={!goal.id}
            >
              <span>Deletar</span>
              <Trash size={18} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente
                essa meta
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                id={goal.id}
                onClick={() => goal.id && deleteGoal(goal.id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
