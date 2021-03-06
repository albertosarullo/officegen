//======================================================================================================================
// TEST SUITE FOR OFFICEGEN
// This generates small individual files that test specific aspects of the API
// and compares them to reference files.
//
// The comparison is based on string comparisons of specified XML subdocuments.
// Comparing PPTX files for exact-bytewise equality fails because the doc properties include the creation date.
// This method tests a defined set of XML subdocuments for string equality.
//======================================================================================================================

var assert = require ( 'assert' );
var officegen = require ( '../' );
var fs = require ( 'fs' );
var path = require ( 'path' );

// var pluginLayouts = require ( '../lib/pptxplg-layouts' );

var OUTDIR = __dirname + "/../tmp/";

// Common error method
var onError = function ( err ) {
	console.log ( err );
	assert ( false );
};

describe("PPTX Layouts plugin", function () {
	this.slow ( 1000 );

	it ( "creates a presentation with the title layout", function ( done ) {
		var slide;
		var pptx = officegen ({
			type: 'pptx',
			extraPlugs: [
				// pluginLayouts // The 'pptxplg-layouts' plugin.
			]
		});
		pptx.on ( 'error', onError );

		pptx.setDocTitle ( 'Testing Layouts' );

		//
		// Slide #1:
		//

		slide = pptx.makeNewSlide ({
			useLayout: 'title'
		});

		//
		// Slide #2:
		//

		slide = pptx.makeNewSlide ({
			useLayout: 'title'
		});

		slide.setTitle ( 'The title' );
		slide.setSubTitle ( 'Another text' );

		//
		// Slide #3:
		//

		slide = pptx.makeNewSlide ({
			useLayout: 'title'
		});

		slide.setTitle ( [
			{ text: 'Hello ', options: { font_size: 56 } },
			{ text: 'World!', options: { font_size: 56, font_face: 'Arial', color: 'ffff00' } }
		] );
		slide.setSubTitle ( 'Another text' );

		//
		// Slide #4:
		//

		slide = pptx.makeTitleSlide ();

		//
		// Slide #6:
		//

		slide = pptx.makeTitleSlide ( 'The title of this slide', 'Sub title' );

		//
		// Slide #7:
		//

		slide = pptx.makeTitleSlide ( [
			{ text: 'Hello ', options: { font_size: 56 } },
			{ text: 'World!', options: { font_size: 56, font_face: 'Arial', color: 'ffff00' } }
		], 'Sub title' );

		//
		// Generate the pptx file:
		//

		var FILENAME = "test-ppt-layouts-1.pptx";
		var out = fs.createWriteStream ( OUTDIR + FILENAME );
		pptx.generate ( out );
		out.on ( 'close', function () {
			done ();
		});
	});
});
