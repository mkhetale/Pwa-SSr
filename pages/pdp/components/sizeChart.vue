<template>
  <transition name="modalW">
    <div class="size_chart">
      <div class="chart_header">
        <button class="closeBtn" @click="$emit('closeChart')">
          <span>×</span>
        </button>
        <span class="chart_title">
          SIZE CHART
        </span>
      </div>
      <div class="chart_body">
        <div class="chart_tableWrapper">
          <table width="100%" class="chart_table">
            <thead>
              <tr>
                <td class="table_heading" v-for="(chartHeading,index) in sizeChartObj.chart_header_title" :key="index">
                  {{chartHeading}}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr class="table_row" v-for="(sizesArray,index) in sizeChartObj.sizes" :key="index">
                <td class="table_label" v-for="(size,index) in sizesArray" :key="index">
                  {{size}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'SizeChart',
  props: ['sizeChartObj'],
  mounted () {
    this.$store.dispatch('common/updateFixedScroll', true)
  },
  destroyed () {
    this.$store.dispatch('common/updateFixedScroll', false)
  }
}
</script>
<style lang="scss" scoped>
  .size_chart {
    position: fixed;
    height: 100%;
    width: 100%;
    background: #fff;
    z-index: 11;
    top:0;
  }
  .chart_header{
    padding: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  .closeBtn{
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .2;
    margin-top: -2px;
  }
  .chart_tableWrapper{
    padding: 15px;
  }
  .chart_title{
    font-size: .875rem;
    margin: 0;
    line-height: 1.5;
    display: block;
    text-align: center;
  }
  .chart_table {
    border: 1px solid #eee;
    border-collapse: collapse;
    background-color: transparent;
  }
  .table_heading{
    width: 100px;
    font-weight: 500;
    padding: 10px 0;
    text-align: center;
    border-right: 1px solid #eee;
  }
  .table_row{
    border: 1px solid #eaeaea;
    font-size: .875rem;
    padding: 10px 0;
    text-align: center;
    &:nth-child(odd) {
      background: #eee;
      border: 1px solid #eee;
    }
  }
  .table_label{
    border: 1px solid #eaeaea;
    font-size: .875rem;
    padding: 10px 0;
  }
  .modalW-enter-active, .modalW-leave-active {
    transition: all .2s ease-in
  }
  .modalW-enter, .modalW-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
