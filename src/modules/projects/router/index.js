import { SYSTEM_ROLE } from '@deip/auth-module';
import { routerView } from '@deip/platform-util';
import { VIEW_MODE } from '@deip/constants';

import { ProjectList } from '@/modules/projects/components/ProjectList';
import { ProjectForm } from '@/modules/projects/components/ProjectForm';
import { ProjectDetails } from '@/modules/projects/components/ProjectDetails';
import { ProjectContentDraftForm }
  from '@/modules/projects/components/content/ProjectContentDraftForm';
import { ProjectContentDraftDetails }
  from '@/modules/projects/components/content/ProjectContentDraftDetails';
import { ProjectContentDetails } from '@/modules/projects/components/content/ProjectContentDetails';

const formViewMeta = (redirectTo, roles = [SYSTEM_ROLE.TEAM_ADMIN, SYSTEM_ROLE.ADMIN]) => ({
  auth: roles,
  redirectTo,
  viewSetup: {
    appBar: { type: 'back' },
    sideBar: { disabled: true }
  }
});

export const projectsRouter = [
  {
    path: '/projects',
    component: routerView,
    meta: { auth: [SYSTEM_ROLE.ANY] },
    children: [
      {
        name: 'projects',
        path: '',
        component: ProjectList,
        meta: { auth: false }
      },
      {
        name: 'projects.create',
        path: 'create',
        component: ProjectForm,
        meta: formViewMeta('projects'),
        props: (route) => ({
          teamId: route.query.teamId,
          mode: VIEW_MODE.CREATE
        })
      },
      {
        name: 'projects.details',
        path: ':projectId',
        component: ProjectDetails,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          projectId: route.params.projectId
        })
      },
      {
        name: 'projects.edit',
        path: ':projectId/edit',
        component: ProjectForm,
        meta: formViewMeta('projects.details'),
        props: (route) => ({
          projectId: route.params.projectId,
          mode: VIEW_MODE.EDIT
        })
      },
      {
        name: 'projects.content.draft.create',
        path: ':projectId/content/draft/create',
        component: ProjectContentDraftForm,
        meta: formViewMeta('projects.details', [SYSTEM_ROLE.ANY]),
        props: (route) => ({
          projectId: route.params.projectId,
          mode: VIEW_MODE.CREATE
        })
      },
      {
        name: 'projects.content.draft.details',
        path: ':projectId/content/draft/:draftId',
        component: ProjectContentDraftDetails,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          projectId: route.params.projectId,
          draftId: route.params.draftId
        })
      },
      {
        name: 'projects.content.draft.edit',
        path: ':projectId/content/draft/:draftId/edit',
        component: ProjectContentDraftForm,
        meta: formViewMeta('projects.details', [SYSTEM_ROLE.ANY]),
        props: (route) => ({
          projectId: route.params.projectId,
          draftId: route.params.draftId,
          mode: VIEW_MODE.EDIT
        })
      },
      {
        name: 'projects.content.details',
        path: ':projectId/content/:contentId',
        component: ProjectContentDetails,
        meta: { auth: [SYSTEM_ROLE.ANY] },
        props: (route) => ({
          projectId: route.params.projectId,
          contentId: route.params.contentId
        })
      }
    ]
  }
];
