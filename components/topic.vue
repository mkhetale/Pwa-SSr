<template>
  <div class="scroll_header_wrapper">
    <div class="header_margin">
      <div class="horizontal_scroll_header">
        <ul class="scroll_header_list" v-if="topicsList.length">
          <li class="scroll_list_topics active">
            <nuxt-link :to="`/${topicType}/${$route.params.gender}`">All</nuxt-link>
          </li>
          <li class="scroll_list_topics" v-for="(topic, index) in topicsList" :key="index">
            <nuxt-link :to="topic.href">{{topic.topic_name}}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TopicList',
  props: {
    topicsList: {
      type: Array,
      default () {
        return []
      }
    },
    topicType: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll_header_wrapper{
  margin-top: 55px;
}
</style>
