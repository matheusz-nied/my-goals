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
import { Check } from "lucide-react";
import { Button } from "react-day-picker";
import Image from "next/image";
import defaultImage from "../../../../public/money.jpg";
import { Progress } from "@/components/ui/progress";

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
    totalDiffDays = (timeDiff / totalTimeDiff);
    percentDays = (totalDiffDays) * 100;
    console.log(percentDays);
  }
  return (
    <Card className="w-4/5 max-w-3xl		">
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
            <p>
              Dias que falta: {diffDays}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={percentDays} />
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
