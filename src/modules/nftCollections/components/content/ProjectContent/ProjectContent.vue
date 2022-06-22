<template>
  <vex-block>
    <template #title>
      <div class="text-h4">
        {{ $t('nftCollections.details.content') }}
      </div>
    </template>

    <ve-stack>
      <project-content-list :nft-collection-id="nftCollectionId" />

      <project-content-drafts-list :nft-collection-id="nftCollectionId" />
    </ve-stack>
  </vex-block>
</template>

<script>
  import { VexBlock } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { ProjectContentList } from '../ProjectContentList';
  import { ProjectContentDraftsList } from '../ProjectContentDraftsList';

  export default {
    name: 'ProjectContent',

    components: {
      VexBlock,
      VeStack,
      ProjectContentList,
      ProjectContentDraftsList

    },
    props: {
      nftCollectionId: {
        type: String,
        required: true
      }
    }
  };
</script>
