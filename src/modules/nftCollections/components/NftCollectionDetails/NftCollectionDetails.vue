<template>
  <div v-if="ready">
    <v-toolbar v-if="canEdit">
      <v-spacer />
      <v-btn
        text
        color="primary"
        small
        :to="{name: 'nftCollections.edit'}"
        class="align-self-center"
      >
        <v-icon left>
          mdi-pencil-outline
        </v-icon>
        {{ $t('nftCollections.details.edit') }}
      </v-btn>
    </v-toolbar>

    <c-nft-collection-details
      v-if="schema"
      :nft-collection="nftCollection"
      :schema="schema"
      :schema-data="schemaData"
      class="flex-grow-1"
    />
  </div>
</template>

<script>
  import { NftCollectionDetails as CNftCollectionDetails } from '@casimir/nft-collections-module';

  import { rolesFactory } from '@/mixins';

  export default {
    name: 'NftCollectionDetails',

    components: {
      CNftCollectionDetails
    },

    mixins: [rolesFactory('teamId')],

    props: {
      nftCollectionId: {
        type: String,
        default: null
      }
    },

    data() {
      return {
        ready: false,
        dialog: false
      };
    },

    computed: {
      teamId() {
        return this.nftCollection.issuer;
      },

      nftCollection() {
        if (!this.nftCollectionId) {
          return null;
        }

        return this.$store.getters['nftCollections/one'](this.nftCollectionId);
      },

      schema() {
        return this.$layouts.getMappedData('nftCollection.details')?.value;
      },

      schemaData() {
        return {
          NftItems: {
            nftCollectionId: this.nftCollectionId
          }
        };
      },

      canEdit() {
        return this.$$isTeamAdmin;
      }
    },

    created() {
      this.getNftCollection();
    },

    methods: {
      async getNftCollection() {
        if (this.nftCollectionId) {
          try {
            await this.$store.dispatch('nftCollections/getOne', this.nftCollectionId);
          } catch (error) {
            console.error(error);
          }
        }
        this.ready = true;
      }
    }
  };
</script>
