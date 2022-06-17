import { blocksGenerator } from '@deip/vue-layout-schema';

import { ProjectContent } from '@/modules/projects/components/content/ProjectContent';

export const layoutBuilderElements = {
  blocks: [
    {
      title: 'Components',
      blocks: [
        ...blocksGenerator([
          {
            component: ProjectContent,
            data: {
              props: {
                projectId: '{{projectContent.projectId}}'
              }
            },
            icon: 'mdi-file-document-multiple-outline',
            blockType: 'simple',
            layoutType: 'details',
            scope: ['nftCollection'],
            disabledProps: [
              'projectId'
            ]
          }
        ])
      ]
    }
  ],
  components: {
    ProjectContent
  }
};
