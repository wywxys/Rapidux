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

  static exportAsJSON(project: Project): void {
    const projectData = {
      name: project.name,
      description: project.description,
      framework: project.framework,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      path: project.path,
      metadata: {
        exportedAt: new Date().toISOString(),
        exportType: 'json-export'
      }
    };

    this.downloadJSON(projectData, `${project.name.toLowerCase().replace(/\s+/g, '-')}.json`);
  }

  static exportAsNextJSProject(project: Project): void {
    const projectDocumentation = `# ${project.name}

## Project Information
- **Framework**: ${project.framework}
- **Status**: ${project.status}
- **Created**: ${new Date(project.createdAt).toLocaleDateString()}
- **Updated**: ${new Date(project.updatedAt).toLocaleDateString()}

## Description
${project.description}

## Project Path
\`${project.path}\`

## Export Information
- **Exported**: ${new Date().toLocaleDateString()}
- **Export Type**: Project Documentation

---
*This documentation was generated automatically from your Rapidux project.*
`;

    const blob = new Blob([projectDocumentation], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-project.md`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  static generateProjectStats(project: Project): string {
    const stats = {
      projectName: project.name,
      framework: project.framework,
      status: project.status,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      statistics: {
        projectAge: Math.floor((Date.now() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
        lastModified: Math.floor((Date.now() - new Date(project.updatedAt).getTime()) / (1000 * 60 * 60 * 24)),
        exportedAt: new Date().toISOString()
      },
      metadata: {
        exportType: 'statistics',
        version: '1.0.0'
      }
    };

    return JSON.stringify(stats, null, 2);
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