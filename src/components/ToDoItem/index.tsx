import { GoTrash } from "react-icons/go";
import { useToDo } from "../../contexts/task";
import { TaskProps } from "../../contexts/task";
import { twMerge } from "tailwind-merge";
import { taskGenre, taskGenreValues } from "./constants";

export function ToDoItem({ id, genre, content }: TaskProps) {
    const { deleteTask } = useToDo()

    const handleDeleteTask = (taskId: string) => {
        deleteTask(taskId);
    };

    const genreColor = (genre: taskGenreValues) => {
        switch (genre) {
            case taskGenre.ESTUDO:
                return "bg-orange-300 text-orange-950 border border-orange-950";
            case taskGenre.PESSOAL:
                return "bg-indigo-300 text-indigo-950 border border-indigo-950";
            case taskGenre.TRABALHO:
                return "bg-emerald-300 text-emerald-950 border border-emerald-950";
        }
    };

    return (
        <div className="bg-zinc-500/50 w-100 px-5 sm:px-3 py-1 rounded-lg flex gap-8 sm:gap-2 items-center my-2">
            <input type="checkbox" className="rounded-full w-6 h-6" />

            <div className="w-full p-2 text-white overflow-hidden sm:text-sm">
                <p>{content}</p>
            </div>

            <div className={twMerge("w-20 py-1 px-1 text-center font-medium text-xs rounded-lg", genreColor(genre))}>
                {genre}
            </div>

            <button className="group flex justify-center items-center relative" onClick={() => handleDeleteTask(id)}>
                <GoTrash className="transition-all text-black group-hover:text-red-600 absolute" />
                <span className="transition-all h-8 w-8 bg-white/20 group-hover:bg-white/80 rounded-full"></span>
            </button>
        </div>
    )
}