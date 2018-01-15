<template>
	<section>
		<mt-header title="答题卡" fixed>
			<div slot="left">
			    <mt-button icon="back" @click="back">返回</mt-button>
		    </div>
		</mt-header>
	</section>
</template>
<script>
	export default{
		data(){
			return {}
		},
		methods:{
			back(){
				this.$emit('close');
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '~scss_vars';
</style>