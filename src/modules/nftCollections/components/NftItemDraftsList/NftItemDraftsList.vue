<template>
  <vex-block :title="$t('nftCollections.details.drafts')">
    <template #title-append>
      <v-btn
        v-if="canCreate"
        color="primary"
        small
        text
        :to="{ name: 'nftCollections.nftItem.draft.create',
               params: { nftCollectionId: nftCollectionId } }"
      >
        {{ $t('nftCollections.details.create') }}
      </v-btn>
    </template>
    <c-nft-item-drafts-list
      :nft-collection-id="nftCollectionId"
      @click-row="handleClickRow"
      @publish-success="handlePublishSuccess"
      @remove-success="handleRemoveSuccess"
    />
  </vex-block>
</template>

<script>
  import { VexBlock } from '@deip/vuetify-extended';
  import {
    NftItemDraftsList
      as CNftItemDraftsList
  } from '@casimir/nft-items-module';
  import { rolesFactory } from '@/mixins';

  export default {
    name: 'NftItemDraftsList',

    components: {
      VexBlock,
      CNftItemDraftsList
    },

    mixins: [rolesFactory('nftCollection.issuer')],

    props: {
      nftCollectionId: {
        type: String,
        required: true
      }
    },

    computed: {
      teamId() {
        return this.nftCollection.teamId;
      },

      nftCollection() {
        if (!this.nftCollectionId) {
          return null;
        }

        return this.$store.getters['nftCollections/one'](this.nftCollectionId);
      },

      canCreate() {
        return this.$$isTeamAdmin;
      }
    },

    methods: {
      handleClickRow(draft) {
        this.$router.push({
          name: 'nftCollections.nftItem.draft.details',
          params: { nftCollectionId: this.nftCollectionId, draftId: draft._id }
        });
      },

      handlePublishSuccess() {
        this.$notifier.showSuccess(this.$t('nftCollections.nftItemDraft.details.successPublish'));
        this.$store.dispatch('nftItems/getListByNftCollectionId', this.nftCollectionId);
      },

      handleRemoveSuccess() {
        this.$notifier.showSuccess(this.$t('nftCollections.nftItemDraft.details.successRemove'));
      }
    }
  };
</script>
