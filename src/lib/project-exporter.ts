import { Project } from '@/types/real-project';

export class ProjectExporter {
  static exportProject(project: Project): void {
    const projectInfo = {
      name: project.name,
      description: project.description,
      framework: project.framework,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      path: project.path,
      metadata: {
        exportedAt: new Date().toISOString(),
        exportType: 'full-project'
      }
    };

    this.downloadJSON(projectInfo, `${project.name}-info.json`);
    
    alert(
      `Project "${project.name}" information exported successfully!\n\n` +
      `To access the actual project files, navigate to:\n${project.path}\n\n` +
      `You can copy the entire project directory to share or backup your project.`
    );
  }

  static getProjectPath(project: Project): string {
    return project.path;
  }

  private static downloadJSON(data: any, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}