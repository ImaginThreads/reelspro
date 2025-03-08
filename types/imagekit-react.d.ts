declare module 'imagekit-react' {
    export const IKContext: React.FC<{
        publicKey: string;
        urlEndpoint: string;
        authenticationEndpoint: string;
        children: React.ReactNode;
    }>;
    
    export const IKImage: React.FC<{
        path: string;
        transformation?: Array<any>;
        className?: string;
        alt?: string;
    }>;
    
    export const IKVideo: React.FC<{
        path: string;
        transformation?: Array<any>;
        className?: string;
        controls?: boolean;
    }>;
} 