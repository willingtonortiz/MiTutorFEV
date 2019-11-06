<template>
	<div class="home-container">
		<nav class="navbar">
			<div class="logo">
				log
			</div>
			<div class="search">
				<input
						type="text"
						placeholder="Busca algún curso"
						v-model="courseName"
						v-on:keyup="findTutoringOffersAndTutors"
				/>
			</div>
			<div class="avatar">
				photo
			</div>
		</nav>

		<HomeSideBarComponent class="home-side-bar-component"></HomeSideBarComponent>

		<div class="results">
			<TutoringOfferInfoGroupComponent></TutoringOfferInfoGroupComponent>

			<TutorInfoGroupComponent></TutorInfoGroupComponent>
		</div>
	</div>

</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "vue-property-decorator";
    import {
        CourseService
    } from "../Services/CourseService"
    import {
        TutoringOfferService
    } from "../Services/TutoringOfferService"
    import {
        Course
    } from '../Models/Course';
    import {
        TutoringOfferInfo
    } from '../dtos/output/TutoringOfferInfo';
    import
        TutoringOfferInfoGroupComponent
        from "../components/Home/TutoringOfferInfoGroupComponent.vue";
    import HomeSideBarComponent from "@/components/Home/HomeSideBarComponent.vue";
    import TutorInfoGroupComponent from "@/components/Home/TutorInfoGroupComponent.vue";

    @Component({
        components: {
            TutorInfoGroupComponent,
            HomeSideBarComponent,
            TutoringOfferInfoGroupComponent
        },
        props: {},
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
    export default class Home extends Vue {
        public courseName: string;

        public constructor() {
            super();
            // Servicios

            this.courseName = "calculo 2";

            // this.findTutoringOffers();
        }

        public async findTutoringOffersAndTutors() {
            if (this.courseName.length === 0) {
                return;
            }

            try {

                await this.$store.dispatch("fetchTutoringOffers", this.courseName.toLowerCase());

                await this.$store.dispatch("fetchTutors", this.courseName.toLowerCase());


            } catch (error) {
                console.log(error);
            }
        }

        created() {
            this.findTutoringOffersAndTutors();
        }
    }
</script>

<style lang="scss" scoped>
	.home-container {
		.navbar {
			padding: 16px;
			display: flex;
			flex-flow: row nowrap;

			justify-content: space-around;
			align-items: center;

			.search {
				input {
					padding: 8px;
					border: 1px solid lightgray;
					border-radius: 5px;
					font-size: 16px;
				}
			}
		}

		.home-side-bar-component {
			display: none;
		}

		.results {
		}
	}

	@media only screen and (min-width: 768px) {
	}

	@media only screen and (min-width: 1024px) {
		.home-container {
			height: 100vh;
			padding: 16px 32px;

			display: grid;
			grid-template-columns: 3fr 9fr;
			grid-template-rows: min-content;
			gap: 32px;
			align-items: flex-start;

			.navbar,
			.home-side-bar-component,
			.results {
				// border: 1px solid blue;
				box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
				border-radius: 10px;
			}

			.navbar {
				grid-column: 1 / span 2;
			}

			.home-side-bar-component {
				display: block;
				grid-column: 1 / span 1;
				align-self: stretch;
			}

			.results {
				grid-column: 2 / span 1;
				align-self: stretch;
				display: flex;
				flex-flow: column wrap;
			}
		}
	}

</style>
