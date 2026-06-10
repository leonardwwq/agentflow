"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import {
  DEFAULT_PROJECT_ID,
  findProjectNode,
  getProjectPath,
  type WorkProjectNode,
} from "@/lib/work-projects"

interface WorkProjectContextValue {
  currentProjectId: string
  currentProject: WorkProjectNode | null
  projectPath: WorkProjectNode[]
  setCurrentProjectId: (id: string) => void
}

const WorkProjectContext = createContext<WorkProjectContextValue | null>(null)

export function WorkProjectProvider({ children }: { children: ReactNode }) {
  const [currentProjectId, setCurrentProjectIdState] = useState(DEFAULT_PROJECT_ID)

  const setCurrentProjectId = useCallback((id: string) => {
    if (findProjectNode(id)) {
      setCurrentProjectIdState(id)
    }
  }, [])

  const value = useMemo(() => {
    const currentProject = findProjectNode(currentProjectId)
    const projectPath = getProjectPath(currentProjectId) ?? []

    return {
      currentProjectId,
      currentProject,
      projectPath,
      setCurrentProjectId,
    }
  }, [currentProjectId, setCurrentProjectId])

  return <WorkProjectContext.Provider value={value}>{children}</WorkProjectContext.Provider>
}

export function useWorkProject() {
  const context = useContext(WorkProjectContext)
  if (!context) {
    throw new Error("useWorkProject must be used within WorkProjectProvider")
  }
  return context
}
