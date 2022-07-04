import { blocksGenerator } from '@deip/vue-layout-schema';

import { NftItems } from '@/modules/nftCollections/components/NftItems';

export const layoutBuilderElements = {
  blocks: [
    {
      title: 'Components',
      blocks: [
        ...blocksGenerator([
          {
            component: NftItems,
            data: {
              props: {
                nftCollectionId: '{{NftItems.nftCollectionId}}'
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
    NftItems
  }
};
