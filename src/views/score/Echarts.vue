<template>
    <div id="myEcharts" class="chart-show-area" style="width:220px;height: 220px;margin: 0 auto;"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        props: {
            data: {
                type: Array
            }
        },
        data() {
            return {
                chart: null,
            }
        },
        methods: {
            drawCharts() {
                const $ele = document.getElementById('myEcharts');
                this.chart = echarts.init($ele);
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}:<br/> {c} ({d}%)"
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            radius: ['0', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        fontSize: '14',
                                        color: '#3C5398'
                                    },
                                    formatter: "{b} \n {d}%"
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '24',
                                        color: '#fff',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.data
                        }
                    ],
                    color: [
                        '#AEE2AD',
                        '#F8D39A',
                        '#EB8B87',
                        '#87BFBC'
                    ]
                });
            },
        },
        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    @import '~scss_vars';
</style>
