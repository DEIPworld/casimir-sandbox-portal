<template>
  <vex-section>
    <ve-stack :gap="8">
      <v-sheet>
        <v-btn
          text
          x-small
          plain
          :to="projectRoute"
        >
          <v-icon left>
            mdi-arrow-left
          </v-icon>
          {{ $t('projects.contentDraft.details.backToProject') }}
        </v-btn>
      </v-sheet>

      <c-project-content-details :content-id="contentId" />

      <ve-stack flow="column" :gap="8">
        <v-btn
          color="primary"
          text
          :to="createReviewRoute"
        >
          {{ $t('projects.contentDraft.details.createReview') }}
        </v-btn>
      </ve-stack>

      <review-data-provider :content-id="contentId">
        <template #default="{ reviews, ready }">
          <reviews-list
            :reviews="reviews"
            :project-id="projectId"
            :ready="ready"
          />
        </template>
      </review-data-provider>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { ProjectContentDetails as CProjectContentDetails } from '@deip/project-content-module';
  import { ReviewsList, ReviewDataProvider } from '@casimir/reviews-module';
  import { VexSection } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  export default {
    name: 'ProjectContentDetails',

    components: {
      VexSection,
      VeStack,
      ReviewsList,
      ReviewDataProvider,
      CProjectContentDetails
    },

    props: {
      projectId: {
        type: String,
        required: true
      },
      contentId: {
        type: String,
        required: true
      }
    },

    computed: {
      projectRoute() {
        return { name: 'projects.details', params: { projectId: this.projectId } };
      },
      createReviewRoute() {
        return {
          name: 'projects.content.details.createReview',
          params: { projectId: this.projectId, contentId: this.contentId }
        };
      }
    }

  };
</script>
