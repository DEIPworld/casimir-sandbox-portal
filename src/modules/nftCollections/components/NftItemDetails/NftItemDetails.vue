<template>
  <vex-section>
    <ve-stack :gap="8">
      <v-sheet>
        <v-btn
          text
          x-small
          plain
          :to="nftCollectionRoute"
        >
          <v-icon left>
            mdi-arrow-left
          </v-icon>
          {{ $t('nftCollections.nftItemDraft.details.backToNftCollection') }}
        </v-btn>
      </v-sheet>

      <c-nft-item-details
        :nft-item-id="nftItemId"
        :nft-collection-id="nftCollectionId"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { NftItemDetails as CNftItemDetails } from '@casimir/nft-items-module';
  import { VexSection } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  export default {
    name: 'NftItemDetails',

    components: {
      VexSection,
      VeStack,
      CNftItemDetails
    },

    props: {
      nftCollectionId: {
        type: String,
        required: true
      },
      nftItemId: {
        type: String,
        required: true
      }
    },

    computed: {
      nftCollectionRoute() {
        return {
          name: 'nftCollections.details',
          params: { nftCollectionId: this.nftCollectionId }
        };
      }
    }

  };
</script>
