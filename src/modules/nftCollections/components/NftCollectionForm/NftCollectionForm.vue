<template>
  <vex-section v-if="ready" max-width="896" class="mx-auto">
    <ve-stack :gap="32">
      <vex-section-title>
        {{ title }}
      </vex-section-title>

      <c-nft-collection-form
        :team-id="teamId"
        :nft-collection="nftCollectionMetadata"
        :schema="schema"
        :mode="mode"
        @success="handleSuccess"
        @error="handleError"
        @cancel="handleCancel"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VIEW_MODE } from '@deip/constants';
  import { formMixin } from '@deip/platform-components';
  import { filterObjectKeys } from '@deip/toolbox';
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';
  import { NftCollectionForm as CNftCollectionForm } from '@casimir/nft-collections-module';

  import { rolesFactory } from '@/mixins';

  export default {
    name: 'NftCollectionForm',
    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      CNftCollectionForm
    },

    mixins: [rolesFactory('teamIdComputed')],

    props: {
      teamId: {
        type: String,
        default: null
      },
      nftCollectionId: {
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
      teamIdComputed() {
        return this.nftCollection?.issuer || this.teamId;
      },
      nftCollection() {
        if (!this.nftCollectionId) {
          return null;
        }

        return this.$store.getters['nftCollections/one'](this.nftCollectionId);
      },

      nftCollectionMetadata() {
        if (!this.nftCollection) return null;

        return this.nftCollection.metadata;
      },

      schema() {
        return this.$layouts.getMappedData('nftCollection.form')?.value;
      },

      title() {
        return this.mode === VIEW_MODE.CREATE
          ? this.$t('nftCollections.form.createTitle')
          : this.$t('nftCollections.form.editTitle');
      }
    },

    async created() {
      if (this.nftCollectionId) {
        try {
          await this.getNftCollection();
          this.checkAccess();
          this.ready = true;
        } catch (error) {
          this.$notifier.showError(this.$t('nftCollections.form.error'));
        }
      } else {
        this.checkAccess();
        this.ready = true;
      }
    },

    methods: {
      async getNftCollection() {
        return this.$store.dispatch('nftCollections/getOne', this.nftCollectionId);
      },

      checkAccess() {
        if (!this.$$isTeamAdmin) {
          this.$router.replace({ name: this.$route.meta.redirectTo, params: this.$route.params });
        }
      },

      handleSuccess(nftCollectionId) {
        const messageKey = this.mode === VIEW_MODE.CREATE
          ? 'successCreate'
          : 'successEdit';

        this.$notifier.showSuccess(this.$t(`nftCollections.form.${messageKey}`));
        this.$router.push({ name: 'nftCollections.details', params: { nftCollectionId } });
      },

      handleError(error) {
        this.$notifier.showError(error);
      },

      handleCancel() {
        this.$router.back();
      }
    }
  };
</script>
