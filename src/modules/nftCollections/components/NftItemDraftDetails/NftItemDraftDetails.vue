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

      <c-nft-item-draft-details
        :draft="draft"
        :schema="schema"
        with-actions
        :can-manage="$$isTeamAdmin"
        @publish-success="handlePublishSuccess"
        @remove-success="handleRemoveSuccess"
        @edit-click="handleEditClick"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { NftItemDraftDetails as CNftItemDraftDetails }
    from '@casimir/nft-items-module';
  import { VexSection } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  import { rolesFactory } from '@/mixins';

  export default {
    name: 'NftItemDraftDetails',

    components: {
      VexSection,
      VeStack,
      CNftItemDraftDetails
    },

    mixins: [rolesFactory('nftCollection.issuer')],

    props: {
      nftCollectionId: {
        type: String,
        required: true
      },
      draftId: {
        type: String,
        required: true
      }
    },

    computed: {
      nftCollection() {
        if (!this.nftCollectionId) {
          return null;
        }
        return this.$store.getters['nftCollections/one'](this.nftCollectionId);
      },

      nftCollectionRoute() {
        return {
          name: 'nftCollections.details',
          params: { nftCollectionId: this.nftCollectionId }
        };
      },
      draft() {
        return this.$store.getters['nftItemDrafts/one'](this.draftId);
      },
      schema() {
        return this.$layouts.getMappedData('nftItem.details')?.value;
      }
    },

    created() {
      this.getNftCollection();
      this.getDraft();
    },

    methods: {
      /**
       * Get draft by id
       */
      async getDraft() {
        this.loading = true;
        try {
          await this.$store.dispatch('nftItemDrafts/getOne', this.draftId);
        } catch (error) {
          console.error(error);
        }
        this.loading = false;
      },
      async getNftCollection() {
        try {
          await this.$store.dispatch('nftCollections/getOne', this.nftCollectionId);
        } catch (error) {
          console.error(error);
        }
      },

      returnToNftCollection() {
        this.$router.push(this.nftCollectionRoute);
      },

      handleBackClick() {
        this.returnToNftCollection();
      },

      handlePublishSuccess() {
        this.$notifier.showSuccess(this.$t('nftCollections.nftItemDraft.details.successPublish'));
        this.$store.dispatch('nftItems/getListByNftCollectionId', this.nftCollectionId);
        this.returnToNftCollection();
      },

      handleRemoveSuccess() {
        this.$notifier.showSuccess(this.$t('nftCollections.nftItemDraft.details.successRemove'));
        this.returnToNftCollection();
      },

      handleEditClick() {
        this.$router.push({
          name: 'nftCollections.nftItem.draft.edit',
          params: { nftCollectionId: this.nftCollectionId, draftId: this.draftId }
        });
      }
    }
  };
</script>
