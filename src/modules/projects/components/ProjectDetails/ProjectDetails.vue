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

      <v-btn
        v-if="!nft"
        text
        color="secondary"
        small
        class="align-self-center"
        @click="handleCreateNftClick"
      >
        Create NFT
      </v-btn>

      <v-btn
        v-else
        text
        color="secondary"
        small
        class="align-self-center"
        @click="handleIssueNftClick"
      >
        Issue NFT
      </v-btn>
    </v-toolbar>

    <c-project-details
      v-if="schema"
      :project="project"
      :schema="schema"
      :schema-data="schemaData"
      class="flex-grow-1"
    />
  </div>
</template>

<script>
  import { ProjectDetails as CProjectDetails } from '@deip/projects-module';
  import { NonFungibleTokenService } from '@casimir/token-service';
  import { rolesFactory } from '@/mixins';

  const nftService = NonFungibleTokenService.getInstance();

  export default {
    name: 'ProjectDetails',

    components: {
      CProjectDetails
    },

    mixins: [rolesFactory('teamId')],

    props: {
      projectId: {
        type: String,
        default: null
      }
    },

    data() {
      return {
        ready: false,
        nft: null
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
          projectNftWidget: {
            nfts: this.project.nfts,
            canUserIssueTokens: this.$$isTeamAdmin
          },
          projectContent: {
            projectId: this.projectId
          }
        };
      },

      canUserStartCrowdfunding() {
        return this.$$isTeamAdmin && this.project.nfts.length > 0;
      },

      canEdit() {
        return this.$$isTeamAdmin;
      }
    },

    created() {
      this.getProject();
      this.getNft();
    },

    methods: {
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

      async getNft() {
        try {
          const projectNfts = await nftService.getClasses({
            metadata:
              { projectId: this.projectId }
          });
          console.log(projectNfts);
          [this.nft] = projectNfts.data.items;
        } catch (error) {
          console.error(error);
        }
      },

      async handleCreateNftClick() {
        try {
          const payload = {
            initiator: this.$currentUser,
            data: {
              issuer: this.$currentUser._id,
              name: this.$attributes.getMappedData(
                'project.name',
                this.project?.attributes
              )?.value,
              metadata: {
                projectId: this.projectId
              }
            }
          };
          const res = await nftService.create(payload);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      },

      async handleIssueNftClick() {
        try {
          const payload = {
            initiator: this.$currentUser,
            data: {
              issuer: this.$currentUser._id,
              classId: this.nft.classId,
              instanceId: 1,
              recipient: this.$currentUser._id,
              metadata: {
                projectId: this.projectId
              }
            }
          };
          const res = await nftService.issue(payload);
          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
</script>
