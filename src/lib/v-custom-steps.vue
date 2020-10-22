<template>
  <div class="idss_step_page">
    <ul
      class="step_ul"
      :class="direction === 'horizontal'?'horizontal':'vertical'"
      v-if="Array.isArray(data) && data.length > 0">
      <li
        class="step_li"
        :class="{'alignCenter': alignCenter }"
        v-for="(item, index) in data"
        :key="index+item"
        :style="lastNode(index)">
        <!-- key部分的插槽 -->
        <span
          class="li_val"
          v-show='!!item.key'
          :style="textStyleResult"
          @click="clickItem($event,item,index)">
          <slot :name="'key'+index">
            <span>
              {{item.key||''}}
            </span>
          </slot>
        </span>
        <div
          class="step_li_content"
          :style="alignCenter?{'left':`calc(50% - ${semicircleWidth / 2}px)`}:{}">
          <!-- 圆和线 -->
          <span
            class="line_cir_box"
            :style="direction === 'horizontal'?{width:`${semicircleWidth}px`}:{height:`${semicircleWidth}px`}">
            <span
              class="li_line"
              :style="{'opacity':item.key ? 1 : 0 , ...config.nodeLineStyle}"></span>
            <span
              class="li_cir_box"
              :style="{'width':`${semicircleWidth}px`,'height':`${semicircleWidth}px`}">
              <span
                class="li_semicircle"
                :style="{'border': `${mediumLineWidth}px solid ${config.mediumLineStyle.color}`,'height':`calc(100% - ${2*mediumLineWidth}px)`,'width':`calc(50% - ${mediumLineWidth}px)`}">
              </span>
              <span
                class="li_circular paragraph"
                :style="config.circleStyle">
                <slot :name="'step'+index">
                  <span>
                    {{index> 9 ? index: '0'+ parseInt(index+1)}}
                  </span>
                </slot>
              </span>
            </span>
            <span
              class="li_line"
              :style="{'opacity':item.name||item.value ? 1 : 0 ,...config.nodeLineStyle}"></span>
          </span>
          <!-- 圆和线 end -->
          <!-- 每个之间的联系 -->
          <div
            class="li_link_line"
            :style="linkLineStyle"></div>
        </div>
        <!-- value部分的插槽 -->
        <span
          class="li_text"
          v-show='!!item.name||!!item.value'
          :style="textStyleResult"
          @click="clickItem($event,item,index)">
          <slot :name="'value'+index">
            <span>{{item.name||''}}</span> <span>{{item.value||''}}</span>
          </slot>
        </span>
      </li>
    </ul>
    <div v-show="!Array.isArray(data) || !data.length">
      <div ref="empty"></div>
    </div>
  </div>
</template>
<script>
import { merge } from '../utils/base.js'
import { colorToRgba } from '../utils/color'
import { generate } from '@ant-design/colors'
let defaultStyle = {
  // 中线样式
  mediumLineStyle: {
    color: '#46A0D4',
    width: '4px'
  },
  // 圆左右两边的线样式
  nodeLineStyle: {
    color: '#46A0D4'
  },
  // 文字的样式
  textStyle: {
    fontSize: '16px',
    color: ' #259ee3'
  },
  // 圆的样式
  circleStyle: {
    width: '70px',
    height: '70px',
    lineHeight: '70px',
    backgroundColor: '#18bcea',
    boxShadow: '0px 0px 15px rgb(15, 55, 173) inset',
    color: 'rgba(0, 247, 247, 0.921568)'
  }
}
/**
 * @name 步骤条
 * @event {Function} clickItem 点击事件
 * @slot key 节点key的内容 通过 slot='"key"+index'设置每一个节点key的内容
 * @slot value 节点value的内容 通过 slot='"vaule"+index'设置每一个节点value的内容
 * @slot step 节点value的内容 通过 slot='"step"+index'设置每一个节点的内容
 */
