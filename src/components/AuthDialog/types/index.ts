export interface AuthDialogProps {
    isOpen: boolean;
    children?: React.ReactNode;
    handleClose: () => void;
}
