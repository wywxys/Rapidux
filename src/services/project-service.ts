import { Project, sampleProjects, ProjectFile } from '@/types/project';

// 简单的内存存储 (实际项目中应该使用数据库)
let projects: Project[] = [...sampleProjects];

export class ProjectService {
  // 获取用户的所有项目
  static getUserProjects(userId: string): Project[] {
    return projects.filter(project => project.userId === userId);
  }

  // 根据ID获取项目
  static getProjectById(projectId: string): Project | null {
    return projects.find(project => project.id === projectId) || null;
  }

  // 创建新项目
  static createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    projects.push(newProject);
    return newProject;
  }

  // 更新项目
  static updateProject(projectId: string, updates: Partial<Project>): Project | null {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return null;

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...updates,
      updatedAt: new Date(),
    };

    return projects[projectIndex];
  }

  // 删除项目
  static deleteProject(projectId: string): boolean {
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return false;

    projects.splice(projectIndex, 1);
    return true;
  }

  // 获取项目文件内容
  static getProjectFileContent(projectId: string, filePath: string): string | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    const file = project.files.find(f => f.path === filePath);
    return file ? file.content : null;
  }

  // 更新项目文件
  static updateProjectFile(projectId: string, filePath: string, content: string): boolean {
    const project = this.getProjectById(projectId);
    if (!project) return false;

    const fileIndex = project.files.findIndex(f => f.path === filePath);
    if (fileIndex === -1) return false;

    project.files[fileIndex].content = content;
    project.files[fileIndex].lastModified = new Date();
    project.updatedAt = new Date();

    return true;
  }

  // 为项目添加新文件
  static addProjectFile(projectId: string, fileData: Omit<ProjectFile, 'id' | 'lastModified'>): boolean {
    const project = this.getProjectById(projectId);
    if (!project) return false;

    const newFile: ProjectFile = {
      ...fileData,
      id: `file-${Date.now()}`,
      lastModified: new Date(),
    };

    project.files.push(newFile);
    project.updatedAt = new Date();

    return true;
  }
}
