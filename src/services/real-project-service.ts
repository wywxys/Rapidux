import fs from 'fs';
import path from 'path';

// 检查是否在服务器端
const isServer = typeof window === 'undefined';

// 实际项目类型定义
export interface RealProject {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  path: string; // 项目在文件系统中的路径
  status: 'active' | 'archived';
  framework: 'nextjs' | 'react' | 'vue';
}

// 项目元数据文件
interface ProjectMetadata {
  projects: RealProject[];
}

// 项目根目录
const PROJECTS_ROOT = path.join(process.cwd(), 'user-projects');
const DEMO_PROJECTS_PATH = path.join(PROJECTS_ROOT, 'demo');
const METADATA_FILE = path.join(PROJECTS_ROOT, 'projects-metadata.json');

export class RealProjectService {
  // 确保项目根目录存在
  static async ensureProjectsDir(): Promise<void> {
    if (!isServer) return;
    
    try {
      if (!fs.existsSync(PROJECTS_ROOT)) {
        fs.mkdirSync(PROJECTS_ROOT, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating projects directory:', error);
    }
  }
  
  // 初始化项目目录
  static async initializeProjectsDirectory(): Promise<void> {
    if (!isServer) {
      throw new Error('This operation can only be performed on the server');
    }
    
    try {
      // 确保项目根目录存在
      if (!fs.existsSync(PROJECTS_ROOT)) {
        fs.mkdirSync(PROJECTS_ROOT, { recursive: true });
      }
      
      // 初始化元数据文件
      if (!fs.existsSync(METADATA_FILE)) {
        const initialMetadata: ProjectMetadata = { projects: [] };
        fs.writeFileSync(METADATA_FILE, JSON.stringify(initialMetadata, null, 2));
      }
    } catch (error) {
      console.error('Failed to initialize projects directory:', error);
      throw error;
    }
  }

  // 读取项目元数据
  static getProjectMetadata(): ProjectMetadata {
    if (!isServer) {
      return { projects: [] };
    }
    
    try {
      if (!fs.existsSync(METADATA_FILE)) {
        return { projects: [] };
      }
      const data = fs.readFileSync(METADATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to read project metadata:', error);
      return { projects: [] };
    }
  }

  // Save project metadata
  static saveProjectMetadata(metadata: ProjectMetadata): void {
    if (!isServer) {
      throw new Error('This operation can only be performed on the server');
    }
    
    try {
      fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
    } catch (error) {
      console.error('Failed to save project metadata:', error);
      throw error;
    }
  }

  // 获取所有示例项目
  static async getDemoProjects(): Promise<RealProject[]> {
    if (!isServer) return [];
    
    try {
      await this.ensureProjectsDir();
      
      const demoProjects: RealProject[] = [];
      const templates = this.getAvailableTemplates();
      
      for (const templateName of templates) {
        const projectJsonPath = path.join(DEMO_PROJECTS_PATH, templateName, 'project.json');
        
        if (fs.existsSync(projectJsonPath)) {
          const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
          demoProjects.push({
            ...projectData,
            userId: 'demo',
            createdAt: new Date(projectData.createdAt),
            updatedAt: new Date(projectData.updatedAt),
            path: path.join('user-projects', 'demo', templateName)
          });
        }
      }
      
      return demoProjects;
    } catch (error) {
      console.error('Error getting demo projects:', error);
      return [];
    }
  }
  static getAllProjects(): RealProject[] {
    const metadata = this.getProjectMetadata();
    return metadata.projects;
  }

  // 获取用户的所有项目
  static async getUserProjects(userId: string): Promise<RealProject[]> {
    const allProjects = this.getAllProjects();
    // 只返回属于该用户的项目，不包括demo项目
    return allProjects.filter(project => project.userId === userId);
  }

  // 根据ID获取项目
  static async getProjectById(projectId: string): Promise<RealProject | null> {
    // 查找常规项目
    const projects = this.getAllProjects();
    return projects.find(project => project.id === projectId) || null;
  }

  // 验证项目名称唯一性
  static validateProjectName(userId: string, projectName: string, excludeId?: string): boolean {
    const allProjects = this.getAllProjects();
    const userProjects = allProjects.filter(project => project.userId === userId);
    return !userProjects.some(p => 
      p.name.toLowerCase() === projectName.toLowerCase() && 
      p.id !== excludeId
    );
  }

  // 生成项目ID
  static generateProjectId(): string {
    return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

    // 获取可用的模板项目
  static getAvailableTemplates(): string[] {
    if (!isServer) return [];
    
    try {
      if (!fs.existsSync(DEMO_PROJECTS_PATH)) {
        return [];
      }
      
      return fs.readdirSync(DEMO_PROJECTS_PATH, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    } catch (error) {
      console.error('Error getting templates:', error);
      return [];
    }
  }

  // 获取可用的模板项目信息
  static async getAvailableTemplatesInfo(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    framework: string;
    tags: string[];
    preview?: string;
  }>> {
    if (!isServer) return [];
    
    try {
      await this.ensureProjectsDir();
      
      const templates: Array<{
        id: string;
        name: string;
        description: string;
        framework: string;
        tags: string[];
        preview?: string;
      }> = [];
      
      const templateNames = this.getAvailableTemplates();
      
      for (const templateName of templateNames) {
        const projectJsonPath = path.join(DEMO_PROJECTS_PATH, templateName, 'project.json');
        
        if (fs.existsSync(projectJsonPath)) {
          const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
          templates.push({
            id: templateName,
            name: projectData.name,
            description: projectData.description,
            framework: projectData.framework,
            tags: projectData.tags || [],
            preview: `/api/templates/${templateName}/preview`
          });
        }
      }
      
      return templates;
    } catch (error) {
      console.error('Error getting template info:', error);
      return [];
    }
  }

  // 获取模板路径
  static getTemplatePath(templateName?: string): string {
    const templates = this.getAvailableTemplates();
    
    // 如果没有指定模板或模板不存在，使用第一个可用模板
    const selectedTemplate = (templateName && templates.includes(templateName)) 
      ? templateName 
      : templates[0] || 'modern-ecommerce';
      
    return path.join(DEMO_PROJECTS_PATH, selectedTemplate);
  }
  static async copyTemplate(templatePath: string, targetPath: string): Promise<void> {
    const copyRecursive = (src: string, dest: string) => {
      if (!fs.existsSync(src)) {
        throw new Error(`Template path does not exist: ${src}`);
      }

      const stats = fs.statSync(src);
      
      if (stats.isDirectory()) {
        // 创建目标目录
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        
        // 递归复制子文件和目录
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
          // 跳过 node_modules, .git, .next 等目录
          if (['node_modules', '.git', '.next', 'dist', 'build'].includes(entry)) {
            continue;
          }
          
          const srcPath = path.join(src, entry);
          const destPath = path.join(dest, entry);
          copyRecursive(srcPath, destPath);
        }
      } else {
        // 复制文件
        fs.copyFileSync(src, dest);
      }
    };

    try {
      copyRecursive(templatePath, targetPath);
    } catch (error) {
      console.error('Failed to copy template:', error);
      throw error;
    }
  }

  // 更新项目的package.json
  static updateProjectPackageJson(projectPath: string, projectName: string): void {
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
        packageJson.description = `Generated by Rapidux for project: ${projectName}`;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }
    } catch (error) {
      console.error('Failed to update package.json:', error);
    }
  }

  // 创建新项目
  static async createProject(
    userId: string,
    name: string,
    description: string,
    framework: 'nextjs' | 'react' | 'vue' = 'nextjs',
    templateId?: string
  ): Promise<RealProject> {
    // 验证项目名称唯一性
    if (!this.validateProjectName(userId, name)) {
      throw new Error(`Project name "${name}" already exists for this user`);
    }

    // 确保项目目录已初始化
    await this.initializeProjectsDirectory();

    const projectId = this.generateProjectId();
    const now = new Date();
    
    // 创建用户目录
    const userDir = path.join(PROJECTS_ROOT, userId);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    // 创建项目目录
    const projectDirName = name.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const projectPath = path.join(userDir, projectDirName);
    
    if (fs.existsSync(projectPath)) {
      throw new Error(`Project directory already exists: ${projectPath}`);
    }

    try {
      // 获取模板路径 - 优先使用指定的模板ID
      const templatePath = this.getTemplatePath(templateId || framework);
      
      // 复制模板到项目目录
      await this.copyTemplate(templatePath, projectPath);
      
      // 更新项目的package.json
      this.updateProjectPackageJson(projectPath, name);

      // 创建项目元数据
      const newProject: RealProject = {
        id: projectId,
        name,
        description,
        userId,
        createdAt: now,
        updatedAt: now,
        path: projectPath,
        status: 'active',
        framework
      };

      // Save to metadata
      const metadata = this.getProjectMetadata();
      metadata.projects.push(newProject);
      this.saveProjectMetadata(metadata);

      console.log(`Project created successfully: ${projectPath}`);
      return newProject;

    } catch (error) {
      // 清理失败的创建
      if (fs.existsSync(projectPath)) {
        fs.rmSync(projectPath, { recursive: true, force: true });
      }
      throw error;
    }
  }

  // 更新项目
  static updateProject(projectId: string, updates: Partial<RealProject>): RealProject | null {
    const metadata = this.getProjectMetadata();
    const projectIndex = metadata.projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) return null;

    // 如果更新名称，验证唯一性
    if (updates.name && updates.name !== metadata.projects[projectIndex].name) {
      if (!this.validateProjectName(metadata.projects[projectIndex].userId, updates.name, projectId)) {
        throw new Error(`Project name "${updates.name}" already exists for this user`);
      }
    }

    metadata.projects[projectIndex] = {
      ...metadata.projects[projectIndex],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveProjectMetadata(metadata);
    return metadata.projects[projectIndex];
  }

  // 删除项目
  static async deleteProject(projectId: string): Promise<boolean> {
    const project = await this.getProjectById(projectId);
    if (!project) return false;

    try {
      // 删除项目目录
      if (fs.existsSync(project.path)) {
        fs.rmSync(project.path, { recursive: true, force: true });
      }

      // 从元数据中移除
      const metadata = this.getProjectMetadata();
      metadata.projects = metadata.projects.filter(p => p.id !== projectId);
      this.saveProjectMetadata(metadata);

      console.log(`Project deleted successfully: ${project.path}`);
      return true;
    } catch (error) {
      console.error('Failed to delete project:', error);
      return false;
    }
  }

  // 归档项目
  static archiveProject(projectId: string): RealProject | null {
    return this.updateProject(projectId, { status: 'archived' });
  }

  // 激活项目
  static activateProject(projectId: string): RealProject | null {
    return this.updateProject(projectId, { status: 'active' });
  }

  // 获取项目统计信息
  static async getProjectStats(projectId: string): Promise<any> {
    const project = await this.getProjectById(projectId);
    if (!project || !fs.existsSync(project.path)) return null;

    const countFiles = (dir: string): { total: number; byType: Record<string, number> } => {
      let total = 0;
      const byType: Record<string, number> = {};

      const traverse = (currentPath: string) => {
        const entries = fs.readdirSync(currentPath);
        
        for (const entry of entries) {
          const fullPath = path.join(currentPath, entry);
          const stats = fs.statSync(fullPath);
          
          if (stats.isDirectory()) {
            // 跳过特定目录
            if (['node_modules', '.git', '.next', 'dist', 'build'].includes(entry)) {
              continue;
            }
            traverse(fullPath);
          } else {
            total++;
            const ext = path.extname(entry).toLowerCase();
            byType[ext] = (byType[ext] || 0) + 1;
          }
        }
      };

      traverse(dir);
      return { total, byType };
    };

    const fileStats = countFiles(project.path);
    
    return {
      project,
      files: fileStats,
      size: this.getDirectorySize(project.path),
      lastModified: fs.statSync(project.path).mtime
    };
  }

  // 获取目录大小
  static getDirectorySize(dirPath: string): number {
    let size = 0;
    
    const traverse = (currentPath: string) => {
      const entries = fs.readdirSync(currentPath);
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          if (['node_modules', '.git', '.next', 'dist', 'build'].includes(entry)) {
            continue;
          }
          traverse(fullPath);
        } else {
          size += stats.size;
        }
      }
    };

    try {
      traverse(dirPath);
    } catch (error) {
      console.error('Error calculating directory size:', error);
    }
    
    return size;
  }
}
