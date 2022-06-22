import { blocksGenerator } from '@deip/vue-layout-schema';

import { ProjectContent } from '@/modules/nftCollections/components/content/ProjectContent';

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
                nftCollectionId: '{{projectContent.nftCollectionId}}'
              }
            },
            icon: 'mdi-file-document-multiple-outline',
            blockType: 'simple',
            layoutType: 'details',
            scope: ['nftCollection'],
            disabledProps: [
              'nftCollectionId'
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
