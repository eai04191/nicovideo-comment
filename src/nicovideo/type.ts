export interface Thread {
    id: number;
    fork: number;
    forkLabel: string;
    videoId: string;
    isActive: boolean;
    isDefaultPostTarget: boolean;
    isEasyCommentPostTarget: boolean;
    isLeafRequired: boolean;
    isOwnerThread: boolean;
    isThreadkeyRequired: boolean;
    threadkey: null;
    is184Forced: boolean;
    hasNicoscript: boolean;
    label: string;
    postkeyStatus: number;
    server: string;
}

export interface InitialData {
    comment: {
        threads: Thread[];
    };
}
