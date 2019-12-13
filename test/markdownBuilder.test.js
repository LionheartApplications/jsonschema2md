/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { assertMarkdown, loadschemas } = require('./testUtils');

const build = require('../lib/markdownBuilder');


describe('Testing Markdown Builder: readme-1', () => {
  let results;

  before(async () => {
    const schemas = await loadschemas('readme-1');
    const builder = build({ header: true });
    results = builder(schemas);
  });

  it('Abstract Schema looks OK', () => {
    assertMarkdown(results.abstract)
      .equals('heading > text', { type: 'text', value: 'Abstract Schema' })
      .fuzzy`
## Definitions group second

Reference this group by using

\`\`\`json
{"$ref":"https://example.com/schemas/abstract#/definitions/second"}
\`\`\``
      .fuzzy`
\`bar\`

-   is optional
-   Type: \`string\`
-   cannot be null
-   defined in: [Abstract](abstract-definitions-second-properties-bar.md "https&#x3A;//example.com/schemas/abstract#/definitions/second/properties/bar")

#### bar Type

\`string\``;
    //      .inspect()
    //      .print();
  });

  it('Complex Schema looks OK', () => {
    assertMarkdown(results.complex)
      .contains('# Complex References Schema');
  });

  it('Simple Schema looks OK', () => {
    assertMarkdown(results.simple)
      .contains('# Simple Schema');
  });
});
