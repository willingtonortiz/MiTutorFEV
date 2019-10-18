module.exports = {
	lintOnSave: false,
	css: {
		sourceMap: true,
		loaderOptions: {
			sass: {
				data: `
              @import "@/assets/styles/_variables.scss";
              
            `
			}
		}
	}
};
