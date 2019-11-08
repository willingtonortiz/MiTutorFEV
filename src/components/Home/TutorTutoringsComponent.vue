<template>
	<div class="tutor-tutorings-component">
		<div class="no-tutorings" v-if="tutoringOffers.length === 0">
			<div class="information">
				<h1>No tienes tutorías</h1>
				<p>Publica tu primera tutoría</p>
			</div>

			<div class="new-tutoring">
				<button v-on:click="navigateToPublishNewTutoringOffer()">Nueva tutoría</button>
			</div>
		</div>

		<div class="tutoring-offers" v-if="tutoringOffers.length > 0">
			<h1>Mis tutorias</h1>

			<div class="list">
				<div
						class="tutoring-offer"
						v-for="(item, index) in tutoringOffers"
						v-bind:key="index"
				>
					<div class="box" v-bind:style="{backgroundColor: colors[index]}">
						<p>{{ item.courseName | firstLetter }}</p>
					</div>
					<p class="name">
						{{ item.courseName | titlecase}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {TutoringOfferInfo} from "@/dtos/output/TutoringOfferInfo";
    import {UserCredentials} from "@/dtos/UserCredentials";
    import AuthenticationService from "@/Services/AuthenticationService";
    import {TutoringOfferService} from "@/Services/TutoringOfferService";
    import ColorService from "@/Services/ColorService";

    @Component({
        filters: {
            firstLetter: function (value: string): string {
                if (!value) return "";

                return value.charAt(0).toUpperCase();
            },
            titlecase: function (value: string): string {
                if (!value) return "";

                return value.charAt(0).toUpperCase() + value.slice(1);
            },
        }
    })
    export default class TutorTutoringsComponent extends Vue {
        public tutoringOffers: Array<TutoringOfferInfo>;
        public colors: string[];

        public constructor() {
            super();

            this.tutoringOffers = new Array<TutoringOfferInfo>();
            this.initialize();
        }


		public async navigateToPublishNewTutoringOffer(){
			let idUser =  AuthenticationService.userValue.id;
			this.$router.push(`/tutor/${idUser}/publishtutoringoffer`);
		}
        public async initialize() {
            try {
                // TODO: Validar que el usuario se haya autenticado
                // Sino lo ha hecho, redireccionar

                const user: UserCredentials = AuthenticationService.userValue;

                // TODO: Colocar un id que tenga tutorias
                this.tutoringOffers = await TutoringOfferService.findAllByTutorId(user.id);

                this.generateRandomColors();
            } catch (error) {
                console.log("ERROR EN TutorTutoringsComponent");
            }
        }

        public generateRandomColors(): void {
            const size: number = this.tutoringOffers.length;
            this.colors = new Array<string>();

            for (let i = 0; i < size; ++i) {
                this.colors.push(ColorService.generateRandomColorString())
            }
        }
    }
</script>

<style lang="scss" scoped>
	.tutor-tutorings-component {
		height: 100%;
		padding: 16px;

		.tutoring-offers {
			height: 525px;
			display: flex;
			flex-flow: column nowrap;

			h1 {
				text-align: center;
				font-size: 24px;
				color: #4e8efc;
			}

			.list {
				flex: 1;
				margin: 8px 0;
				overflow-y: auto;

				display: flex;
				flex-flow: column nowrap;

				.tutoring-offer {
					margin: 4px 0;
					align-items: center;
					cursor: pointer;

					display: flex;
					flex-flow: row nowrap;

					.box {
						width: 60px;
						height: 60px;
						margin-right: 16px;
						font-size: 28px;
						border-radius: 5px;

						display: flex;
						justify-content: center;
						align-items: center;
					}

					.name {
						font-size: 18px;
					}
				}
			}
		}

		.no-tutorings {
			height: 100%;

			display: flex;
			flex-flow: column nowrap;

			.information {
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;

				flex: 1;

				h1 {
					color: #4e8efc;
					font-size: 24px;
					font-weight: bold;
				}

				p {
					font-size: 18px;
				}
			}

			.new-tutoring {
				flex: 1;

				display: flex;
				justify-content: center;
				align-items: center;

				button {
					background-color: #4e8efc;
					color: white;
					font-size: 24px;
					padding: 8px 20px;
					border: none;
					border-radius: 5px;
					cursor: pointer;
					transition: all ease-in 0.25s;

					&:hover {
						transform: scale(1.05);
					}
				}
			}
		}
	}

</style>