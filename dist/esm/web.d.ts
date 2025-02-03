import { WebPlugin } from '@capacitor/core';
import type { KakaoLoginPlugin, KakaoLoginResponse } from './definitions';
interface LoginParams {
    throughTalk?: boolean;
    persistAccessToken?: boolean;
    scope?: string;
    success: (response: LoginResponse) => void;
    fail: (error: KakaoError) => void;
}
interface LoginResponse {
    token_type: string;
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
    id_token?: string;
}
interface KakaoError {
    error: string;
    error_description: string;
}
interface Profile {
    nickname: string;
    profile_image: string;
    thumbnail_image_url: string;
    profile_needs_agreement?: boolean;
}
interface KakaoAccount {
    profile: Profile;
    email: string;
    age_range: string;
    birthday: string;
    birthyear: string;
    gender: 'female' | 'male';
    phone_number: string;
    ci: string;
}
interface UserProfile {
    id: number;
    kakao_account: KakaoAccount;
    synched_at: string;
    connected_at: string;
    properties: Profile;
}
interface RequestParams {
    url: string;
    success: (profile: UserProfile) => void;
    fail: (error: KakaoError) => void;
}
interface KakaoAPI {
    request: (params: RequestParams) => void;
}
declare global {
    interface Window {
        Kakao?: {
            init: (...args: any[]) => void;
            Auth: {
                login: (params: LoginParams) => void;
                loginForm: (params: LoginParams) => void;
                logout: (callback: () => void) => void;
                getAccessToken: () => string | null;
            };
            API: KakaoAPI;
        };
    }
}
export declare class KakaoLoginPluginWeb extends WebPlugin implements KakaoLoginPlugin {
    private response?;
    private hasInit;
    initForWeb: (appkey: string) => Promise<void>;
    goLogin: () => Promise<KakaoLoginResponse>;
    goLogout(): Promise<void>;
    getUserInfo(): Promise<{
        value: any;
    }>;
    private loadSDK;
    sendLinkFeed(_options: never): Promise<void>;
    talkInChannel(_options: never): Promise<void>;
    private testSDK;
}
export {};
