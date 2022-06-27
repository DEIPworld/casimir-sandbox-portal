<template>
  <vex-block>
    <template #title>
      <div class="text-h4">
        {{ $t('nftCollections.details.content') }}
      </div>
    </template>

    <ve-stack>
      <nft-items-list :nft-collection-id="nftCollectionId" />

      <nft-item-drafts-list :nft-collection-id="nftCollectionId" />
    </ve-stack>
  </vex-block>
</template>

<script>
  import { VexBlock } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { NftItemsList } from '../NftItemsList';
  import { NftItemDraftsList } from '../NftItemDraftsList';

  export default {
    name: 'NftItems',

    components: {
      VexBlock,
      VeStack,
      NftItemsList,
      NftItemDraftsList

    },
    props: {
      nftCollectionId: {
        type: String,
        required: true
      }
    }
  };
</script>
