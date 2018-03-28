<template>
    <section>
        <mt-header title="答题卡" fixed>
            <div slot="left">
                <mt-button icon="back" @click="back">返回</mt-button>
            </div>
        </mt-header>
        <div class="main">
            <div class="question-serial">
                <div class="main-title black">单选题</div>
                <ul class="question-num">
                    <li v-for="(val, index) in radioList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange('radio',index)">{{index+1}}</el-button></li>
                </ul>
            </div>
            <div class="question-serial">
                <div class="main-title black">多选题</div>
                <ul class="question-num">
                    <li v-for="(val, index) in checkList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange('check',index)">{{index+1}}</el-button></li>
                </ul>
            </div>
            <div class="question-serial">
                <div class="main-title black">判断题</div>
                <ul class="question-num">
                    <li v-for="(val, index) in judgeList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange('judge',index)">{{index+1}}</el-button></li>
                </ul>
            </div>
            <div class="question-serial">
                <div class="main-title black">选做题（{{optionalList.length}}选{{mustCount}}）</div>
                <ul class="question-num">
                    <li v-for="(val, index) in optionalList" ><el-button :class="{'is-answerred': isAnswerred(val)}" class="circle" @click="questionChange('optional',index)">{{index+1}}</el-button></li>
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: {
            list: {
                type: Object
            }
        },
        data() {
            return {
                radioList: [],
                checkList: [],
                judgeList: [],
                optionalList: [],
                mustCount: 0//选做题必答
            }
        },
        methods: {
            arrange() {
                this.mustCount = this.list.paper.mustCount;
                this.radioList = this.list.radio!=null?this.list.radio:[];
                this.checkList = this.list.check!=null?this.list.check:[];
                this.judgeList = this.list.judge!=null?this.list.judge:[];
                this.optionalList = this.list.optional!=null?this.list.optional:[];
            },
            isAnswerred(problem) {//试题是否已回答
                var isAnswerred = false;
                if (!problem || !problem.myAnswer) {
                    isAnswerred = false;
                } else {
                    isAnswerred = problem.myAnswer.length > 0;
                }
                return isAnswerred;
            },
            questionChange(type, index) {
                var current = index;
                var radioCount = this.radioList.length;
                var checkCount = this.checkList.length;
                var judgeCount = this.judgeList.length;
                switch (type) {
                    case 'radio':
                        current += 0;
                        break;
                    case 'check':
                        current += radioCount;
                        break;
                    case 'judge':
                        current += radioCount + checkCount;
                        break;
                    case 'optional':
                        current += radioCount + checkCount + judgeCount;
                        break;
                }
                this.$emit('jump', current);
            },
            back() {
                this.$emit('close');
            }
        },
        mounted() {
            this.arrange();
        }
    }
</script>
