<template>
  <vex-section v-if="ready" max-width="896" class="mx-auto">
    <ve-stack :gap="32">
      <vex-section-title>
        {{ title }}
      </vex-section-title>

      <c-nft-item-draft-form
        :nft-collection="nftCollection"
        :draft="draft"
        :schema="schema"
        :mode="mode"
        @cancel="handleCancel"
        @success="handleSuccess"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import {
    NftItemDraftForm as CNftItemDraftForm
  } from '@casimir/nft-items-module';
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { formMixin } from '@deip/platform-components';
  import { filterObjectKeys } from '@deip/toolbox';
  import { VIEW_MODE } from '@deip/constants';

  import { rolesFactory } from '@/mixins';

  export default {
    name: 'NftItemDraftForm',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      CNftItemDraftForm
    },

    mixins: [rolesFactory('nftCollection.issuer')],

    props: {
      nftCollectionId: {
        type: String,
        required: true
      },

      draftId: {
        type: String,
        default: null
      },

      ...filterObjectKeys(formMixin.props, ['mode'])
    },

    data() {
      return {
        ready: false
      };
    },

    computed: {
      nftCollection() {
        if (!this.nftCollectionId) {
          return null;
        }

        return this.$store.getters['nftCollections/one'](this.nftCollectionId);
      },

      draft() {
        return this.draftId ? this.$store.getters['nftItemDrafts/one'](this.draftId) : {};
      },

      schema() {
        return this.$layouts.getMappedData('nftItem.form')?.value;
      },

      teamId() {
        return this.nftCollection?.teamId;
      },

      nftCollectionName() {
        return this.$attributes.getMappedData(
          'nftCollection.name',
          this.nftCollection?.attributes
        )?.value;
      },

      title() {
        return this.mode === VIEW_MODE.CREATE
          ? this.$t('nftCollections.nftItemDraft.form.titleCreate',
                    { name: this.nftCollectionName })
          : this.$t('nftCollections.nftItemDraft.form.titleEdit',
                    { name: this.nftCollectionName });
      }
    },

    async created() {
      await this.getNftCollection();

      if (!this.nftCollection) {
        // redirect to not found
      }

      this.checkAccess();

      if (this.draftId) {
        await this.getDraft();
      }

      this.ready = true;
    },

    methods: {
      async getNftCollection() {
        try {
          await this.$store.dispatch('nftCollections/getOne', this.nftCollectionId);
        } catch (error) {
          console.error(error);
        }
      },

      async getDraft() {
        try {
          await this.$store.dispatch('nftItemDrafts/getOne', this.draftId);
        } catch (error) {
          console.error(error);
        }
      },

      checkAccess() {
        if (!this.$$isTeamAdmin) {
          this.$router.replace({ name: this.$route.meta.redirectTo, params: this.$route.params });
        }
      },

      handleCancel() {
        this.$router.back();
      },

      handleSuccess() {
        const messageKey = this.mode === VIEW_MODE.CREATE
          ? 'successCreate'
          : 'successEdit';

        this.$notifier.showSuccess(this.$t(`nftCollections.nftItemDraft.form.${messageKey}`));
        this.$router.push({
          name: 'nftCollections.details',
          params: { nftCollectionId: this.nftCollectionId }
        });
      }
    }
  };
</script>
