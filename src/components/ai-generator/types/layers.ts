export interface LayerInfo {
  id: string;
  name: string;
  type: 'container' | 'component' | 'text' | 'button' | 'card';
  children?: LayerInfo[];
}
