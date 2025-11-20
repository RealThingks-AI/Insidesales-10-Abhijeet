import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ReminderCardProps {
  id: string;
  title: string;
  dueDate?: Date;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ReminderCard = ({
  id,
  title,
  dueDate,
  completed,
  onToggle,
  onDelete,
}: ReminderCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={completed}
            onCheckedChange={() => onToggle(id)}
            className="mt-1"
          />
          <div className="flex-1 min-w-0">
            <p
              className={`text-card-foreground font-medium ${
                completed ? "line-through opacity-60" : ""
              }`}
            >
              {title}
            </p>
            {dueDate && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{format(dueDate, "MMM d, yyyy")}</span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
