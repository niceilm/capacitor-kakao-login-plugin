var capacitorKakaoLogin = (function (exports, core) {
    'use strict';

    const KakaoLoginPlugin = core.registerPlugin('KakaoLoginPlugin', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.KakaoLoginPluginWeb()),
    });

    class KakaoLoginPluginWeb extends core.WebPlugin {
        constructor() {
            super(...arguments);
            this.hasInit = false;
            this.initForWeb = async (appkey) => {
                var _a;
                try {
                    await this.loadSDK();
                    this.testSDK();
                    if (!this.hasInit) {
                        (_a = window.Kakao) === null || _a === void 0 ? void 0 : _a.init(appkey);
                        this.hasInit = true;
                    }
                }
                catch (e) {
                    console.error('Error loading Kakao SDK', e);
                    return Promise.reject(e);
                }
            };
            this.goLogin = () => {
                this.testSDK();
                return new Promise((resolve, reject) => {
                    try {
                        window.Kakao.Auth.login({
                            throughTalk: true,
                            persistAccessToken: true,
                            success: (response) => {
                                console.log(response);
                                this.response = response;
                                const tokenExpire = new Date();
                                tokenExpire.setSeconds(tokenExpire.getSeconds() + response.expires_in);
                                const refreshTokenExpire = new Date();
                                refreshTokenExpire.setSeconds(refreshTokenExpire.getSeconds() +
                                    response.refresh_token_expires_in);
                                resolve({
                                    accessToken: response.access_token,
                                    expiredAt: tokenExpire.toISOString(),
                                    expiresIn: response.expires_in.toString(10),
                                    refreshToken: response.refresh_token,
                                    refreshTokenExpiresIn: response.refresh_token_expires_in.toString(10),
                                    tokenType: response.token_type,
                                    idToken: response.id_token,
                                    refreshTokenExpiredAt: response.refresh_token_expires_in.toString(10),
                                });
                            },
                            fail: (error) => {
                                console.error('Kakao Login Failed', error);
                                reject(new Error('Kakao Login Failed'));
                            },
                        });
                    }
                    catch (e) {
                        console.error('Error during Kakao login', e);
                        reject(e);
                    }
                });
            };
            this.loadSDK = () => {
                return new Promise((resolve, reject) => {
                    if (document.getElementById('kakao-script')) {
                        return resolve();
                    }
                    const script = document.createElement('script');
                    script.id = 'kakao-script';
                    script.type = 'text/javascript';
                    script.onload = resolve;
                    script.onerror = reject;
                    script.src = '//developers.kakao.com/sdk/js/kakao.min.js';
                    document.head.appendChild(script);
                });
            };
        }
        async goLogout() {
            this.testSDK();
            return new Promise((resolve, reject) => {
                var _a;
                const callBack = () => {
                    this.response = undefined;
                    resolve();
                };
                try {
                    (_a = window.Kakao) === null || _a === void 0 ? void 0 : _a.Auth.logout(callBack);
                }
                catch (e) {
                    console.error('Error logging out', e);
                    reject(e);
                }
            });
        }
        getUserInfo() {
            this.testSDK();
            if (!this.response) {
                return Promise.reject('Not logged in.');
            }
            return new Promise((resolve, reject) => {
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: profile => {
                        resolve({ value: profile });
                    },
                    fail: error => {
                        console.error(error);
                        reject(error);
                    },
                });
            });
        }
        sendLinkFeed(_options) {
            throw this.unimplemented('Not implemented on web.');
        }
        talkInChannel(_options) {
            throw this.unimplemented('Not implemented on web.');
        }
        testSDK() {
            if (!window.Kakao) {
                throw new Error('Kakao script not loaded. Call initForWeb for first');
            }
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        KakaoLoginPluginWeb: KakaoLoginPluginWeb
    });

    exports.KakaoLoginPlugin = KakaoLoginPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
