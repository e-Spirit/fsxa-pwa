<template>
  <FSXARenderContentElement :element="section"></FSXARenderContentElement>
</template>

<script lang="ts">
import Vue from 'vue'
import { FSXARenderContentElement } from 'fsxa-pattern-library'
import { PageBodyContent } from 'fsxa-api/dist/types'

export default Vue.extend({
  name: 'PhilippTest',
  components: {
    FSXARenderContentElement
  },
  data() {
    return {
      section: {
        type: 'Section',
        sectionType: 'dealer_map'
      } as PageBodyContent
    }
  }
})
</script>
