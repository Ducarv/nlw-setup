interface HabitProps {
    completed: number;
}

export function Habit(props: HabitProps) {
    return(
        <div className="bg-zinc-300 w-10">{props.completed}</div>
    )
}