<template>
	<div class="tutoring-offer-info-group-container">
		<div class="found" v-if="tutoringOffers.length > 0">

			<div class="title">
				<h1>Tutorías encontradas</h1>
			</div>

			<div class="body">
				<TutoringOfferInfoComponent
						class="tutoring-offer-info-component"
						v-for="(item, index) in tutoringOffers"
						v-bind:key="index"
						v-bind:tutoringOffer="item"></TutoringOfferInfoComponent>
			</div>
		</div>

		<!-- <ng-template #notFound> -->
		<div v-else>
			<div class="errorMessage">
				<p>No se encontraron tutorías</p>
			</div>
		</div>
		<!-- </ng-template> -->
	</div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue
    } from "vue-property-decorator";
    import TutoringOfferInfoComponent from "./TutoringOfferInfoComponent.vue";
    import {
        TutoringOfferInfo
    } from '../../dtos/output/TutoringOfferInfo';

    @Component({
        computed: {
            tutoringOffers() {
                return this.$store.getters.tutoringOffers;
            }
        },
        components: {
            TutoringOfferInfoComponent
        },
        filters: {
            firstLetter: function (value: string): string {
                if (!value) return "";

                return value.charAt(0).toUpperCase();
            },
            titlecase: function (value: string): string {
                if (!value) return "";

                return value.charAt(0).toUpperCase() + value.slice(1);
            },
            simpleDate: function (value: Date): string {
                if (!value) return "";

                return value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
            },
            simpleTime: function (value: Date): string {
                if (!value) return "";

                return value.getHours() + ":" + value.getMinutes();
            }
        }
    })
    export default class TutoringOfferInfoGroupComponent extends Vue {

    }
</script>


<style lang="scss" scoped>
	.tutoring-offer-info-group-container {
		.found {
			margin: 32px 0;
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

			.tutoring-offer-info-component {
				margin: 16px;
				box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: 0.15);
			}
		}
	}

	@media only screen and (min-width: 1024px) {
		.tutoring-offer-info-group-container {
			.found {
				padding: 16px;

				.title {
					justify-content: start;
				}
			}
		}
	}

</style>
