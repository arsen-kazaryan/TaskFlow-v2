import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const formatToday = () => new Date().toLocaleDateString('ru-RU')

const initialProjects = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Complete redesign of company website',
    colorClass: 'dashboard__project-dot--blue',
    completed: 0,
    total: 2,
    members: 2,
    created: '01.05.2026',
    taskList: [
      {
        id: 101,
        title: 'Design landing page',
        desc: 'Create mockups for the new landing page',
        status: 'todo',
        priority: 'high',
        tags: ['design', 'ui'],
        assignee: { name: 'John Doe', avatar: 'J' },
        dueDate: '30 Apr.',
      },
      {
        id: 102,
        title: 'Setup React project',
        desc: 'Initialize React project with TypeScript',
        status: 'inProgress',
        priority: 'medium',
        tags: ['development'],
        assignee: { name: 'Jane Smith', avatar: 'J' },
        dueDate: '25 Apr.',
      },
    ],
  },
  {
    id: 2,
    title: 'Mobile App',
    description: 'iOS and Android mobile application',
    colorClass: 'dashboard__project-dot--green',
    completed: 0,
    total: 1,
    members: 1,
    created: '01.05.2026',
    taskList: [],
  },
]

export const useProjectStore = create(
  persist(
    (set) => ({
      projects: initialProjects,
      addProject: ({ title, description, colorClass }) =>
        set((state) => ({
          projects: [
            {
              id: Date.now(),
              title,
              description,
              colorClass,
              completed: 0,
              total: 0,
              members: 1,
              created: formatToday(),
              taskList: [],
            },
            ...state.projects,
          ],
        })),
      updateProjectTasks: (projectId, taskList) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  taskList,
                  total: taskList.length,
                  completed: taskList.filter((task) => task.status === 'done').length,
                }
              : project
          ),
        })),
    }),
    {
      name: 'taskflow-projects',
    }
  )
)
