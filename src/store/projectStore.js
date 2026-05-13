import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const formatToday = () => new Date().toLocaleDateString('ru-RU')

const getProjectProgress = (completed, total) => {
  if (total === 0) return 0

  return Math.round((completed / total) * 100)
}

const getProjectTaskStats = (taskList = []) => {
  return {
    completed: taskList.filter((task) => task.status === 'done').length,
    total: taskList.length,
    inProgress: taskList.filter((task) => task.status === 'inProgress').length,
    favorites: taskList.filter((task) => task.isFavorite).length,
  }
}

const createProjectState = ({
  id,
  title,
  description,
  colorClass,
  members = 1,
  created = formatToday(),
  taskList = [],
}) => {
  const tasks = getProjectTaskStats(taskList)

  return {
    id,
    title,
    description,
    colorClass,
    members,
    created,
    taskList,
    tasks,
    progress: getProjectProgress(tasks.completed, tasks.total),
  }
}

const normalizeProject = (project) =>
  createProjectState({
    id: project.id,
    title: project.title,
    description: project.description,
    colorClass: project.colorClass,
    members: project.members,
    created: project.created,
    taskList: project.taskList ?? [],
  })

const getDashboardStats = (projects) => {
  return {
    total: projects.reduce((sum, project) => sum + project.tasks.total, 0),
    inProgress: projects.reduce((sum, project) => sum + project.tasks.inProgress, 0),
    completed: projects.reduce((sum, project) => sum + project.tasks.completed, 0),
    favorites: projects.reduce((sum, project) => sum + project.tasks.favorites, 0),
  }
}

const initialProjects = [
  createProjectState({
    id: 1,
    title: 'Website Redesign',
    description: 'Complete redesign of company website',
    colorClass: 'dashboard__project-dot--blue',
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
  }),
  createProjectState({
    id: 2,
    title: 'Mobile App',
    description: 'iOS and Android mobile application',
    colorClass: 'dashboard__project-dot--green',
    members: 1,
    created: '01.05.2026',
    taskList: [],
  }),
]

export const useProjectStore = create(
  persist(
    (set) => ({
      projects: initialProjects,
      getProjectProgress,
      getDashboardStats,
      addProject: ({ title, description, colorClass }) =>
        set((state) => ({
          projects: [
            createProjectState({
              id: Date.now(),
              title,
              description,
              colorClass,
              members: 1,
              created: formatToday(),
              taskList: [],
            }),
            ...state.projects,
          ],
        })),
      createTask: ({ projectId, task }) =>
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== projectId) {
              return project
            }

            const nextTaskId =
              project.taskList.length > 0
                ? Math.max(...project.taskList.map((item) => item.id), 0) + 1
                : 1

            const newTask = {
              id: nextTaskId,
              ...task,
              created: formatToday(),
            }

            return createProjectState({
              ...project,
              taskList: [...project.taskList, newTask],
            })
          }),
        })),
      updateProjectTasks: (projectId, taskList) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? createProjectState({
                  ...project,
                  taskList,
                })
              : project
          ),
        })),
      importProjects: (projects) =>
        set(() => ({
          projects: projects.map(normalizeProject),
        })),
      clearProjects: () =>
        set(() => ({
          projects: [],
        })),
    }),
    {
      name: 'taskflow-projects',
      merge: (persistedState, currentState) => {
        const persistedProjects = Array.isArray(persistedState?.projects)
          ? persistedState.projects
          : currentState.projects

        return {
          ...currentState,
          ...(persistedState ?? {}),
          projects: persistedProjects.map(normalizeProject),
        }
      },
    }
  )
)
