<template>
  <div>
    <v-container>
      <v-carousel show-arrows="hover" cycle>
        <v-carousel-item v-for="item in img" :key="item.index" :src="item.src" cover>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script>
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
export default {
  components: { VSkeletonLoader },
  data() {
    return {
      img:[
        {src:'https://png.pngtree.com/background/20210711/original/pngtree-taobao-vector-cartoon-creative-business-computer-shading-technology-mobile-phone-poster-picture-image_1097765.jpg'},
        {src:'https://png.pngtree.com/illustrations/20190321/ourlarge/pngtree-technology-cartoon-robot-future-technology-png-image_35049.jpg'},
        {src:'https://png.pngtree.com/illustrations/20190321/ourlarge/pngtree-blue-financial-technology-cartoon-png-image_31377.jpg'}
      ],
      onboarding: 1,
    }
  },
}
</script>

<style></style>
