// Generated from: tests/features/chores.feature
import { test } from "playwright-bdd";

test.describe('Chore Management', () => {

  test('Add a daily recurring task', async ({ Given, When, Then, page }) => { 
    await Given('an empty Choar board', null, { page }); 
    await When('Chris adds "empty bins" as a daily recurring task', null, { page }); 
    await Then('"empty bins" shows up in the daily recurring task bucket', null, { page }); 
  });

  test('Mark a weekly task as done', async ({ Given, When, Then, page }) => { 
    await Given('Chris has "vacuum" as a weekly recurring task', null, { page }); 
    await When('Chris toggles it as done', null, { page }); 
    await Then('it moves to the done side of the weekly recurring task bucket', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests/features/chores.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given an empty Choar board","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"When Chris adds \"empty bins\" as a daily recurring task","stepMatchArguments":[{"group":{"start":11,"value":"\"empty bins\"","children":[{"start":12,"value":"empty bins","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then \"empty bins\" shows up in the daily recurring task bucket","stepMatchArguments":[{"group":{"start":0,"value":"\"empty bins\"","children":[{"start":1,"value":"empty bins","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":11,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given Chris has \"vacuum\" as a weekly recurring task","stepMatchArguments":[{"group":{"start":10,"value":"\"vacuum\"","children":[{"start":11,"value":"vacuum","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When Chris toggles it as done","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then it moves to the done side of the weekly recurring task bucket","stepMatchArguments":[]}]},
]; // bdd-data-end