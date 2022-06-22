<template>
  <c-project-content-list
    :project-id="nftCollectionId"
    @click-row="handleClickRow"
  />
</template>

<script>
  import { ProjectContentList as CProjectContentList } from '@deip/project-content-module';

  export default {
    name: 'ProjectContentList',

    components: {
      CProjectContentList
    },

    props: {
      nftCollectionId: {
        type: String,
        required: true
      }
    },

    methods: {
      handleClickRow(content) {
        this.$router.push({
          name: 'nftCollections.content.details',
          params: { nftCollectionId: this.nftCollectionId, contentId: content._id }
        });
      }
    }
  };
</script>
