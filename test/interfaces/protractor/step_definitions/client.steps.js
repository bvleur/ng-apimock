(() => {
    const {Given, When, After} = require('cucumber');
    const client = require('../../../../dist/src/interfaces/interfaces').protractor;

    Given(/^the following mock state$/, async (dataTable) =>
        await client.getMocks().then((mocks) =>
            dataTable.rows().forEach(row => {
                expect(mocks.state[row[0]].scenario).to.equal(row[1]);
            })
        ));

    Given(/^the following variables state$/, async (dataTable) =>
        await client.getvariables().then((variables) =>
            dataTable.rows().forEach(row => {
                console.log(variables);
                // expect(mocks.state[row[0]].scenario).to.equal(row[1]);
            })
        ));

    When(/^I select scenario (.*) for mock (.*)$/, async (scenario, name) =>
        await client.selectScenario(name, scenario));

    When(/^I set delay to (\d+) for mock (.*)$/, async (delay, name) => {
        browser.ignoreSynchronization = true;
        await client.delayResponse(name, parseInt(delay))
    });

    When(/^I wait a (\d+) milliseconds$/, async (wait) =>
        await browser.sleep(wait));

    When(/^I reset the mocks to default$/, async () =>
        await client.resetMocksToDefault());

    When(/^I set the mocks to passThroughs$/, async () =>
        await client.setMocksToPassThrough());

    When(/^I add variable (.*) with value (.*)/, async (key, value) =>
        await client.setVariable(key, value));

    When(/^I update variable (.*) with value (.*)/, async (key, value) =>
        await client.setVariable(key, value));

    When(/^I delete variable (.*)/, async (key) =>
        await client.deleteVariable(key));

    After(async () =>
        await client.resetMocksToDefault());
})();