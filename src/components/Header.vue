<template>
	<header class="nav">
		<div class="logo">
			<img src="../assets/images/logo.png" alt=""/>
		</div>
		<div class="searchbar">

			<input type="text" placeholder="buscar algun curso">
		</div>
		<div class="avatar">
			<h2>Jair Huaman Bellido</h2>
		</div>
	</header>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend({
        name: "Header"
    });
</script>

<style>
	.nav {
		display: flex;
	}

	header {
		padding: 1.5em 3em;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	header .searchbar {
		width: 450px;
		position: relative;

	}

	header .searchbar input {
		padding: 12px 18px;
		font-size: 18px;
		color: var(--primary-text);
		opacity: .87;
		border: 1px solid #afafaf;
		border-radius: 6px;
		width: 100%;
		transition: all .2s ease-in-out;
	}

	header .searchbar input:focus {
		border: 1px solid var(--primary-color);
	}


</style>