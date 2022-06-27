<template>
  <c-nft-items-list
    :nft-collection-id="nftCollectionId"
    @click-row="handleClickRow"
  />
</template>

<script>
  import { NftItemsList as CNftItemsList } from '@casimir/nft-items-module';

  export default {
    name: 'NftItemsList',

    components: {
      CNftItemsList
    },

    props: {
      nftCollectionId: {
        type: String,
        required: true
      }
    },

    methods: {
      handleClickRow(content) {
        this.$router.push({
          name: 'nftCollections.content.details',
          params: { nftCollectionId: this.nftCollectionId, contentId: content._id }
        });
      }
    }
  };
</script>
