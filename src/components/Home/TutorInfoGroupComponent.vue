<template>
	<div class="tutor-info-group-container">
		<div class="found" v-if="tutors.length > 0">
			<div class="title">
				<h1>Tutores encontrados</h1>
			</div>

			<div class="body">
				<TutorInfoComponent
						class="tutor-info-component"
						v-for="(tutor, index) in tutors"
						v-bind:key="index"
						v-bind:tutor="tutor"></TutorInfoComponent>
			</div>
		</div>

		<div v-else>
			<div class="errorMessage">
				<p>No se encontraron tutores</p>
			</div>
		</div>
	</div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {TutorInfo} from "@/dtos/input/TutorInfo";
    import TutorInfoComponent from "@/components/Home/TutorInfoComponent.vue";

    @Component({
        components: {TutorInfoComponent},
        computed: {
            tutors() {
                return this.$store.getters.tutors
            }
        },
        created() {
            // Pedir datos en el api
        }
    })
    export default class TutorInfoGroupComponent extends Vue {

        public constructor() {
            super();

        }
    }
</script>

<style lang="scss" scoped>
	.tutor-info-group-container {
		.found {
			margin: 32px 0;
			width: 100%;
			display: flex;
			flex-flow: column wrap;
			justify-content: center;
			// border: 1px solid red;

			.title {
				margin-bottom: 16px;
				display: flex;
				flex-flow: row wrap;
				justify-content: center;

				// border: 1px solid green;

				h1 {
					font-size: 20px;
				}
			}

			.body {
				display: flex;
				flex-flow: row wrap;
				// border: 1px solid blue;
				justify-content: center;
			}

			.tutor-info-component {
				margin: 16px;
				box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: 0.15);
			}
		}
	}

	@media only screen and (min-width: 1024px) {
		.tutor-info-group-container {
			.found {
				padding: 16px;

				.title {
					justify-content: start;
				}
			}
		}
	}

</style>