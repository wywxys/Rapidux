// Style CSS code generator utilities

import { LayoutType, FlexDirection } from '../types';

export interface StyleSettings {
  layoutType: LayoutType;
  flexDirection: FlexDirection;
  fontSize: string;
  borderRadius: number[];
}

export function generateStyleCSS(settings: StyleSettings): string {
  const { layoutType, flexDirection, fontSize, borderRadius } = settings;
  
  return `/* Component Style Settings */

/* Layout Configuration */
.component {
  display: ${layoutType};
  ${layoutType === 'flex' ? `flex-direction: ${flexDirection};` : ''}
  ${layoutType === 'grid' ? `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));` : ''}
  gap: 1rem;
}

/* Typography */
.component {
  font-size: ${fontSize};
  line-height: 1.5;
  font-weight: 400;
}

/* Border Radius */
.component {
  border-radius: ${borderRadius[0]}px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .component {
    ${layoutType === 'flex' && flexDirection === 'row' ? 'flex-direction: column;' : ''}
    gap: 0.5rem;
  }
}

/* Common Utility Classes */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex-start {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.flex-end {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

/* Grid Utilities */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.grid-fixed {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`;
}

export interface ColorTheme {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
}

export function generateColorThemeCSS(theme: ColorTheme): string {
  return `/* Color Theme Configuration */

:root {
  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --primary: ${theme.primary};
  --primary-foreground: ${theme.primaryForeground};
  --secondary: ${theme.secondary};
  --secondary-foreground: ${theme.secondaryForeground};
  --muted: ${theme.muted};
  --muted-foreground: ${theme.mutedForeground};
}

/* Base Styles */
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Primary Elements */
.primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.primary-hover:hover {
  background-color: hsl(var(--primary) / 0.9);
}

/* Secondary Elements */
.secondary {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.secondary-hover:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

/* Muted Elements */
.muted {
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

/* Text Colors */
.text-primary {
  color: hsl(var(--primary));
}

.text-secondary {
  color: hsl(var(--secondary));
}

.text-muted {
  color: hsl(var(--muted-foreground));
}

/* Border Colors */
.border-primary {
  border-color: hsl(var(--primary));
}

.border-secondary {
  border-color: hsl(var(--secondary));
}

.border-muted {
  border-color: hsl(var(--muted));
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
  }
}`;
}
