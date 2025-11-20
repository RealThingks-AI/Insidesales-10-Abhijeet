import { useState } from "react";
import { ReminderCard } from "@/components/ReminderCard";
import { AddReminderDialog } from "@/components/AddReminderDialog";
import { CheckCircle2 } from "lucide-react";

interface Reminder {
  id: string;
  title: string;
  dueDate?: Date;
  completed: boolean;
}

const Index = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "Buy groceries",
      dueDate: new Date(2025, 10, 25),
      completed: false,
    },
    {
      id: "2",
      title: "Call dentist for appointment",
      dueDate: new Date(2025, 10, 22),
      completed: false,
    },
    {
      id: "3",
      title: "Finish project report",
      completed: true,
    },
  ]);

  const handleAddReminder = (title: string, dueDate?: Date) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title,
      dueDate,
      completed: false,
    };
    setReminders([newReminder, ...reminders]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const activeReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Reminders</h1>
          </div>
          <p className="text-muted-foreground">
            Keep track of what matters most
          </p>
        </header>

        <div className="mb-6">
          <AddReminderDialog onAdd={handleAddReminder} />
        </div>

        <div className="space-y-6">
          {activeReminders.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                Active ({activeReminders.length})
              </h2>
              <div className="space-y-3">
                {activeReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    {...reminder}
                    onToggle={handleToggleReminder}
                    onDelete={handleDeleteReminder}
                  />
                ))}
              </div>
            </div>
          )}

          {completedReminders.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                Completed ({completedReminders.length})
              </h2>
              <div className="space-y-3">
                {completedReminders.map((reminder) => (
                  <ReminderCard
                    key={reminder.id}
                    {...reminder}
                    onToggle={handleToggleReminder}
                    onDelete={handleDeleteReminder}
                  />
                ))}
              </div>
            </div>
          )}

          {reminders.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">
                No reminders yet. Create your first one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
