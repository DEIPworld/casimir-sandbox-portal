import { nftCollectionsRouter } from './router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of nftCollectionsRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[TestAppNftCollectionsModule]: router istance is not provided');
  }
};

export const TestAppNftCollectionsModule = {
  name: 'TestAppNftCollectionsModule',
  deps: [
    'EnvModule',
    'AuthModule',
    'NftCollectionsModule'
  ],
  install
};
