<template>
  <vex-section>
    <v-sheet>
      <v-btn
        text
        x-small
        plain
        :to="detailsRoute"
      >
        <v-icon left>
          mdi-arrow-left
        </v-icon>
        {{ $t('projects.contentDraft.review.backToDetails') }}
      </v-btn>
    </v-sheet>
    <ve-stack :gap="8">
      <review-create
        :project="project"
        :content="content"
        @success="handleSuccess"
        @error="handleError"
      />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { ReviewCreate } from '@casimir/reviews-module';
  import { VexSection } from '@deip/vuetify-extended';
  import { VeStack } from '@deip/vue-elements';

  export default {
    name: 'ProjectContentReviewCreate',

    components: {
      VexSection,
      VeStack,
      ReviewCreate
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
      content() {
        return this.$store.getters['projectContent/one'](this.contentId);
      },
      project() {
        return this.projectId ? this.$store.getters['projects/one'](this.projectId) : {};
      },
      detailsRoute() {
        return {
          name: 'projects.content.details',
          params: { projectId: this.projectId, contentId: this.contentId }
        };
      }
    },

    created() {
      this.getProject();
      this.getContent();
    },

    methods: {
      async getContent() {
        if (this.contentId) {
          try {
            await this.$store.dispatch('projectContent/getOne', this.contentId);
          } catch (error) {
            console.error(error);
          }
        }
      },

      async getProject() {
        if (this.projectId) {
          try {
            await this.$store.dispatch('projects/getOne', this.projectId);
          } catch (error) {
            console.error(error);
          }
        }
      },

      handleSuccess() {
        this.$notifier.showSuccess(this.$t('projects.contentDraft.review.successReviewCreate'));
      },

      handleError() {
        this.$notifier
          .showError(this.$t('projects.contentDraft.review.errorReviewCreate'));
      }
    }
  };
</script>
