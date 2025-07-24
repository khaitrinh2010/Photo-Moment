import {create} from 'zustand';
type ModalType = "createAlbum" | "createMoment" | "uploadPhoto" | null;

interface ModalStore {
    type: ModalType;
    isOpen: boolean;
    data?: any;
    onOpen: (type: ModalType, data?: any) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    data: undefined,
    onOpen: (type, data) => set({ type, isOpen: true, data }),
    onClose: () => set({ type: null, isOpen: false, data: undefined }),
}));
