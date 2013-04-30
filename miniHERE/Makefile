.PHONY: ensurestep test step clean

PLUGIN = minihere
RUNNER = test/SpecRunner.html

all: plugin summary

plugin:
	@./node_modules/.bin/uglifyjs -nc -o $(PLUGIN).min.js $(PLUGIN).js

summary:
	@ls -nhl minihere.*js | grep -v ^d | awk '{print $$9,$$5}' | tail -n +2;

ensurestep:
	@if [ ! -f $(PLUGIN).js ]; then make step to=0; fi;

test: ensurestep
	@command -v phantomjs >/dev/null 2>&1 || { echo >&2 "PhantomJS not installed.  Run the tests from the browser."; exit 0; }; \
	./node_modules/.bin/phantom-jasmine $(RUNNER)

step:
	@cp step-$(to)/$(PLUGIN).js .; \
	cp step-$(to)/index.html .; \
	cp step-$(to)/$(PLUGIN).spec.js ./test/spec/.

clean:
	@rm minihere.js test/spec/minihere.spec.js index.html

run:
	@python -m SimpleHTTPServer 8080