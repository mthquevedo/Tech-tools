import { useRef } from "react";
import { IoListSharp } from "react-icons/io5";
import { TaskProps, useToDo } from "../../contexts/task";
import { ReturnHomeButton } from "../ReturnHomeButton";
import { ToDoItem } from "../ToDoItem";
import { taskGenre, taskGenreValues } from "../ToDoItem/constants";

export function ToDoListContent() {
    const { tasks, addTask } = useToDo();

    const options = useRef<HTMLSelectElement>(null);
    const content = useRef<HTMLInputElement>(null);

    const handleCreateTask = (event: React.FormEvent) => {
        event.preventDefault();

        const id = "mq" + Math.random().toString(16).slice(2, 10);
        const optionValue = options.current?.value as taskGenreValues;
        const contentValue = content.current?.value;

        if (!contentValue) {
            alert("O conteúdo da tarefa não pode estar vazio!");
            return
        }

        AddTask({ id, genre: optionValue, content: contentValue });
    }

    const AddTask = ({ id, genre, content }: TaskProps) => {
        addTask({ id, genre, content });
        clearInputs()
    };

    const clearInputs = () => {
        (document.getElementById('genderOptions') as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById('taskContent') as HTMLInputElement).value = '';
    }

    return (
        <div className="flex-1">
            <ReturnHomeButton />

            <main className="h-5/6 bg-gray-400 flex md:flex-col justify-between items-start mt-7 shadow-lg rounded-lg mx-16 md:mx-0">

                <aside className="w-30v md:w-full h-full md:h-50v sm:min-h-64 bg-gradient-to-t from-neutral-800 to-neutral-800/70 px-8 sm:px-5 py-7 md:pb-1 rounded-l-lg md:rounded-r-lg overflow-hidden">
                    <form
                        className="flex flex-col justify-center gap-5 sm:gap-3"
                        onSubmit={handleCreateTask}
                    >

                        <div className="flex items-center gap-4 pb-4 sm:pb-0">
                            <span className="bg-orange-400 p-2 rounded-full"><IoListSharp /></span>
                            <h2 className="text-gray-50 font-bold text-lg">Crie uma nova tarefa:</h2>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-50 text-sm pb-2 md:pb-1">Selecione a categoria:</label>
                            <select
                                name="genderOptions"
                                id="genderOptions"
                                ref={options}
                                defaultValue={"Estudo"}
                                className="rounded-lg p-1 pl-1 bg-neutral-500 border border-gray-400 text-gray-50 focus:outline-none">
                                {Object.values(taskGenre).map((value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col text-gray-50">
                            <label className="text-gray-50 text-sm pb-2 md:pb-1">Conteúdo:</label>
                            <input
                                type="text"
                                id="taskContent"
                                ref={content}
                                placeholder="Descreva a tarefa"
                                className="rounded-lg p-1 pl-2 bg-neutral-500 border border-gray-400 text-gray-50 placeholder:text-gray-50 sm:placeholder:text-xs focus:outline-none" />
                        </div>

                        <div className="self-end pt-2 md:pt-0">
                            <button
                                type="submit"
                                className="bg-orange-400 text-orange-950 rounded-lg sm:rounded-md p-1 mt-2 sm:mt-1 sm:text-xs font-medium w-28 sm:w-20 border-2">
                                Adicionar
                            </button>
                        </div>
                    </form>
                </aside>

                <div className="w-80v md:w-full h-full px-8 sm:px-5 py-7 md:py-3 overflow-y-auto">
                    <p className="font-medium">Tarefas:</p>
                    {tasks.map(task => {
                        return (
                            <ToDoItem key={task.id} id={task.id} genre={task.genre} content={task.content} />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}