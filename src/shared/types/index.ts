export interface DocumentRequest {
  id: number;
  name: string;
  verification: string;
  startDate: string;
  dueDate: string;
  status: {
    type: "required" | "pending" | "approved" | "declined";
    text: string;
  };
  documentsRequired: number;
  documents: Document[];
}

export interface Document {
  docType: string;
  files?: string[];
  status?: "approved" | "insufficient";
  insufficientMessage?: string;
}

export interface Option {
  value: string;
  label: string;
}

export enum ActionTypes {
  ADD,
  EDIT,
  DELETE,
  CONTINUE,
  null,
}

export enum ActionEnum {
  INITIALIZE,
  ADD_REQUEST,
  EDIT_REQUEST,
  REMOVE_REQUEST,
  UPDATE_REQUEST,
  OPEN_ERROR_MODAL,
  CLOSE_ERROR_MODAL,
}

export type Action =
  | {
      type: ActionEnum.INITIALIZE;
      payload: {
        requests: DocumentRequest[];
      };
    }
  | {
      type: ActionEnum.ADD_REQUEST;
      payload: {
        request: DocumentRequest;
      };
    }
  | {
      type: ActionEnum.EDIT_REQUEST;
      payload: {
        index: number;
        request: DocumentRequest;
      };
    }
  | {
      type: ActionEnum.REMOVE_REQUEST;
      payload: {
        index: number;
      };
    }
  | {
      type: ActionEnum.UPDATE_REQUEST;
      payload: {
        index: number;
        request: DocumentRequest;
      };
    };
