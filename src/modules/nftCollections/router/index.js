import { SYSTEM_ROLE } from '@deip/auth-module';
import { routerView } from '@deip/platform-util';
import { VIEW_MODE } from '@deip/constants';

import { NftCollectionList } from '@/modules/nftCollections/components/NftCollectionList';
import { NftCollectionForm } from '@/modules/nftCollections/components/NftCollectionForm';
import { NftCollectionDetails } from '@/modules/nftCollections/components/NftCollectionDetails';
import { ProjectContentDraftForm }
  from '@/modules/nftCollections/components/content/ProjectContentDraftForm';
import { ProjectContentDraftDetails }
  from '@/modules/nftCollections/components/content/ProjectContentDraftDetails';
import { ProjectContentDetails }
  from '@/modules/nftCollections/components/content/ProjectContentDetails';

const formViewMeta = (redirectTo, roles = [SYSTEM_ROLE.TEAM_ADMIN, SYSTEM_ROLE.ADMIN]) => ({
  auth: roles,
  redirectTo,
  viewSetup: {
    appBar: { type: 'back' },
    sideBar: { disabled: true }
  }
});

export const nftCollectionsRouter = [
  {
    path: '/nft-collections',
    component: routerView,
    meta: { auth: [SYSTEM_ROLE.ANY] },
    children: [
      {
        name: 'nftCollections',
        path: '',
        component: NftCollectionList,
        meta: { auth: false }
      },
      {
        name: 'nftCollections.create',
        path: 'create',
        component: NftCollectionForm,
        meta: formViewMeta('nftCollections'),
        props: (route) => ({
          teamId: route.query.teamId,
          mode: VIEW_MODE.CREATE
        })
      },
      {
        name: 'nftCollections.details',
        path: ':nftCollectionId',
        component: NftCollectionDetails,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          nftCollectionId: route.params.nftCollectionId
        })
      },
      {
        name: 'nftCollections.edit',
        path: ':nftCollectionId/edit',
        component: NftCollectionForm,
        meta: formViewMeta('nftCollections.details'),
        props: (route) => ({
          nftCollectionId: route.params.nftCollectionId,
          mode: VIEW_MODE.EDIT
        })
      },
      {
        name: 'nftCollections.content.draft.create',
        path: ':nftCollectionId/content/draft/create',
        component: ProjectContentDraftForm,
        meta: formViewMeta('nftCollections.details', [SYSTEM_ROLE.ANY]),
        props: (route) => ({
          nftCollectionId: route.params.nftCollectionId,
          mode: VIEW_MODE.CREATE
        })
      },
      {
        name: 'nftCollections.content.draft.details',
        path: ':nftCollectionId/content/draft/:draftId',
        component: ProjectContentDraftDetails,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          nftCollectionId: route.params.nftCollectionId,
          draftId: route.params.draftId
        })
      },
      {
        name: 'nftCollections.content.draft.edit',
        path: ':nftCollectionId/content/draft/:draftId/edit',
        component: ProjectContentDraftForm,
        meta: formViewMeta('nftCollections.details', [SYSTEM_ROLE.ANY]),
        props: (route) => ({
          nftCollectionId: route.params.nftCollectionId,
          draftId: route.params.draftId,
          mode: VIEW_MODE.EDIT
        })
      },
      {
        name: 'nftCollections.content.details',
        path: ':nftCollectionId/content/:contentId',
        component: ProjectContentDetails,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          nftCollectionId: route.params.nftCollectionId,
          contentId: route.params.contentId
        })
      }
    ]
  }
];
