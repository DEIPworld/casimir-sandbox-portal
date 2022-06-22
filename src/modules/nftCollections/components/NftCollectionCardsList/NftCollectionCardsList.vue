<template>
  <nft-collections-data-provider :issuer="teamId">
    <template #default="{ nftCollections, ready }">
      <v-data-iterator
        ref="iterator"
        :items="nftCollections"
        :loading="!ready"
      >
        <template #default="{ items }">
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-md="3"
          >
            <nft-collection-card
              v-for="nftCollection of items"
              :key="nftCollection._id"
              :nft-collection="nftCollection"
            />
          </ve-auto-grid>
        </template>
      </v-data-iterator>
    </template>
  </nft-collections-data-provider>
</template>

<script>
  import { NftCollectionsDataProvider } from '@casimir/nft-collections-module';
  import { VeAutoGrid } from '@deip/vue-elements';
  import { NftCollectionCard } from '@/modules/nftCollections/components/NftCollectionCard';

  export default {
    name: 'NftCollectionList',

    components: {
      NftCollectionsDataProvider,
      VeAutoGrid,
      NftCollectionCard
    },

    props: {
      teamId: {
        type: String,
        default: undefined
      }
    }
  };
</script>
