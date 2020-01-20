<template lang="html">
  <transition name="fade">
    <div class="imageBg" v-if="dialogVisible" @click="close">
      <div class="imageBox" @click.stop>
        <img :src="currentImage" :class="{'imageClass1': selectIndex, 'imageClass2': !selectIndex}">
        <div class="btnLeft" @click.stop="prev"><span class="el-icon-caret-left"></span></div>
        <div class="btnRight" @click.stop="next"><span class="el-icon-caret-right"></span></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'big-gmage-dialog',
  props: ['dialogVisible', 'current', 'imgs'],
  components: {},
  data() {
    return {
      selectIndex: 0,
      currentImage: null,
    }
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.changeImageSize();
        this.currentImage = this.current;
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    changeImageSize() {
      // 调整图片的显示尺寸，保持图片能够完全显示
      const image = new Image();
      image.src = this.currentImage;
      image.onload = function(e) {
        if (e && e.path && e.path[0] && e.path[0].width > e.path[0].height) {
          this.selectIndex = 0;
        } else {
          this.selectIndex = 1;
        }
      }
    },
    prev() {
      // 上一张
      const index = this.imgs.indexOf(this.currentImage);
      if (index > 0) {
        this.currentImage = this.imgs[index - 1];
      } else {
        this.currentImage = this.imgs[this.imgs.length - 1];
      }
      this.changeImageSize();
    },
    next() {
      // 上一张
      const index = this.imgs.indexOf(this.currentImage);
      if (index < this.imgs.length - 1) {
        this.currentImage = this.imgs[index + 1];
      } else {
        this.currentImage = this.imgs[0];
      }
      this.changeImageSize();
    }
  }
}
</script>

<style lang="css" scoped>
.imageBg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
}

.imageBox {
  position: relative;
  width: 650px;
  height: 450px;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  line-height: 400px;
  margin: auto;
  margin-top: 80px;
  overflow: hidden;
}

.btnLeft {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  font-size: 50px;
  z-index: 10;
  line-height: 80px;
  text-align: center;
  background: rgb(255, 255, 255);
  cursor: pointer;
  opacity: 0.2;
  transition: all 0.5s;
}

.btnRight {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translate(0, -50%);
  font-size: 50px;
  z-index: 10;
  line-height: 80px;
  text-align: center;
  background: rgb(255, 255, 255);
  opacity: 0.2;
  transition: all 0.5s;
  cursor: pointer;
}

.btnLeft:hover, .btnRight:hover {
  opacity: 0.6;
  transition: all 0.5s;
}

.imageClass1 {
  width: 100%;
  height: auto
}

.imageClass2 {
  width: auto;
  height: 100%
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
