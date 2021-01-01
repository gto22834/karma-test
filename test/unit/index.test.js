import testExport from '~/src';

describe("main::DOM test", function () {
  it('should render correct contents', () => {
    expect(testExport())
      .to.equal('export function2')
  })
});
