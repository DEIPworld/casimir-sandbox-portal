import { blocksGenerator } from '@deip/vue-layout-schema';

import { crowdfundingBlocks, CrowdfundingWidget } from '@deip/investment-opportunities-module';
import { ProjectFtWidget } from '@/modules/projects/components/ProjectFtWidget';
import { ProjectContent } from '@/modules/projects/components/content/ProjectContent';

export const layoutBuilderElements = {
  blocks: [
    {
      title: 'Components',
      blocks: [
        ...crowdfundingBlocks.blocks,
        ...blocksGenerator([
          {
            component: ProjectFtWidget,
            data: {
              props: {
                nfts: '{{ProjectFtWidget.nfts}}', // rename to fts
                canUserIssueTokens: '{{ProjectFtWidget.canUserIssueTokens}}'
              }
            },
            icon: 'mdi-cash',
            blockType: 'simple',
            layoutType: 'details',
            scope: ['project'],
            disabledProps: [
              'nfts', // rename to fts
              'canUserIssueTokens'
            ]
          },
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
            scope: ['project'],
            disabledProps: [
              'projectId'
            ]
          }
        ])
      ]
    }
  ],
  components: {
    ProjectFtWidget,
    CrowdfundingWidget,
    ProjectContent
  }
};