export default {
  name: 'v-custom-steps',
  props: {
    data: {
    /**
     * @propCnName 步骤数据
     * @propIsApi
     */
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    configStyle: {// @propDesc  样式配置项
      type: Object,
      default: function () {
        return {}
      }
    },
    direction: {// @propDesc布局方向  水平的：'horizontal'，垂直：'vertical'
      type: String,
      default: 'vertical'
    },
    space: [String], // @propDesc每个 step 的间距，不填写将自适应间距。支持百分比
    theme: { // @propDesc样式配置项 支持一键换肤  configStyle和theme都设置的时候优先theme
      type: String,
      default: ''
    },
    alignCenter: { // @propDesc 进行居中对齐 垂直方向的时候生效
      type: Boolean,
      default: false
    }
  },

  computed: {
    themeConfig () { // 设置theme样式配置
      if (!this.theme) return {}
      return {
        mediumLineStyle: {
          color: this.colorList[8]
        },
        nodeLineStyle: {
          color: this.colorList[6]
        },
        textStyle: {
          color: this.colorList[3]
        },
        circleStyle: {
          backgroundColor: colorToRgba(this.colorList[9], 0.4),
          boxShadow: `0px 0px 15px ${this.colorList[6]} inset`,
          color: this.colorList[3]
        }
      }
    },
    config () {  // 样式配置项合并
      return merge(defaultStyle, this.themeConfig, this.configStyle)
    },
    mediumLineWidth () { // 中线的宽度
      let lWidth = this.config.mediumLineStyle.width
      return parseInt(lWidth)
    },
    semicircleWidth () { // 圆的宽度=圆的宽度+22+中线的宽度
      let cWidth = parseInt(this.config.circleStyle.width)
      return cWidth + 22 + this.mediumLineWidth
    }
  },
  watch: {
    theme: {
      immediate: true,
      handler () {
        this.colorList = generate(this.theme)
      }
    }
  },
  data () {
    return {
      colorList: [], // 生成的10种颜色
      linkLineStyle: {}, // 中连线的样式
      textStyleResult: {}// 两边文字样式
    }
  },
  methods: {
    /**
    * 垂直情况下文字设置绝对定位top：圆的1/2
    */
    textFormat () {
      this.textStyleResult = Object.assign(this.direction === 'horizontal' ? {} : { 'top': `${(this.semicircleWidth / 2)}px` }, this.config.textStyle)
    },
    /**
    * 冒出事件
    * @param {object} e 事件对象
    * @param {object} item 当前点击的数据项
    * @param {number} index 当前点击的index
    */
    clickItem (e, item, index) {
      this.$emit('clickItem', e, item, index)
    },
    /**
     * 中线的连接线的样式
     */
    linkLine () {
      let curBoxAttr = this.direction === 'horizontal' ? { 'height': `${this.mediumLineWidth}px`, 'marginLeft'
      : `${-this.mediumLineWidth}px`, 'marginRight': `${-this.mediumLineWidth}px` }
      : { 'width': `${this.mediumLineWidth}px`, 'marginTop': `${-this.mediumLineWidth}px`, 'marginBottom': `${-this.mediumLineWidth}px` }
      this.linkLineStyle = Object.assign({}, curBoxAttr, { 'background-color': this.config.mediumLineStyle.color })
    },
    /**
     * 每个里最后一个元素节点样式的处理
     * @param {number} index 当前点击的index
     */
    lastNode (index) {
      if (this.data && this.data.length === 0) return false
      let linkLineX = {}; let linkLineY = {}
      if (this.space) { // 如果设置的步长按照设置的长度给每个step设置宽高
        let isPercentage = this.space && /^((\d+\.?\d*)|(\d*\.\d+))%$/.test(this.space)// 检查space是不是百分比数字
        linkLineX = isPercentage ? { 'flex-basis': `${this.space}` } : { 'width': `${this.space}px` }// 根据space设置水平连线的长度
        linkLineY = isPercentage ? { 'flex-basis': `${this.space}` } : { 'height': `${this.space}px` } // 根据space设置垂直连线的长度
      }
      if (index === this.data.length - 1) { // 最后一条数据的的最大宽高不能超出( 100%/data.length)
        linkLineX = Object.assign(linkLineX, { 'max-width': `calc(100% / ${this.data.length})` })
        linkLineY = Object.assign(linkLineY, { 'max-height': `calc(100% / ${this.data.length})` })
      }
      return this.direction === 'horizontal' ? linkLineX : linkLineY
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.linkLine() // 中线的连接线的样式
      this.textFormat() // 两边文字样式
    })
  }
}
</script>
<style scoped lang="postcss">
.idss_step_page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .step_ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    /* 设置字体 */
    .paragraph {
      font-family: "DS-DIGI";
      font-size: 28px;
    }

    .step_li {
      display: flex;
      flex-basis: 50%;
      align-self: normal;
      span {
        display: inline-block;
      }

      .li_circular {
        text-align: center;
        border-radius: 50%;
        background-color: aquamarine;
        box-shadow: 0px 0px 15px #2359aa inset;
      }
      .li_link_line {
        flex-basis: 100%;
        display: block;
      }
      .li_cir_box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .step_li:last-of-type {
      flex-basis: auto;
      flex-grow: 0;
      flex-shrink: 0;
    }
    .step_li:last-of-type .li_link_line {
      display: none;
    }
    .step_li_content {
      display: flex;
      align-items: center;
    }
    .li_val,
    .li_text {
      flex: 1;
      overflow: hidden;
    }
    .li_val,
    .li_text,
    .line_cir_box {
      display: flex !important;
    }
    .line_cir_box {
      align-items: center;
    }
    .li_semicircle {
      position: absolute;
      /* width: 50%;
      height: 100%; */
    }
    /* 奇数 */
    .step_li:nth-child(odd) .step_li_content {
      >>> .li_semicircle {
        border-radius: 100% 0 0 100%/50%;
        border-right: none !important;
        left: 0;
      }
    }
    /* 偶数 */
    .step_li:nth-child(even) .step_li_content {
      >>> .li_semicircle {
        border-radius: 0 100% 100% 0/50%;
        border-left: none !important;
        right: 0;
      }
    }
  }
  /* 水平 */
  .horizontal {
    flex-direction: row;
    .step_li {
      flex-direction: column;
    }
    .step_li .step_li_content {
      flex-direction: row;
      .li_circular {
        transform: rotate(90deg);
      }
    }
    /* 设置文字居中 */
    .alignCenter {
      .step_li_content {
        position: relative;
      }
      .li_val,
      .li_text {
        text-align: center;
        justify-content: center;
      }
    }
    /* 奇数 */
    .step_li:nth-child(odd) {
      .li_val {
        align-items: flex-end;
        padding-bottom: 5px;
      }
      .li_text {
        padding-top: 5px;
      }
      .step_li_content {
        .line_cir_box {
          flex-direction: column;
        }
      }
    }
    /* 偶数 */
    .step_li:nth-child(even) {
      flex-direction: column-reverse;
      .li_text {
        align-items: flex-end;
        padding-bottom: 5px;
      }
      .li_val {
        padding-top: 5px;
      }
      .step_li_content {
        .line_cir_box {
          flex-direction: column-reverse;
        }
      }
    }
    /* 两边连线 */
    .li_line {
      height: 35px;
      border-right: 1px dashed;
    }
    .line_cir_box {
      flex-direction: column;
    }
    .li_cir_box {
      transform: rotate(-90deg);
    }
  }
  /* 垂直 */
  .vertical {
    flex-direction: column;
    .step_li {
      flex-direction: row;
    }
    .step_li .step_li_content {
      flex-direction: column;
    }
    .li_val,
    .li_text {
       position: relative;
      transform: translateY(-50%);
      align-items: center;
    }
    /* 奇数 */
    .step_li:nth-child(odd) {
      .li_text {
        padding-left: 5px;
      }
      .li_val {
        justify-content: flex-end;
        padding-right: 5px;
      }
      .step_li_content {
        .line_cir_box {
          flex-direction: row;
        }
      }
    }

    /* 偶数 */
    .step_li:nth-child(even) {
      flex-direction: row-reverse;
      .li_val {
        padding-left: 5px;
      }
      .li_text {
        justify-content: flex-end;
        padding-right: 5px;
      }
      .step_li_content {
        .line_cir_box {
          flex-direction: row-reverse;
        }
      }
    }
    /* 两边连线 */
    .li_line {
      width: 35px;
      border-bottom: 1px dashed;
    }
  }
}


</style>
