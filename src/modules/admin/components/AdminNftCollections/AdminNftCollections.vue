<template>
  <vex-section>
    <ve-stack :gap="32">
      <vex-section-title
        :title="$t('admin.nftCollections.title')"
      />

      <nft-collections-data-provider>
        <template #default="{ nftCollections }">
          <v-data-table
            :items="nftCollections"
            :headers="headers"

            :hide-default-footer="nftCollections.length < itemsPerPage"
            :footer-props="{itemsPerPageOptions: [5, 10, 20, 50, -1]}"
            :items-per-page="itemsPerPage"
          >
            <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template #item.createdAt="{ item }">
              {{ formatCreatedDate(item.createdAt) }}
            </template>
          </v-data-table>
        </template>
      </nft-collections-data-provider>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { NftCollectionsDataProvider } from '@casimir/nft-collections-module';
  import { VexSection, VexSectionTitle } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  import { dateMixin } from '@deip/platform-components';

  export default {
    name: 'AdminNftCollections',

    components: {
      NftCollectionsDataProvider,
      VexSection,
      VexSectionTitle,
      VeStack
    },

    mixins: [dateMixin],

    data() {
      return {
        headers: [
          {
            text: this.$t('admin.nftCollections.nftCollection.title'),
            value: 'title'
          },
          {
            text: this.$t('admin.nftCollections.nftCollection.created'),
            value: 'createdAt'
          }
        ],
        itemsPerPage: 50
      };
    },

    methods: {
      formatCreatedDate(date) {
        return this.$$formatDate(this.$$parseISO(date));
      }
    }
  };
</script>
