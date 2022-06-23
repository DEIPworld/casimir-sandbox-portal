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
          {{ $t('nftCollections.contentDraft.details.backToNftCollection') }}
        </v-btn>
      </v-sheet>

      <c-project-content-draft-details
        :content-id="draftId"
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
  import { ProjectContentDraftDetails as CProjectContentDraftDetails }
    from '@deip/project-content-module';
  import { VexSection } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  import { rolesFactory } from '@/mixins';

  export default {
    name: 'ProjectContentDraftDetails',

    components: {
      VexSection,
      VeStack,
      CProjectContentDraftDetails
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
      }

    },

    created() {
      this.getNftCollection();
    },

    methods: {
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
        this.$notifier.showSuccess(this.$t('nftCollections.contentDraft.details.successPublish'));
        this.$store.dispatch('projectContent/getListByNftCollectionId', this.nftCollectionId);
        this.returnToNftCollection();
      },

      handleRemoveSuccess() {
        this.$notifier.showSuccess(this.$t('nftCollections.contentDraft.details.successRemove'));
        this.returnToNftCollection();
      },

      handleEditClick() {
        this.$router.push({
          name: 'nftCollections.content.draft.edit',
          params: { nftCollectionId: this.nftCollectionId, draftId: this.draftId }
        });
      }
    }
  };
</script>
