<template>
    <div id="testApi">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <div class="blank"></div>
        <el-button @click="sendRequest">发送请求</el-button>
        <div class="blank"></div>
        <el-button @click="sendHttpRequest">发送请求</el-button>
        <div class="blank"></div>
        <div class="cont">
            {{resStr}}
        </div>
    </div>

</template>

<script>
    import { testApi, testData } from '../../api/api';

    export default {
        data() {
            return {
                input: '',
                resStr: '',
            };
        },
        methods: {
            sendRequest() {
                console.log('request is send');
                testApi({
                    para: this.input,
                }).then((res) => {
                    console.log('res is success', res);
                    this.resStr = JSON.stringify(res.data);
                }, (res) => {
                    console.log('res is fail', res);
                    this.resStr = JSON.stringify(res.data);
                }).catch((e) => {
                    console.log(e);
                });
            },
            sendHttpRequest() {
                testData().then((res) => {
                    console.log('res', res);
                });
            }
        },
        mounted() {

        }
    }

</script>

<style lang="scss" scoped>
    #testApi {
        padding: 20px;
        .blank {
            height: 20px;
        }
    }
</style>