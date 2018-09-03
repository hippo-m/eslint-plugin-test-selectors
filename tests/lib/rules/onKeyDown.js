/**
 * @fileoverview Requires test attribute data-test-id on elements with onKeyDown handlers.
 */
const rule = require('../../../lib/rules/onKeyDown');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const { defaultTestAttribute, errors } = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { onKeyDown } = errors;

const onKeyDownError = getError(onKeyDown.message, defaultTestAttribute);

const ruleTester = new RuleTester();
ruleTester.run('onKeyDown', rule, {
    valid: [
        { code: `<div onKeyDown={ this.handleKeyDown } data-test-id={ bar }>Foo</div>` },
        { code: `<div onKeyDown={ this.handleKeyDown } data-test-id="bar">Foo</div>` },
        { code: `<div onKeyDown={ this.handleKeyDown } data-test-id="bar" />` },
        { code: `<div onKeyDown={ () => {} } data-test-id={ bar }>Foo</div>` },
        { code: `<div onKeyDown={ () => {} } data-test-id="bar">Foo</div>` },
        { code: `<div onKeyDown={ () => {} } data-test-id="bar" />` },
        { code: `<Bar onKeyDown={ () => {} } data-test-id={ bar }>Foo</Bar>` },
        { code: `<Bar onKeyDown={ () => {} } data-test-id="bar">Foo</Bar>` },
        { code: `<Bar onKeyDown={ () => {} } data-test-id="bar" />` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: '<div onKeyDown={ this.handleKeyDown } />', errors: [onKeyDownError] },
        { code: '<div onKeyDown={ this.handleKeyDown }>foo</div>', errors: [onKeyDownError] },
        { code: '<Bar onKeyDown={ this.handleKeyDown } />', errors: [onKeyDownError] },
        { code: '<Bar onKeyDown={ this.handleKeyDown }>foo</Bar>', errors: [onKeyDownError] }
    ].map(parserOptionsMapper)
});
