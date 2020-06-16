export interface Activity {
    id: number;
    name: string;
    medium: string;
    img: string;
    desc: string;
    isAvailable: boolean;
    branches: branches[];
    }

export interface LoginCre{
    email: string;
    password: string;
}

export interface branches{
    id: number,
    name: string,
    location: string,
    img: string,
    isAvailable: boolean,
    services: string[]

}