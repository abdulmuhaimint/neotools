export interface TemplateType {
  name: string;
  submodules: TemplateType[] | SubModuleType[];
}

export interface SubModuleType {
   name: string; 
}
