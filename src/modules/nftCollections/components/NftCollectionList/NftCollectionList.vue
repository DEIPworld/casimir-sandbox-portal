<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('nftCollections.list.title')"
      />

      <nft-collection-cards-list />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VeStack } from '@deip/vue-elements';
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { NftCollectionCardsList }
    from '@/modules/nftCollections/components/NftCollectionCardsList';

  export default {
    name: 'NftCollectionList',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      NftCollectionCardsList
    }
  };
</script>
