<template>
  <v-card outlined>
    <v-card-title>
      {{ $t('projects.ftWidget.title') }}
    </v-card-title>
    <v-card-text>
      <template v-if="!nfts.length">
        <template v-if="canUserIssueTokens">
          <div class="mb-2">
            {{ $t('projects.ftWidget.noTokensMessageForTeam') }}
          </div>
          <v-btn
            color="primary"
            small
            outlined
            :to="{ name: 'projects.nft.create' }"
          >
            {{ $t('projects.ftWidget.issue') }}
          </v-btn>
        </template>

        <template v-else>
          <div class="mb-2">
            {{ $t('projects.ftWidget.noTokensMessage') }}
          </div>
        </template>
      </template>

      <template v-else>
        <v-list dense>
          <v-list-item v-for="nft in nfts" :key="nft.symbol" dense>
            {{ nft.amount }} {{ nft.symbol }}
          </v-list-item>
        </v-list>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
  import { defineComponent } from '@deip/platform-util';

  export default defineComponent({
    name: 'ProjectFtWidget',
    props: {
      // replace on fts
      nfts: {
        type: Array,
        default: () => []
      },

      canUserIssueTokens: {
        type: Boolean,
        default: false
      }
    }
  });
</script>
