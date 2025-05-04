export interface AuthGuardType {
    children: React.ReactNode;
    allowedRoles: string[];
};
export interface User {
    username: string,
    password: string
}

export interface AuthState { user: User | null; error: string | null };
