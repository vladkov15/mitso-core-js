const assert = require('assert');
const tasks = require('../src/10-opp-tasks');
it.optional = require('../extensions/it-optional');

describe('10-opp-tasks', () => {
  it.optional('PaginationHelper should be implemented', () => {
    const total = 105;
    const perPage = 25;
    const pageCount = Math.ceil(total / perPage);
    const collection = [...new Array(total)].map(
      (_, index) => `item ${index + 1}`
    );

    const helper = new tasks.PaginationHelper(collection, perPage);

    assert.strictEqual(helper.pageCount(), pageCount);

    assert.strictEqual(helper.itemCount(), total);

    const firstPageItemsCount = helper.pageItemCount(0);
    assert.strictEqual(firstPageItemsCount, perPage);

    const lastPageItemsCount = helper.pageItemCount(pageCount - 1);
    assert.strictEqual(lastPageItemsCount, 5);

    const badPageItemsCount = helper.pageItemCount(pageCount + 10)
    assert.strictEqual(badPageItemsCount, -1);

    assert.strictEqual(helper.pageIndex(26), 1); // (zero based index)
    assert.strictEqual(helper.pageIndex(10), 0);
    assert.strictEqual(helper.pageIndex(56), 2);
    assert.strictEqual(helper.pageIndex(-10), -1);
    assert.strictEqual(helper.pageIndex(200), -1);
  });
});
