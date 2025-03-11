import {FilesViewType} from '../../acceptableTypes';

export interface IFile {
  file?: File;
  url?: string;
  type: string;
  alt?: string;
}
export interface IFileCard {
  item: IFile;
  sxMap: any;
  viewType: FilesViewType;
  canEdit: boolean;
  onRemove: () => void;
}
