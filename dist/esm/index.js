import { registerPlugin } from '@capacitor/core';
const KakaoLoginPlugin = registerPlugin('KakaoLoginPlugin', {
    web: () => import('./web').then(m => new m.KakaoLoginPluginWeb()),
});
export * from './definitions';
export { KakaoLoginPlugin };
//# sourceMappingURL=index.js.map