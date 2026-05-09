import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = [
  {
    id: 1,
    name: "Website Redesign",
    desc: "Complete redesign of company website",
    icon: "W",
    color: "#1F88FF",
    progress: 0,
    tasks: { completed: 0, total: 2 },
    members: 2,
    created: "01.05.2026",
    taskList: [
      {
        id: 101,
        title: "Design landing page",
        desc: "Create mockups for the new landing page",
        status: "todo",
        priority: "high",
        tags: ["design", "ui"],
        assignee: { name: "John Doe", avatar: "J" },
        dueDate: ".",
      },
      {
        id: 102,
        title: "Setup React project",
        desc: "Initialize React project with TypeScript",
        status: "inProgress",
        priority: "medium",
        tags: ["development"],
        assignee: { name: "Jane Smith", avatar: "J" },
        dueDate: ".",
      },
    ],
  },
  {
    id: 2,
    name: "Mobile App",
    desc: "iOS and Android mobile application",
    icon: "M",
    color: "#1AC768",
    progress: 0,
    tasks: { completed: 0, total: 1 },
    members: 1,
    created: "01.05.2026",
    taskList: [],
  },
];

export const useProjectsStore = create(
  persist((set) => ({
    projects: initialState,

    createTask: ({projectId, newTask}) => set((state) =>({
        projects: state.projects.map((project) => project.id === projectId ? ({...project, taskList: [...project.taskList, newTask]}) : project)
    }))
  }), 
  {name: 'projects'}
),
);