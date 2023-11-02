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
  let diffDays
  if (previewDate && currentDate) {
    const timeDiff = Math.abs(previewDate.getTime() - currentDate.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(diffDays)
  }
  return (
    <Card className="w-4/5 max-w-3xl		">
      <CardHeader>
        <CardTitle className="text-center text-primary">{goal.name}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {goal.urlImage ? (
          <Image
            src={goal.urlImage}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        ) : (
          <Image src={defaultImage} alt="Picture of the author" />
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
        <Progress value={33} />
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
