# MiniHERE

In the miniHERE folder you can find a very simple example of a jQuery plugin developed with Test Driven Development (TDD).

miniHERE is a smaller version of [jHERE](http://jhere.net): it is a jQuery plugin that makes it easy to add maps to websites and programmatically change the zoom level of the map. It has a zoom bar and supports drag and mouse wheel for pan and zoom.

The folder contains sort of an interactive tutorial, driven by a Makefile:

 * Step 0: miniHERE skeleton + failing unit test
 * Step 1: miniHERE initial implementation + passing unit test
 * Step 2: miniHERE skeleton + failing unit test for zoom method
 * Step 3: miniHERE zoom method + passing unit test
 * Step 4: 3rd party dependency loader for miniHERE
 * Step 5: $.miniHERE.extend + passing unit test

To get started run the following command from a terminal window:

	make step to=0
	
This will copy the files in the right location.

	make test
	
Runs the unit tests for the current step. Note that for some of the steps (1, 3) tests fail, in the spirit of TDD.