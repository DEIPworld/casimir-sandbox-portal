<template>
  <div v-if="ready">
    <v-toolbar v-if="canEdit">
      <v-spacer />
      <v-btn
        text
        color="primary"
        small
        :to="{name: 'projects.edit'}"
        class="align-self-center"
      >
        <v-icon left>
          mdi-pencil-outline
        </v-icon>
        {{ $t('projects.details.edit') }}
      </v-btn>
    </v-toolbar>

    <c-project-details
      v-if="schema"
      :project="project"
      :schema="schema"
      :schema-data="schemaData"
      class="flex-grow-1"
    />

    <div class="ma-6 ma-md-12">
      <v-btn
        color="primary"
        small
        @click.stop="handleDialog()"
      >
        {{ $t('projects.reviews.create') }}
      </v-btn>
    </div>

    <review-create-modal
      v-model="dialog"
      :project-id="project._id"
      @select="handleProjectContentSelect"
    />

    <div class="ma-6 ma-md-12">
      <template v-if="!disableReviewRequest && projectId!==null">
        <review-request
          :project-id="projectId"
          @success="handleRequestSuccess"
          @error="handleRequestError"
        />
      </template>
    </div>
  </div>
</template>

<script>
  import { ProjectDetails as CProjectDetails } from '@deip/projects-module';
  import { ReviewCreateModal, ReviewRequest } from '@casimir/reviews-module';

  import { rolesFactory } from '@/mixins';

  export default {
    name: 'ProjectDetails',

    components: {
      CProjectDetails,
      ReviewRequest,
      ReviewCreateModal
    },

    mixins: [rolesFactory('teamId')],

    props: {
      projectId: {
        type: String,
        default: null
      },
      disableReviewRequest: {
        type: Boolean,
        default: false
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
        return this.project.teamId;
      },

      project() {
        return this.projectId ? this.$store.getters['projects/one'](this.projectId) : {};
      },

      schema() {
        return this.$layouts.getMappedData('project.details')?.value;
      },

      schemaData() {
        return {
          crowdfundingWidget: {
            projectId: this.projectId,
            canUserStartCrowdfunding: this.canUserStartCrowdfunding,
            startCrowdfundingLink: { name: 'projects.crowdfunding.create' },
            investLink: { name: 'projects.crowdfunding.invest' }
          },
          ProjectFtWidget: {
            nfts: this.project.nfts, // rename to fts
            canUserIssueTokens: this.$$isTeamAdmin
          },
          projectContent: {
            projectId: this.projectId
          }
        };
      },

      canUserStartCrowdfunding() {
        // rename to fts
        return this.$$isTeamAdmin && this.project.nfts.length > 0;
      },

      canEdit() {
        return this.$$isTeamAdmin;
      }
    },

    created() {
      this.getProject();
    },

    methods: {
      handleDialog() {
        this.dialog = true;
      },
      handleProjectContentSelect(value) {
        this.$router.push({
          name: 'projects.content.details.createReview',
          params: { projectId: this.projectId, contentId: value }
        });
      },
      async getProject() {
        if (this.projectId) {
          try {
            await this.$store.dispatch('projects/getOne', this.projectId);
          } catch (error) {
            console.error(error);
          }
        }
        this.ready = true;
      },
      handleRequestSuccess() {
        this.$notifier.showSuccess(this.$t('projects.reviews.reviewRequestSuccess'));
      },

      handleRequestError(err) {
        this.$notifier.showError(
          err.response && err.response.data
            ? err.response.data
            : this.$t('projects.reviews.reviewRequestError')
        );
      }

    }
  };
</script>
