export interface AuthFormProps {
    formTitle: string;
    formSubTitle: string;
    actions: {
        name: string;
        type?: 'button' | 'submit' | 'reset';
        onClick?: () => void;
    }[];
    children?: React.ReactNode;
}

export interface FormData {
    username: string;
    email: string;
    password: string;
  }
  
export interface ErrorData {
    username?: string | null;
    email?: string | null;
    password?: string | null;
  }