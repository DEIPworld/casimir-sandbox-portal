<template>
  <v-hover v-slot="{ hover }">
    <v-card
      outlined
      :raised="hover"
      class="transition-ease-in-out pa-6"
      :to="{name: 'nftCollections.details', params: { nftCollectionId: nftCollection._id }}"
    >
      <c-nft-collection-details
        :nft-collection="nftCollection"
        :schema="$layouts.getMappedData('nftCollection.listCard').value"
      />
    </v-card>
  </v-hover>
</template>

<script>
  import { NftCollectionDetails as CNftCollectionDetails } from '@casimir/nft-collections-module';

  export default {
    name: 'NftCollectionCard',

    components: {
      CNftCollectionDetails
    },

    props: {
      nftCollection: {
        type: Object,
        required: true
      }
    }
  };
</script>
