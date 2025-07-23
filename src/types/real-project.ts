// 实际项目数据类型定义
export interface Project {
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

// 项目创建请求类型
export interface CreateProjectRequest {
  name: string;
  description?: string;
  framework?: 'nextjs' | 'react' | 'vue';
}

// 项目更新请求类型
export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: 'active' | 'archived';
}

// API响应类型
export interface ProjectResponse {
  project: Project;
  message?: string;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface ProjectStatsResponse {
  project: Project;
  stats: {
    files: {
      total: number;
      byType: Record<string, number>;
    };
    size: number;
    lastModified: Date;
  };
}
