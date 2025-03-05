// Define Types
export interface Folder {
  _id?: string;
  name: string;
  description: string;
  master_id: string;
  createdAt?: string;
}

export interface File {
  _id?: string;
  name: string;
  description: string;
  folder_id: string;
  createdAt?: any;
}

export interface Breadcrumbs {
  _id?: string;
  name: string;
  description: string;
  master_id: string;
  createdAt?: string;
}

export interface Project {
  _id?: string;
  name: string;
  description: string;
  createdAt?: string;
}