import { Vue } from "vue-property-decorator";

Vue.filter("firstLetter", function(value: string): string {
	if (!value) return "";

	return value.charAt(0).toUpperCase();
});

Vue.filter("titleCase", function(value: string): string {
	if (!value) return "";

	return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter("simpleDate", function(value: Date): string {

	if (!value) return "";

	return (
		value.getDate() +
		"/" +
		(value.getMonth() + 1) +
		"/" +
		value.getFullYear()
	);
});

Vue.filter("simpleTime", function(value: Date): string {
	if (!value) return "";

	return value.getHours() + ":" + value.getMinutes();
});
