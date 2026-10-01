export type ToolkitCategoryId =
  | 'interface'
  | 'application'
  | 'data'
  | 'workflow';

export type ToolkitFilterId =
  | 'all'
  | ToolkitCategoryId;

export type ToolkitProjectId =
  | 'eventure'
  | 'eatme'
  | 'library-hub';

export type ToolkitNodeSize =
  | 'primary'
  | 'secondary'
  | 'supporting';

export type ToolkitNodePosition = [
  x: number,
  y: number,
  z: number,
];

export type ToolkitTechnology = {
  id: string;
  name: string;
  shortName?: string;

  category: ToolkitCategoryId;

  description: string;

  nodeSize: ToolkitNodeSize;

  position: ToolkitNodePosition;

  accent:
    | 'violet'
    | 'blue'
    | 'neutral';

  related: string[];

  usedWith: string[];

  projects: ToolkitProjectId[];

  icon?: string;

  featured?: boolean;
};

export type ToolkitCategory = {
  id: ToolkitCategoryId;
  number: string;
  label: string;
  shortLabel: string;
  description: string;
};

export type ToolkitConnection = {
  id: string;

  from: string;
  to: string;

  type:
    | 'primary'
    | 'secondary'
    | 'workflow';

  animated?: boolean;
};

export type ToolkitProject = {
  id: ToolkitProjectId;
  name: string;
  label: string;
};

export type ToolkitSecondaryGroup = {
  id: string;
  label: string;
  technologies: string[];
};