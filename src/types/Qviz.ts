export interface IQviz {
  question: string;
  answers?: string[]; 
  inputType?: 'number' | 'text'; 
  min?: number; 
  max?: number; 
  step?: number; 
  unit?: string; 
}