BO=node_modules/.bin/bower
GU=node_modules/.bin/gulp
KA=node_modules/karma/bin/karma
PR=node_modules/.bin/protractor

setup:
	npm install --no-progress

remove_remote:
	rm -rf .git

server:
	@$(GU) up

compile:
	@$(GU) compile

build:
	@$(GU) build --compress

karma:
	@$(KA) start tests/karma-tests/karma.conf.js

publish:
	@$(GU) build --compress
	@$(GU) publish --compress

# protractor:
# 	@$(PR) tests/e2e-tests/protractor-conf.js